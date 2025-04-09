
import { toast } from "@/hooks/use-toast";
import { hasBasicCredits, useBasicCredit, getUserSubscription } from "@/lib/subscription";

export function useSuggestionHandler(
    onAddSuggestion: (type: string, content: string) => void
) {
    const handleAddSuggestion = async (type: string, content: string) => {
        const hasAvailableCredits = await hasBasicCredits();
        if (!hasAvailableCredits) {
            toast({
                title: "No credits remaining",
                description: "Please upgrade your subscription to add more suggestions",
                variant: "destructive",
            });
            return false;
        }

        // Use a credit
        const creditUsed = await useBasicCredit();

        if (creditUsed) {
            onAddSuggestion(type, content);

            // Refresh subscription data immediately after credit usage
            await getUserSubscription();

            toast({
                title: "Suggestion added",
                description: `Added AI suggestion as a new ${type} block.`,
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
    };

    return { handleAddSuggestion };
}
