
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

interface AnalyzeButtonProps {
    onClick: () => void;
    isAnalyzing: boolean;
}

export function AnalyzeButton({ onClick, isAnalyzing }: AnalyzeButtonProps) {
    return (
        <Button
            onClick={onClick}
            disabled={isAnalyzing}
            className="gap-2 mb-4 w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white transition-all"
        >
            <Sparkles className="h-4 w-4" />
            {isAnalyzing ? "Analyzing..." : "Analyze Argument"}
        </Button>
    );
}
