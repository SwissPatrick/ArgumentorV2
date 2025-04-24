
import { BookOpen, FileText, MessageCircle, Search, Shield } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getSuggestionTypeIcon, getSuggestionTypeDescription } from "./suggestionUtils";

interface SuggestionTypeSelectorProps {
    suggestionType: string;
    setSuggestionType: (type: string) => void;
}

export function SuggestionTypeSelector({ suggestionType, setSuggestionType }: SuggestionTypeSelectorProps) {
    return (
        <div>
            <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-medium">Type of suggestion:</span>
            </div>
            <Select
                value={suggestionType}
                onValueChange={(value: string) => setSuggestionType(value)}
            >
                <SelectTrigger>
                    <SelectValue placeholder="Suggestion type" />
                </SelectTrigger>
                <SelectContent>
                    {/* Ordered logically by where they'd appear in an argument */}
                    <SelectItem value="premise" className="flex items-center">
                        <div className="flex items-center">
                            <BookOpen className="h-4 w-4 text-blue-500 mr-2" />
                            Help me with a premise
                        </div>
                    </SelectItem>
                    <SelectItem value="evidence">
                        <div className="flex items-center">
                            <Search className="h-4 w-4 text-purple-500 mr-2" />
                            Find supporting evidence
                        </div>
                    </SelectItem>
                    <SelectItem value="objection">
                        <div className="flex items-center">
                            <Shield className="h-4 w-4 rotate-180 text-amber-500 mr-2" />
                            Suggest possible objection
                        </div>
                    </SelectItem>
                    <SelectItem value="rebuttal">
                        <div className="flex items-center">
                            <Shield className="h-4 w-4 text-pink-500 mr-2" />
                            Create a rebuttal
                        </div>
                    </SelectItem>
                    <SelectItem value="conclusion">
                        <div className="flex items-center">
                            <MessageCircle className="h-4 w-4 text-green-500 mr-2" />
                            Suggest a conclusion
                        </div>
                    </SelectItem>
                </SelectContent>
            </Select>
            <div className="flex gap-2 mt-2 text-sm text-muted-foreground">
                {getSuggestionTypeIcon(suggestionType)}
                <span>{getSuggestionTypeDescription(suggestionType)}</span>
            </div>
        </div>
    );
}
