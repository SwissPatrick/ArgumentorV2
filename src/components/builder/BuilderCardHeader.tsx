
import { Button } from "@/components/ui/button";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { BookOpen, Sparkles } from "lucide-react";

interface BuilderCardHeaderProps {
    onOpenClearDialog: () => void;
    onOpenSuggestionDialog: () => void;
    onAnalyzeArgument: () => void;
}

export function BuilderCardHeader({
                                      onOpenClearDialog,
                                      onOpenSuggestionDialog,
                                      onAnalyzeArgument
                                  }: BuilderCardHeaderProps) {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                <div>
                    <CardTitle className="text-xl flex items-center">
                        <BookOpen className="h-5 w-5 mr-2 text-primary opacity-80" />
                        <span>Argument Builder</span>
                    </CardTitle>
                    <CardDescription className="mt-1">
                        Create, arrange, and connect your argument components
                    </CardDescription>
                </div>
                <div className="flex flex-wrap gap-2 justify-end mt-3 md:mt-0">
                    <Button
                        variant="outline"
                        size="sm"
                        className="border-primary/30 hover:border-primary/60 transition-colors"
                        onClick={onOpenSuggestionDialog}
                    >
                        <Sparkles className="mr-1 h-4 w-4 text-amber-500" /> AI Suggestion
                    </Button>

                    <Button
                        variant="default"
                        size="sm"
                        onClick={onAnalyzeArgument}
                        className="hidden md:flex bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all"
                    >
                        <Sparkles className="mr-1 h-4 w-4" /> Analyze Argument
                    </Button>
                </div>
            </div>
        </div>
    );
}
