
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ArrowDownToLine, ArrowUpToLine, Trash2, Check, Edit, Sparkles, Lightbulb } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface ArgumentBlockProps {
    id: string;
    type: "premise" | "conclusion" | "evidence" | "objection" | "rebuttal";
    content: string;
    onUpdate: (id: string, content: string) => void;
    onDelete: (id: string) => void;
    onMoveUp?: () => void;
    onMoveDown?: () => void;
    canMoveUp?: boolean;
    canMoveDown?: boolean;
    onRequestSuggestion?: () => void;
    isProcessing?: boolean;
    isAiGenerated?: boolean;
}

export function ArgumentBlock({
                                  id,
                                  type,
                                  content,
                                  onUpdate,
                                  onDelete,
                                  onMoveUp,
                                  onMoveDown,
                                  canMoveUp = true,
                                  canMoveDown = true,
                                  onRequestSuggestion,
                                  isProcessing = false,
                                  isAiGenerated = false
                              }: ArgumentBlockProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editContent, setEditContent] = useState(content);
    const [showAiSuggestion, setShowAiSuggestion] = useState(false);

    // Separate original content from AI improvement
    const originalContent = content.split("AI Improvement: ")[0]?.trim();
    const aiImprovement = content.includes("AI Improvement: ")
        ? content.split("AI Improvement: ")[1]?.trim()
        : "";

    const hasAiImprovement = content.includes("AI Improvement: ");

    const handleSave = () => {
        onUpdate(id, editContent);
        setIsEditing(false);
    };

    const typeColors = {
        premise: "bg-blue-100 text-blue-800 border-blue-200",
        conclusion: "bg-green-100 text-green-800 border-green-200",
        evidence: "bg-purple-100 text-purple-800 border-purple-200",
        objection: "bg-amber-100 text-amber-800 border-amber-200",
        rebuttal: "bg-pink-100 text-pink-800 border-pink-200"
    };

    const cardBorders = {
        premise: "border-l-blue-400",
        conclusion: "border-l-green-400",
        evidence: "border-l-purple-400",
        objection: "border-l-amber-400",
        rebuttal: "border-l-pink-400"
    };

    const typeLabels = {
        premise: "Premise",
        conclusion: "Conclusion",
        evidence: "Evidence",
        objection: "Objection",
        rebuttal: "Rebuttal"
    };

    const typeIcons = {
        premise: "📊",
        conclusion: "🎯",
        evidence: "📝",
        objection: "⚠️",
        rebuttal: "🛡️"
    };

    return (
        <Card className={`border-l-4 ${cardBorders[type]} shadow-sm transition-all transform hover:shadow ${isEditing ? 'ring-2 ring-primary/20' : ''}`}>
            <CardHeader className="flex flex-row items-center justify-between py-3">
                <CardTitle className="text-lg flex items-center gap-2">
          <span className="text-lg" aria-hidden="true">
            {typeIcons[type]}
          </span>
                    <Badge variant="outline" className={typeColors[type]}>
                        {typeLabels[type]}
                    </Badge>
                    {isAiGenerated && (
                        <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-xs">
                            AI-enhanced
                        </Badge>
                    )}
                </CardTitle>
                <div className="flex items-center space-x-1">
                    {onMoveUp && canMoveUp && (
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="ghost" size="icon" onClick={onMoveUp} className="h-8 w-8">
                                        <ArrowUpToLine className="h-4 w-4" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Move up</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    )}
                    {onMoveDown && canMoveDown && (
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="ghost" size="icon" onClick={onMoveDown} className="h-8 w-8">
                                        <ArrowDownToLine className="h-4 w-4" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Move down</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    )}
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" onClick={() => onDelete(id)} className="h-8 w-8 text-destructive hover:bg-destructive/10">
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Delete block</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </CardHeader>
            <CardContent className="pb-3">
                {isEditing ? (
                    <Textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        rows={4}
                        className="w-full"
                        autoFocus
                    />
                ) : (
                    <div className="space-y-3">
                        <p className="whitespace-pre-line">{originalContent}</p>

                        {hasAiImprovement && (
                            <div className="mt-4 relative">
                                <div className="absolute -top-3 right-0 transform translate-y-0">
                                    <Badge className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white border-0 shadow-sm">
                                        <Sparkles className="h-3 w-3 mr-1" />
                                        AI Enhancement
                                    </Badge>
                                </div>
                                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-md border border-indigo-100 shadow-sm">
                                    <div className="flex gap-2">
                                        <div className="flex-shrink-0 mt-1">
                                            <div className="bg-gradient-to-r from-indigo-400 to-purple-400 w-7 h-7 rounded-full flex items-center justify-center shadow-sm">
                                                <Lightbulb className="h-4 w-4 text-white" />
                                            </div>
                                        </div>
                                        <div className="flex-grow">
                                            <p className="text-sm leading-relaxed text-slate-700 whitespace-pre-line">{aiImprovement}</p>
                                            <div className="flex justify-end mt-2">
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    className="text-xs text-indigo-700 hover:text-indigo-800 hover:bg-indigo-100"
                                                    onClick={() => {
                                                        setEditContent(aiImprovement);
                                                        setIsEditing(true);
                                                    }}
                                                >
                                                    <Edit className="h-3 w-3 mr-1" />
                                                    Edit with this suggestion
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </CardContent>
            {isEditing ? (
                <CardFooter className="flex justify-end space-x-2 py-2">
                    <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>
                        Cancel
                    </Button>
                    <Button size="sm" onClick={handleSave}>
                        <Check className="mr-1 h-4 w-4" /> Save
                    </Button>
                </CardFooter>
            ) : (
                <CardFooter className="py-2 flex justify-between">
                    <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
                        <Edit className="mr-1 h-4 w-4" /> Edit
                    </Button>

                    {onRequestSuggestion && (
                        <Button
                            variant={hasAiImprovement ? "outline" : "ghost"}
                            size="sm"
                            onClick={onRequestSuggestion}
                            disabled={isProcessing}
                            className={hasAiImprovement
                                ? "border-indigo-200 text-indigo-700 hover:text-indigo-800 hover:bg-indigo-50 hover:border-indigo-300"
                                : "text-primary hover:text-primary-foreground hover:bg-primary"}
                        >
                            <Sparkles className="mr-1 h-4 w-4" />
                            {isProcessing ? "Improving..." : hasAiImprovement ? "Refine with AI" : "Improve with AI"}
                        </Button>
                    )}
                </CardFooter>
            )}
        </Card>
    );
}
