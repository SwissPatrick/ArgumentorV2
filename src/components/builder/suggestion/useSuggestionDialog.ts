
import { useEffect, useState } from "react";
import { getUserSubscription } from "@/lib/subscription";
import { toast } from "@/hooks/use-toast";

export function useSuggestionDialog(isOpen: boolean) {
    const [suggestionType, setSuggestionType] = useState<string>("evidence");
    const [customPrompt, setCustomPrompt] = useState<string>("");
    const [basicCredits, setBasicCredits] = useState<number>(0);
    const [advancedCredits, setAdvancedCredits] = useState<number>(0);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isOpen) {
            loadCredits();
        }
    }, [isOpen]);

    useEffect(() => {
        // Reset custom prompt when suggestion type changes
        setCustomPrompt("");
    }, [suggestionType]);

    const loadCredits = async () => {
        setIsLoading(true);
        try {
            const subscription = await getUserSubscription();
            setBasicCredits(subscription.basicCreditsRemaining);
            setAdvancedCredits(subscription.advancedCreditsRemaining);
        } catch (error) {
            console.error("Error loading credits:", error);
            toast({
                title: "Error loading credits",
                description: "Please try refreshing the page",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return {
        suggestionType,
        setSuggestionType,
        customPrompt,
        setCustomPrompt,
        basicCredits,
        advancedCredits,
        isLoading,
        loadCredits
    };
}
