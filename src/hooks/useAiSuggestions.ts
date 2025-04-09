
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { hasCredits, useCredit, getUserSubscription } from "@/lib/subscription";
import useFastAPI from "@/hooks/useFastAPI";
import { ArgumentItem } from "@/hooks/useArgumentBlocks";

export function useAiSuggestions(
    argumentBlocks: ArgumentItem[],
    onAddSuggestion: (type: string, content: string) => void,
    onUpdateBlock: (id: string, content: string) => void
) {
    const [isGeneratingSuggestion, setIsGeneratingSuggestion] = useState(false);
    const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
    const [apiError, setApiError] = useState<string | null>(null);
    const api = useFastAPI();

    const loadSubscription = async () => {
        try {
            return await getUserSubscription();
        } catch (error) {
            console.error("Error loading subscription:", error);
            return null;
        }
    };

    const requestBlockLevelSuggestion = async (blockId: string) => {
        setSelectedBlockId(blockId);
        setApiError(null);

        const selectedBlock = argumentBlocks.find(block => block.id === blockId);

        if (!selectedBlock) {
            console.error("Block not found:", blockId);
            return;
        }

        const hasAvailableCredits = await hasCredits();
        if (!hasAvailableCredits) {
            toast({
                title: "No credits remaining",
                description: "Please upgrade your subscription to get AI suggestions",
                variant: "destructive",
            });
            return;
        }

        setIsGeneratingSuggestion(true);

        toast({
            title: "Generating suggestion...",
            description: `Finding improvement for your ${selectedBlock.type}`,
        });

        try {
            console.log(`Requesting block-level suggestion for block ID: ${blockId}, type: ${selectedBlock.type}`);
            const result = await api.improveBlock({
                text: selectedBlock.content,
                blockType: selectedBlock.type,
                context: argumentBlocks.map(b => ({ type: b.type, content: b.content }))
            });

            // If we get an empty or unexpected response, let the user know
            if (!result || !result.improvement) {
                console.error("Empty or invalid AI response:", result);
                toast({
                    title: "AI couldn't generate a suggestion",
                    description: "The AI couldn't understand your input or generate a meaningful response. Please try a different approach.",
                    variant: "destructive",
                });
                setIsGeneratingSuggestion(false);
                return;
            }

            let originalContent = selectedBlock.content;

            if (originalContent.includes("AI Improvement: ")) {
                originalContent = originalContent.split("AI Improvement: ")[0].trim();
            }

            const updatedContent = `${originalContent}\n\nAI Improvement: ${result.improvement}`;
            console.log("Updating block with improvement");
            onUpdateBlock(selectedBlock.id, updatedContent);

            const creditUsed = await useCredit();

            if (creditUsed) {
                // Immediately refresh subscription data after credit usage
                await loadSubscription();

                toast({
                    title: "Block improved",
                    description: `Your ${selectedBlock.type} has been enhanced with AI suggestions`,
                });
            } else {
                toast({
                    title: "Error using credit",
                    description: "Could not update your credit balance",
                    variant: "destructive",
                });
            }
        } catch (error) {
            console.error("Error generating improvement:", error);
            setApiError("Unable to connect to the API. Please check your environment setup.");

            toast({
                title: "API Error",
                description: "Failed to get AI improvements. Please check API connection.",
                variant: "destructive",
            });
        } finally {
            setIsGeneratingSuggestion(false);
        }
    };

    const requestAISuggestion = async (type: string, customPrompt?: string) => {
        setApiError(null);
        const hasAvailableCredits = await hasCredits();
        if (!hasAvailableCredits) {
            toast({
                title: "No credits remaining",
                description: "Please upgrade your subscription to get AI suggestions",
                variant: "destructive",
            });
            return;
        }

        setIsGeneratingSuggestion(true);

        toast({
            title: "Generating suggestion...",
            description: `Finding relevant ${type} for your argument`,
        });

        try {
            console.log(`Requesting AI suggestion for type: ${type}`);
            // Create context from existing blocks to inform the AI
            const context = argumentBlocks.length > 0
                ? argumentBlocks.map(block => `${block.type}: ${block.content}`).join("\n\n")
                : "";

            console.log(`Using context length: ${context.length} characters`);
            const result = await api.generateSuggestion(type, context || customPrompt || "");

            // Check if the AI understood the input and provided a meaningful response
            if (!result || !result.content) {
                console.error("Empty or invalid AI response:", result);
                toast({
                    title: "AI couldn't generate a suggestion",
                    description: "The AI couldn't understand your input or generate a meaningful response. Please try a different prompt.",
                    variant: "destructive",
                });
                setIsGeneratingSuggestion(false);
                return;
            }

            const suggestedContent = result.content;
            console.log("AI suggestion received, using credit");
            const creditUsed = await useCredit();

            if (creditUsed) {
                console.log("Adding suggestion to argument");
                onAddSuggestion(type, suggestedContent);
                // Immediately refresh subscription data after credit usage
                await loadSubscription();
            } else {
                toast({
                    title: "Error using credit",
                    description: "Could not update your credit balance",
                    variant: "destructive",
                });
            }
        } catch (error) {
            console.error("Error generating suggestion:", error);
            setApiError("Unable to connect to the API. Please check your environment setup.");

            toast({
                title: "API Error",
                description: "Failed to get AI suggestion. Please check API connection.",
                variant: "destructive",
            });
        } finally {
            setIsGeneratingSuggestion(false);
        }
    };

    return {
        isGeneratingSuggestion,
        selectedBlockId,
        apiError,
        requestBlockLevelSuggestion,
        requestAISuggestion,
        setApiError
    };
}
