
import { useState } from "react";
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

    // If no saved suggestions, show a placeholder
    if (savedSuggestions.length === 0) {
        return (
            <div className="lg:col-span-1">
                <Card className="sticky top-24 bg-card/90 backdrop-blur-sm shadow-md border-border/50 transition-all hover:shadow-lg">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <ListPlus className="h-5 w-5 text-primary" />
                                <span>Suggestions List</span>
                            </div>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <div className="flex items-center gap-1 bg-amber-50 text-amber-700 px-2 py-0.5 rounded-md text-xs border border-amber-200">
                                            <Info className="h-3 w-3" />
                                            <span>Advanced Feature</span>
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent side="top">
                                        <p className="max-w-xs text-xs">
                                            This feature requires advanced credits. Available with premium subscriptions.
                                        </p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 text-center text-muted-foreground">
                        <div className="flex flex-col items-center gap-3">
                            <Lightbulb className="h-10 w-10 text-muted-foreground/30" />
                            <p>No suggestions added yet</p>
                            <p className="text-sm">Use "Add to List" from the AI Analysis to save suggestions here</p>
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
            <Card className="sticky top-24 bg-card/90 backdrop-blur-sm shadow-md border-border/50 transition-all hover:shadow-lg">
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <ListPlus className="h-5 w-5 text-primary" />
                            <span>Suggestions List</span>
                            <Badge variant="outline" className="ml-1 text-xs bg-primary/10 text-primary border-primary/30">
                                {pendingSuggestions.length}
                            </Badge>
                        </div>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div className="flex items-center gap-1 bg-amber-50 text-amber-700 px-2 py-0.5 rounded-md text-xs border border-amber-200">
                                        <Info className="h-3 w-3" />
                                        <span>Advanced Feature</span>
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent side="top">
                                    <p className="max-w-xs text-xs">
                                        This feature requires advanced credits. Available with premium subscriptions.
                                    </p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                    <ScrollArea className="h-[400px] pr-3">
                        {pendingSuggestions.length > 0 && (
                            <div className="space-y-4">
                                <h3 className="text-sm font-medium text-muted-foreground">Pending</h3>
                                {pendingSuggestions.map((suggestion) => (
                                    <div
                                        key={`pending-${suggestion.id}`}
                                        className="border rounded-md p-3 transition-all bg-card hover:shadow-sm hover:border-primary/20"
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <Badge variant="outline" className={`capitalize ${getTypeColor(suggestion.type)}`}>
                                                {suggestion.type}
                                            </Badge>
                                        </div>
                                        <p className="text-sm text-muted-foreground mb-3 line-clamp-3">{suggestion.content}</p>
                                        <div className="flex justify-end">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="text-xs bg-primary/5 hover:bg-primary/10 text-primary"
                                                onClick={() => handleImplementSuggestion(suggestion.id)}
                                            >
                                                <Plus className="h-3 w-3 mr-1" /> Add to Argument
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {implementedSuggestions.length > 0 && (
                            <div className="space-y-4 mt-6">
                                <h3 className="text-sm font-medium text-muted-foreground">Implemented</h3>
                                {implementedSuggestions.map((suggestion) => (
                                    <div
                                        key={`implemented-${suggestion.id}`}
                                        className="border rounded-md p-3 transition-all bg-muted/30 border-green-100"
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <Badge variant="outline" className={`capitalize ${getTypeColor(suggestion.type)}`}>
                                                {suggestion.type}
                                            </Badge>
                                        </div>
                                        <p className="text-sm text-muted-foreground opacity-75 mb-3 line-clamp-2">{suggestion.content}</p>
                                        <div className="flex justify-end">
                                            <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                                                <Check className="h-3 w-3 mr-1" /> Added to argument
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
