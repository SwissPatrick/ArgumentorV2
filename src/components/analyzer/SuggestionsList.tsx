
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Sparkles, Check, ListPlus, Info } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface Suggestion {
    type: string;
    content: string;
}

interface SuggestionsListProps {
    suggestions: Suggestion[];
    onAddSuggestion: (type: string, content: string) => void;
}

export function SuggestionsList({ suggestions, onAddSuggestion }: SuggestionsListProps) {
    const [addedSuggestions, setAddedSuggestions] = useState<Set<number>>(new Set());

    if (suggestions.length === 0) return null;

    const handleAddSuggestion = (index: number, type: string, content: string) => {
        try {
            onAddSuggestion(type, content);
            setAddedSuggestions(prev => new Set(prev).add(index));

            toast({
                title: "Suggestion added to list",
                description: "The AI suggestion has been added to your list",
                variant: "default",
            });
        } catch (error) {
            console.error("Error adding suggestion:", error);
            toast({
                title: "Failed to add suggestion",
                description: "There was an error adding this suggestion. Please try again.",
                variant: "destructive",
            });
        }
    };

    const getTypeColor = (type: string) => {
        const colors = {
            "premise": "bg-blue-100 text-blue-800 border-blue-200",
            "conclusion": "bg-green-100 text-green-800 border-green-200",
            "evidence": "bg-purple-100 text-purple-800 border-purple-200",
            "objection": "bg-amber-100 text-amber-800 border-amber-200",
            "rebuttal": "bg-pink-100 text-pink-800 border-pink-200",
        };
        return colors[type as keyof typeof colors] || "bg-gray-100 text-gray-800 border-gray-200";
    };

    return (
        <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
                <div className="bg-indigo-100 p-1 rounded-full">
                    <Sparkles className="h-4 w-4 text-indigo-600" />
                </div>
                <span>Suggested Improvements</span>
                <span className="text-xs text-muted-foreground ml-2 bg-muted px-2 py-0.5 rounded-full">
          {suggestions.length}
        </span>

                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className="ml-auto flex items-center gap-1 bg-amber-50 text-amber-700 px-2 py-0.5 rounded-md text-xs border border-amber-200">
                                <Info className="h-3 w-3" />
                                <span>Advanced Credits</span>
                            </div>
                        </TooltipTrigger>
                        <TooltipContent side="top">
                            <p className="max-w-xs text-xs">
                                Suggestions require advanced credits. Upgrade your subscription for more analysis features.
                            </p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </h3>
            <div className="grid gap-3 sm:grid-cols-1 lg:grid-cols-2">
                {suggestions.map((suggestion, i) => {
                    const isAdded = addedSuggestions.has(i);
                    const validType = suggestion.type && typeof suggestion.type === 'string'
                        ? suggestion.type.toLowerCase()
                        : 'premise';

                    return (
                        <div
                            key={i}
                            className={`border rounded-md transition-all ${
                                isAdded
                                    ? "bg-green-50 border-green-200"
                                    : "bg-white border-gray-200 hover:border-indigo-200 hover:shadow-sm"
                            }`}
                        >
                            <div className="flex items-center justify-between p-3 border-b border-gray-100">
                                <Badge variant="outline" className={`capitalize ${getTypeColor(validType)}`}>
                                    {validType}
                                </Badge>
                                <Badge className="bg-gradient-to-r from-indigo-400 to-purple-400 hover:from-indigo-500 hover:to-purple-500 border-0 font-normal text-white">
                                    <Sparkles className="h-3 w-3 mr-1" />
                                    AI-generated
                                </Badge>
                            </div>
                            <div className="p-3">
                                <p className="text-sm my-2 line-clamp-3">{suggestion.content}</p>
                            </div>
                            <div className="flex justify-end p-2 bg-gray-50 rounded-b-md">
                                <Button
                                    variant={isAdded ? "outline" : "ghost"}
                                    size="sm"
                                    onClick={() => handleAddSuggestion(i, validType, suggestion.content)}
                                    disabled={isAdded}
                                    className={isAdded
                                        ? "border-green-200 text-green-700 bg-green-50 hover:bg-green-50 hover:text-green-700"
                                        : "hover:bg-indigo-50 hover:text-indigo-700"}
                                >
                                    {isAdded ? (
                                        <>
                                            <Check className="h-3.5 w-3.5 mr-1 text-green-600" /> Added to List
                                        </>
                                    ) : (
                                        <>
                                            <ListPlus className="h-3.5 w-3.5 mr-1" /> Add to List
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
