
import { FileText } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { getPlaceholderText } from "./suggestionUtils";

interface CustomPromptInputProps {
    customPrompt: string;
    setCustomPrompt: (prompt: string) => void;
    suggestionType: string;
}

export function CustomPromptInput({ customPrompt, setCustomPrompt, suggestionType }: CustomPromptInputProps) {
    return (
        <div className="space-y-2 mt-2">
            <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Specific request (optional):</span>
            </div>
            <Textarea
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder={getPlaceholderText(suggestionType)}
                className="min-h-[100px] resize-none"
            />
            <p className="text-xs text-muted-foreground italic">
                Providing context makes the suggestion more relevant to your argument.
            </p>
        </div>
    );
}
