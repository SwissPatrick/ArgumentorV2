import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CreditsDisplay } from "./suggestion/CreditsDisplay";
import { SuggestionTypeSelector } from "./suggestion/SuggestionTypeSelector";
import { CustomPromptInput } from "./suggestion/CustomPromptInput";
import { useSuggestionDialog } from "./suggestion/useSuggestionDialog";

interface AISuggestionDialogProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    onRequestSuggestion: (type: string, prompt?: string) => void;
    isGeneratingSuggestion: boolean;
}

export function AISuggestionDialog({
                                       isOpen,
                                       onOpenChange,
                                       onRequestSuggestion,
                                       isGeneratingSuggestion
                                   }: AISuggestionDialogProps) {
    const {
        suggestionType,
        setSuggestionType,
        customPrompt,
        setCustomPrompt,
        basicCredits,
        advancedCredits,
        isLoading
    } = useSuggestionDialog(isOpen);

    const handleSubmit = () => {
        onRequestSuggestion(suggestionType, customPrompt);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>AI Assistant</DialogTitle>
                    <DialogDescription>
                        Get AI suggestions to improve your argument. Uses 1 basic credit.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <CreditsDisplay
                        basicCredits={basicCredits}
                        advancedCredits={advancedCredits}
                        isLoading={isLoading}
                    />

                    <SuggestionTypeSelector
                        suggestionType={suggestionType}
                        setSuggestionType={setSuggestionType}
                    />

                    <CustomPromptInput
                        customPrompt={customPrompt}
                        setCustomPrompt={setCustomPrompt}
                        suggestionType={suggestionType}
                    />
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isGeneratingSuggestion}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={isGeneratingSuggestion || basicCredits <= 0 || isLoading}
                        className="gap-1 bg-amber-500 hover:bg-amber-600 text-white"
                    >
                        {isGeneratingSuggestion ? "Generating..." : isLoading ? "Loading..." : basicCredits <= 0 ? "No Basic Credits Left" : "Get Suggestion"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
