
import { useState, useEffect } from "react";
import { Check, Lightbulb, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/hooks/use-toast";

interface Suggestion {
    id: string;
    type: string;
    content: string;
    isImplemented: boolean;
}

interface SuggestionsChecklistProps {
    suggestions: Array<{
        type: string;
        content: string;
    }> | null;
    onAddSuggestion: (type: string, content: string) => void;
    onToggleGuide: () => void;
}

export function SuggestionsChecklist({
                                         suggestions,
                                         onAddSuggestion,
                                         onToggleGuide
                                     }: SuggestionsChecklistProps) {
    const [checklistItems, setChecklistItems] = useState<Suggestion[]>([]);

    useEffect(() => {
        if (suggestions && suggestions.length > 0) {
            // Convert incoming suggestions to checklist items
            const newItems = suggestions.map((suggestion, index) => ({
                id: `suggestion-${index}`,
                type: suggestion.type || 'premise',
                content: suggestion.content,
                isImplemented: false
            }));

            // Preserve existing items that have been implemented
            setChecklistItems(prev => {
                const prevImplemented = prev.filter(item => item.isImplemented);
                const prevImplementedIds = new Set(prevImplemented.map(item => item.content));

                // Filter out new items that match content of already implemented items
                const filteredNewItems = newItems.filter(
                    item => !prevImplementedIds.has(item.content)
                );

                return [...prevImplemented, ...filteredNewItems];
            });
        }
    }, [suggestions]);

    const handleToggleItem = (id: string) => {
        setChecklistItems(prev =>
            prev.map(item =>
                item.id === id
                    ? { ...item, isImplemented: !item.isImplemented }
                    : item
            )
        );
    };

    const handleAddToArgument = (type: string, content: string, id: string) => {
        onAddSuggestion(type, content);

        // Mark as implemented
        setChecklistItems(prev =>
            prev.map(item =>
                item.id === id
                    ? { ...item, isImplemented: true }
                    : item
            )
        );

        toast({
            title: "Suggestion added",
            description: "The suggestion has been added to your argument",
        });
    };

    if (!suggestions || suggestions.length === 0) {
        return null;
    }

    const pendingItems = checklistItems.filter(item => !item.isImplemented);
    const implementedItems = checklistItems.filter(item => item.isImplemented);

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
        <Card className="sticky top-24 bg-card/90 backdrop-blur-sm shadow-md border-border/50 transition-all hover:shadow-lg">
            <CardHeader className="pb-3 border-b border-border/30">
                <CardTitle className="text-lg flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Lightbulb className="h-5 w-5 text-amber-500" />
                        <span>Suggested Improvements</span>
                        <Badge variant="outline" className="ml-1 text-xs bg-primary/10 text-primary border-primary/30">
                            {pendingItems.length}
                        </Badge>
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 p-0 hover:bg-background/50"
                        onClick={onToggleGuide}
                        title="Show builder guide"
                    >
                        <span className="text-xs">Guide</span>
                    </Button>
                </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
                <ScrollArea className="h-[400px] pr-3">
                    {pendingItems.length > 0 && (
                        <div className="space-y-3">
                            <h3 className="text-sm font-medium text-muted-foreground">Pending</h3>
                            {pendingItems.map((item) => (
                                <div key={item.id} className="pb-2 border-b border-border/20 last:border-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Checkbox
                                            id={`check-${item.id}`}
                                            checked={item.isImplemented}
                                            onCheckedChange={() => handleToggleItem(item.id)}
                                        />
                                        <Label
                                            htmlFor={`check-${item.id}`}
                                            className="text-sm font-medium cursor-pointer"
                                        >
                                            <Badge variant="outline" className={`capitalize mr-2 text-xs ${getTypeColor(item.type)}`}>
                                                {item.type}
                                            </Badge>
                                            Add to argument
                                        </Label>
                                    </div>
                                    <p className="text-xs text-muted-foreground ml-6 mb-2 line-clamp-2">
                                        {item.content}
                                    </p>
                                    <div className="ml-6">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-7 text-xs bg-primary/5 hover:bg-primary/10 text-primary"
                                            onClick={() => handleAddToArgument(item.type, item.content, item.id)}
                                        >
                                            <Plus className="h-3 w-3 mr-1" /> Add to Argument
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {implementedItems.length > 0 && (
                        <>
                            {pendingItems.length > 0 && <Separator className="my-4" />}
                            <div className="space-y-3">
                                <h3 className="text-sm font-medium text-muted-foreground">Implemented</h3>
                                {implementedItems.map((item) => (
                                    <div key={item.id} className="pb-2 border-b border-border/20 last:border-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <Checkbox
                                                id={`check-${item.id}`}
                                                checked={item.isImplemented}
                                                onCheckedChange={() => handleToggleItem(item.id)}
                                            />
                                            <Label
                                                htmlFor={`check-${item.id}`}
                                                className="text-sm font-medium cursor-pointer line-through opacity-70"
                                            >
                                                <Badge variant="outline" className={`capitalize mr-2 text-xs ${getTypeColor(item.type)}`}>
                                                    {item.type}
                                                </Badge>
                                                Added to argument
                                            </Label>
                                        </div>
                                        <p className="text-xs text-muted-foreground ml-6 line-clamp-2 opacity-70">
                                            {item.content}
                                        </p>
                                        <div className="ml-6">
                                            <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                                                <Check className="h-3 w-3 mr-1" /> Implemented
                                            </Badge>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </ScrollArea>
            </CardContent>
        </Card>
    );
}
