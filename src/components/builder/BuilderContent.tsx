
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
    setArgumentBlocks: (blocks: ArgumentItem[]) => void;
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
                                   setArgumentBlocks,
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
        <Card className="border bg-card/50 backdrop-blur-sm shadow-sm transition-all hover:shadow">
            <CardHeader className="pb-2 border-b border-border/40">
                <BuilderCardHeader
                    onOpenClearDialog={onOpenClearDialog}
                    onOpenSuggestionDialog={onOpenSuggestionDialog}
                    onAnalyzeArgument={onAnalyzeArgument}
                />
            </CardHeader>
            <CardContent className="p-4">
                <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="text-lg font-medium mb-4 border-border/50 bg-background/50 focus:bg-background transition-colors"
                    placeholder="Enter argument title..."
                />

                <ArgumentBlockList
                    argumentBlocks={argumentBlocks}
                    setArgumentBlocks={setArgumentBlocks}
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
            <CardFooter className="px-4 py-3 flex justify-end border-t border-border/30">
                <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive border-destructive/30 hover:bg-destructive/10 hover:border-destructive/50 transition-colors h-8"
                    onClick={onOpenClearDialog}
                >
                    <Trash2 className="mr-1 h-3.5 w-3.5" /> Clear Builder
                </Button>
            </CardFooter>
        </Card>
    );
}
