
import { Button } from "@/components/ui/button";
import { Card, CardDescription } from "@/components/ui/card";
import { GripVertical, Loader2, Sparkles, Trash2 } from "lucide-react";

interface ArgumentBlockProps {
    id: string;
    type: "premise" | "conclusion" | "evidence" | "objection" | "rebuttal";
    content: string;
    onUpdate: (id: string, content: string) => void;
    onDelete: (id: string) => void;
    onMoveUp: () => void;
    onMoveDown: () => void;
    canMoveUp: boolean;
    canMoveDown: boolean;
    onRequestSuggestion: (id: string) => void;
    isProcessing: boolean;
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
                                  canMoveUp,
                                  canMoveDown,
                                  onRequestSuggestion,
                                  isProcessing,
                                  isAiGenerated
                              }: ArgumentBlockProps) {
    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onUpdate(id, e.target.value);
    };

    return (
        <div className="relative group">
            <Card className="border bg-card/50 backdrop-blur-sm shadow-sm transition-all hover:shadow">
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
                </div>
                <CardDescription className="px-4 py-3 text-sm capitalize border-b border-border/40 bg-muted/10">{type}</CardDescription>
                <textarea
                    id={`block-content-${id}`}
                    value={content}
                    onChange={handleContentChange}
                    placeholder={`Enter your ${type} here...`}
                    className="w-full resize-none border-none focus-visible:ring-0 bg-transparent px-4 py-3 text-sm min-h-[75px]"
                />
            </Card>

            <div className="flex items-center gap-2 mt-4">
                <div className="flex-1 flex gap-2">
                    {canMoveUp && (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={onMoveUp}
                            className="h-8"
                        >
                            <GripVertical className="h-4 w-4 rotate-180" />
                        </Button>
                    )}

                    {canMoveDown && (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={onMoveDown}
                            className="h-8"
                        >
                            <GripVertical className="h-4 w-4" />
                        </Button>
                    )}

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onRequestSuggestion(id)}
                        disabled={isProcessing}
                        className="border-amber-500/30 hover:border-amber-500/60 text-amber-600 hover:text-amber-700 transition-colors"
                    >
                        {isProcessing ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <Sparkles className="h-4 w-4" />
                        )}
                        <span className="ml-2">Improve</span>
                    </Button>
                </div>

                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDelete(id)}
                    className="text-destructive hover:text-destructive"
                >
                    <Trash2 className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}
