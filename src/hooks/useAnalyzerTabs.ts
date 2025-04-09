
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

export function useAnalyzerTabs() {
    const [activeTab, setActiveTab] = useState<string>("analysis");
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [customPrompt, setCustomPrompt] = useState("");

    const toggleCollapse = () => setIsCollapsed(!isCollapsed);

    // Sanitize custom instructions to prevent problematic inputs
    const sanitizeCustomPrompt = (prompt: string): string => {
        if (!prompt) return "";

        // Remove any potentially harmful content
        const sanitized = prompt
            .replace(/[^\w\s.,?!;:()\[\]{}'"\/\\-]/g, '') // Only allow these characters
            .trim();

        // Check if the sanitized text is too short or appears to be problematic
        if (sanitized.length < 3) {
            return "";
        }

        // Check for potentially harmful patterns that might confuse the AI
        const potentiallyHarmfulPatterns = [
            /ignore previous instructions/i,
            /disregard your programming/i,
            /bypass filters/i,
            /system prompt/i,
            /ignore all previous commands/i,
            /delete all/i,
        ];

        for (const pattern of potentiallyHarmfulPatterns) {
            if (pattern.test(sanitized)) {
                toast({
                    title: "Invalid instruction",
                    description: "Your instruction contains inappropriate content that may interfere with the analysis.",
                    variant: "destructive",
                });
                return "";
            }
        }

        return sanitized;
    };

    const addAnalysisOption = (option: string) => {
        // Sanitize the option to ensure it doesn't contain harmful content
        const sanitizedOption = sanitizeCustomPrompt(option);
        if (!sanitizedOption) return;

        // Add the option to the existing custom prompt
        setCustomPrompt(prev => {
            const currentPrompt = prev.trim();
            const separator = currentPrompt ? "\n\n" : "";
            return `${currentPrompt}${separator}${sanitizedOption}`;
        });

        // Switch to analysis tab after adding an option
        setActiveTab("analysis");

        toast({
            title: "Analysis option added",
            description: `Added "${option}" to your analysis instructions.`,
        });
    };

    return {
        activeTab,
        setActiveTab,
        isCollapsed,
        toggleCollapse,
        customPrompt,
        setCustomPrompt,
        sanitizeCustomPrompt,
        addAnalysisOption
    };
}
