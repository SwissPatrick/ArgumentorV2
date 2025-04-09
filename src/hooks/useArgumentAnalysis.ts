
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { hasAdvancedCredits, useAdvancedCredit, getUserSubscription } from "@/lib/subscription";
import useFastAPI from "@/hooks/useFastAPI";

export interface AnalysisResult {
    fallacies: Array<{
        block?: string;
        type: string;
        description: string;
    }>;
    suggestions: Array<{
        type: string;
        content: string;
    }>;
    strength: number;
    grade: string;
    feedback: string;
}

export function useArgumentAnalysis() {
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysis, setAnalysis] = useState<null | AnalysisResult>(null);
    const [error, setError] = useState<string | null>(null);
    const api = useFastAPI();

    const analyzeArgument = async (
        argumentBlocks: Array<{ id: string; type: string; content: string }>,
        customPrompt?: string
    ) => {
        if (argumentBlocks.length === 0) {
            toast({
                title: "No argument to analyze",
                description: "Please add some argument blocks first.",
                variant: "destructive",
            });
            return false;
        }

        // Ensure we have at least 2 blocks for a meaningful analysis
        if (argumentBlocks.length < 2) {
            toast({
                title: "Insufficient argument content",
                description: "Please add at least two argument blocks for a meaningful analysis.",
                variant: "destructive",
            });
            return false;
        }

        const hasAvailableCredits = await hasAdvancedCredits();
        if (!hasAvailableCredits) {
            toast({
                title: "No advanced credits remaining",
                description: "Please upgrade your subscription to analyze more arguments",
                variant: "destructive",
            });
            return false;
        }

        setIsAnalyzing(true);
        setError(null);

        try {
            // Format and send the argument to the backend for analysis
            const formattedBlocks = argumentBlocks.map(block => ({
                type: block.type,
                content: block.content
            }));

            console.log(`Sending argument blocks to backend for analysis:`, formattedBlocks);
            console.log(`Analysis options included: ${customPrompt ? 'Yes' : 'No'}`);

            // Create request data object with blocks and optional custom instructions
            const requestData: { blocks: any[], customInstructions?: string } = {
                blocks: formattedBlocks
            };

            // Add custom prompt if provided - this now contains only analysis options
            if (customPrompt) {
                requestData.customInstructions = customPrompt;
                console.log(`Analysis options length: ${customPrompt.length} characters`);
            }

            // Call the FastAPI backend
            const result = await api.analyzeArgument(requestData);

            // If backend call failed but didn't throw, handle gracefully
            if (!result || result.error) {
                throw new Error(result?.error || "Analysis failed with unknown error");
            }

            // Check if AI understood the input
            if (!result.grade || !result.feedback) {
                toast({
                    title: "Analysis incomplete",
                    description: "The AI couldn't fully understand your argument. Please try with a clearer structure.",
                    variant: "destructive",
                });
                return false;
            }

            // Set the analysis result from the API
            setAnalysis(result);

            // Use an advanced credit
            const creditUsed = await useAdvancedCredit();

            if (creditUsed) {
                // Immediately refresh subscription data after credit usage
                await getUserSubscription();

                toast({
                    title: "Analysis complete",
                    description: `Your argument received a grade of ${result.grade}.`,
                });
                return true;
            } else {
                toast({
                    title: "Error using credit",
                    description: "Could not update your credit balance",
                    variant: "destructive",
                });
                return false;
            }
        } catch (error) {
            console.error("Analysis error:", error);
            const errorMessage = error instanceof Error ? error.message : "There was an error analyzing your argument.";
            setError(errorMessage);

            toast({
                title: "Analysis failed",
                description: errorMessage.includes("AI couldn't")
                    ? errorMessage
                    : "The AI service encountered an error. Please try again later.",
                variant: "destructive",
            });
            return false;
        } finally {
            setIsAnalyzing(false);
        }
    };

    const clearAnalysis = () => {
        setAnalysis(null);
        setError(null);
    };

    return {
        isAnalyzing,
        analysis,
        error,
        analyzeArgument,
        clearAnalysis,
        setAnalysis
    };
}
