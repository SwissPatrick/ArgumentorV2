
import { Sparkles } from "lucide-react";
import { AnalysisResult } from "@/hooks/useArgumentAnalysis";
import { AnalyzeButton } from "./AnalyzeButton";
import { AnalysisResults } from "./AnalysisResults";

interface AnalysisTabProps {
    customPrompt: string;
    isAnalyzing: boolean;
    analysis: AnalysisResult | null;
    onAnalyze: () => void;
    onAddSuggestion: (type: string, content: string) => void;
}

export function AnalysisTab({
                                customPrompt,
                                isAnalyzing,
                                analysis,
                                onAnalyze,
                                onAddSuggestion
                            }: AnalysisTabProps) {
    return (
        <div className="flex flex-col gap-4">
            {customPrompt && (
                <div className="p-3 bg-primary-foreground rounded-md border border-primary/20">
                    <h4 className="text-sm font-medium mb-1">Custom Analysis Configuration:</h4>
                    <p className="text-xs text-muted-foreground whitespace-pre-line">{customPrompt}</p>
                </div>
            )}

            <AnalyzeButton
                onClick={onAnalyze}
                isAnalyzing={isAnalyzing}
            />

            <AnalysisResults
                analysis={analysis}
                onAddSuggestion={onAddSuggestion}
            />
        </div>
    );
}
