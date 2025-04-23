
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
                        className="border-amber-500/30 hover:border-amber-500/60 text-amber-600 hover:text-amber-700 transition-colors"
                        onClick={onOpenSuggestionDialog}
                    >
                        <Sparkles className="mr-1 h-4 w-4" /> AI Assistant
                    </Button>

                    <Button
                        variant="default"
                        size="sm"
                        onClick={onAnalyzeArgument}
                        className="bg-purple-600 hover:bg-purple-700 text-white transition-all"
                    >
                        <Sparkles className="mr-1 h-4 w-4" /> Analyze
                    </Button>
                </div>
            </div>
        </div>
    );
}
