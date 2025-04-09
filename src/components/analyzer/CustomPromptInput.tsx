
import { Info } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface CustomPromptInputProps {
    customPrompt: string;
    setCustomPrompt: (value: string) => void;
}

export function CustomPromptInput({ customPrompt, setCustomPrompt }: CustomPromptInputProps) {
    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Current analysis configuration:</span>
                </div>

                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className="cursor-help">
                                <Info className="h-4 w-4 text-muted-foreground" />
                            </div>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="max-w-xs">
                            <p className="text-xs">
                                Select analysis options below to customize how the AI analyzes your argument
                            </p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>

            {customPrompt ? (
                <div className="p-3 bg-primary-foreground rounded-md border border-primary/20">
                    <p className="text-xs text-muted-foreground whitespace-pre-line">{customPrompt}</p>
                </div>
            ) : (
                <div className="p-3 bg-muted/50 rounded-md">
                    <p className="text-xs text-muted-foreground italic">No analysis options selected yet. Choose options below to customize the analysis.</p>
                </div>
            )}
        </div>
    );
}
