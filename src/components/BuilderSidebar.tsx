
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Check, Lightbulb, Plus, ListPlus, Info } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface BuilderSidebarProps {
    savedSuggestions: Array<{
        id: string;
        type: string;
        content: string;
        isImplemented: boolean;
    }>;
    onImplementSuggestion: (id: string) => void;
}

export function BuilderSidebar({ savedSuggestions, onImplementSuggestion }: BuilderSidebarProps) {
    const handleImplementSuggestion = (id: string) => {
        onImplementSuggestion(id);

        toast({
            title: "Suggestion added",
            description: "The suggestion has been added to your argument",
        });
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

    // If no saved suggestions, show a simplified placeholder
    if (savedSuggestions.length === 0) {
        return (
            <div className="lg:col-span-1">
                <Card className="sticky top-24 bg-card/50 backdrop-blur-sm shadow-sm border-border/40">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <ListPlus className="h-4 w-4 text-primary" />
                                <span>Suggestions</span>
                            </div>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Info className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                                    </TooltipTrigger>
                                    <TooltipContent side="top">
                                        <p className="max-w-xs text-xs">
                                            Advanced feature available with premium subscriptions.
                                        </p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 text-center text-muted-foreground">
                        <div className="flex flex-col items-center gap-2">
                            <Lightbulb className="h-8 w-8 text-muted-foreground/30" />
                            <p className="text-sm">No suggestions yet</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const pendingSuggestions = savedSuggestions.filter(s => !s.isImplemented);
    const implementedSuggestions = savedSuggestions.filter(s => s.isImplemented);

    return (
        <div className="lg:col-span-1">
            <Card className="sticky top-24 bg-card/50 backdrop-blur-sm shadow-sm border-border/40">
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <ListPlus className="h-4 w-4 text-primary" />
                            <span>Suggestions</span>
                            {pendingSuggestions.length > 0 && (
                                <Badge variant="outline" className="ml-1 text-xs bg-primary/10 text-primary border-primary/30">
                                    {pendingSuggestions.length}
                                </Badge>
                            )}
                        </div>
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-3">
                    <ScrollArea className="h-[350px] pr-2">
                        {pendingSuggestions.length > 0 && (
                            <div className="space-y-3">
                                <h3 className="text-xs font-medium text-muted-foreground">Pending</h3>
                                {pendingSuggestions.map((suggestion) => (
                                    <div
                                        key={`pending-${suggestion.id}`}
                                        className="border rounded-md p-2 transition-all bg-card hover:shadow-sm hover:border-primary/20"
                                    >
                                        <div className="flex items-center justify-between mb-1">
                                            <Badge variant="outline" className={`capitalize text-xs ${getTypeColor(suggestion.type)}`}>
                                                {suggestion.type}
                                            </Badge>
                                        </div>
                                        <p className="text-xs text-muted-foreground mb-2 line-clamp-3">{suggestion.content}</p>
                                        <div className="flex justify-end">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="text-xs h-7 bg-primary/5 hover:bg-primary/10 text-primary"
                                                onClick={() => handleImplementSuggestion(suggestion.id)}
                                            >
                                                <Plus className="h-3 w-3 mr-1" /> Add
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {implementedSuggestions.length > 0 && (
                            <div className="space-y-3 mt-4">
                                <h3 className="text-xs font-medium text-muted-foreground">Implemented</h3>
                                {implementedSuggestions.map((suggestion) => (
                                    <div
                                        key={`implemented-${suggestion.id}`}
                                        className="border rounded-md p-2 transition-all bg-muted/30 border-green-100"
                                    >
                                        <div className="flex items-center justify-between mb-1">
                                            <Badge variant="outline" className={`capitalize text-xs ${getTypeColor(suggestion.type)}`}>
                                                {suggestion.type}
                                            </Badge>
                                        </div>
                                        <p className="text-xs text-muted-foreground opacity-75 mb-1 line-clamp-2">{suggestion.content}</p>
                                        <div className="flex justify-end">
                                            <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                                                <Check className="h-3 w-3 mr-1" /> Added
                                            </Badge>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </ScrollArea>
                </CardContent>
            </Card>
        </div>
    );
}
