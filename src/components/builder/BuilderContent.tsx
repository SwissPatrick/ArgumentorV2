
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArgumentBlockList } from "@/components/builder/ArgumentBlockList";
import { BuilderCardHeader } from "@/components/builder/BuilderCardHeader";
import { ArgumentItem } from "@/hooks/useArgumentBlocks";
import { Trash2 } from "lucide-react";

interface BuilderContentProps {
    title: string;
    setTitle: (title: string) => void;
    argumentBlocks: ArgumentItem[];
    onMoveBlockUp: (index: number) => void;
    onMoveBlockDown: (index: number) => void;
    onUpdateBlock: (id: string, content: string) => void;
    onDeleteBlock: (id: string) => void;
    onOpenAddDialog: () => void;
    onOpenClearDialog: () => void;
    onOpenSuggestionDialog: () => void;
    onAnalyzeArgument: () => void;
    onRequestBlockSuggestion: (blockId: string) => void;
    isGeneratingSuggestion: boolean;
    selectedBlockId: string | null;
}

export function BuilderContent({
                                   title,
                                   setTitle,
                                   argumentBlocks,
                                   onMoveBlockUp,
                                   onMoveBlockDown,
                                   onUpdateBlock,
                                   onDeleteBlock,
                                   onOpenAddDialog,
                                   onOpenClearDialog,
                                   onOpenSuggestionDialog,
                                   onAnalyzeArgument,
                                   onRequestBlockSuggestion,
                                   isGeneratingSuggestion,
                                   selectedBlockId
                               }: BuilderContentProps) {
    return (
        <Card className="mb-6 border bg-card/90 backdrop-blur-sm shadow-md transition-all hover:shadow-lg">
            <CardHeader className="pb-3 border-b border-border/40">
                <BuilderCardHeader
                    onOpenClearDialog={onOpenClearDialog}
                    onOpenSuggestionDialog={onOpenSuggestionDialog}
                    onAnalyzeArgument={onAnalyzeArgument}
                />
            </CardHeader>
            <CardContent className="p-5">
                <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="text-lg font-medium mb-6 border-border/50 bg-background/50 focus:bg-background transition-colors"
                    placeholder="Enter argument title..."
                />

                <ArgumentBlockList
                    argumentBlocks={argumentBlocks}
                    onMoveBlockUp={onMoveBlockUp}
                    onMoveBlockDown={onMoveBlockDown}
                    onUpdateBlock={onUpdateBlock}
                    onDeleteBlock={onDeleteBlock}
                    onOpenAddDialog={onOpenAddDialog}
                    onRequestBlockSuggestion={onRequestBlockSuggestion}
                    isGeneratingSuggestion={isGeneratingSuggestion}
                    selectedBlockId={selectedBlockId}
                />
            </CardContent>
            <CardFooter className="px-5 py-4 flex justify-end border-t border-border/30">
                <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive border-destructive/40 hover:bg-destructive/10 hover:border-destructive/60 transition-colors"
                    onClick={onOpenClearDialog}
                >
                    <Trash2 className="mr-1 h-4 w-4" /> Clear Builder
                </Button>
            </CardFooter>
        </Card>
    );
}
