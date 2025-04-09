
import { AnalysisResult } from "@/hooks/useArgumentAnalysis";
import { ArgumentGrade } from "./ArgumentGrade";
import { FallaciesList } from "./FallaciesList";
import { SuggestionsList } from "./SuggestionsList";
import { Separator } from "@/components/ui/separator";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface AnalysisResultsProps {
    analysis: AnalysisResult | null;
    onAddSuggestion: (type: string, content: string) => void;
}

export function AnalysisResults({ analysis, onAddSuggestion }: AnalysisResultsProps) {
    if (!analysis) return null;

    // Handle potentially malformed analysis data
    let validAnalysis;

    try {
        validAnalysis = {
            strength: typeof analysis.strength === 'number' ? analysis.strength : 0,
            grade: analysis.grade || 'F',
            feedback: analysis.feedback || 'No feedback available.',
            fallacies: Array.isArray(analysis.fallacies) ? analysis.fallacies : [],
            suggestions: Array.isArray(analysis.suggestions) ? analysis.suggestions : []
        };

        // Validate each fallacy has required properties
        validAnalysis.fallacies = validAnalysis.fallacies.filter(fallacy =>
            fallacy && typeof fallacy === 'object' &&
            fallacy.type && typeof fallacy.type === 'string' &&
            fallacy.description && typeof fallacy.description === 'string'
        );

        // Validate each suggestion has required properties
        validAnalysis.suggestions = validAnalysis.suggestions.filter(suggestion =>
            suggestion && typeof suggestion === 'object' &&
            suggestion.content && typeof suggestion.content === 'string'
        );

        // Ensure each suggestion has a type
        validAnalysis.suggestions = validAnalysis.suggestions.map(suggestion => ({
            ...suggestion,
            type: suggestion.type || 'premise'
        }));

    } catch (error) {
        console.error("Error processing analysis data:", error);
        return (
            <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Analysis Error</AlertTitle>
                <AlertDescription>
                    There was a problem interpreting the AI analysis results. Please try again.
                </AlertDescription>
            </Alert>
        );
    }

    return (
        <div className="space-y-6 mt-2">
            <ArgumentGrade
                strength={validAnalysis.strength}
                grade={validAnalysis.grade}
                feedback={validAnalysis.feedback}
            />

            {validAnalysis.fallacies.length > 0 && (
                <>
                    <Separator className="my-4" />
                    <FallaciesList fallacies={validAnalysis.fallacies} />
                </>
            )}

            {validAnalysis.suggestions.length > 0 && (
                <>
                    <Separator className="my-4" />
                    <SuggestionsList
                        suggestions={validAnalysis.suggestions}
                        onAddSuggestion={onAddSuggestion}
                    />
                </>
            )}
        </div>
    );
}
