
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Sparkles } from "lucide-react";
import { ArgumentBlock } from "@/components/ArgumentBlock";
import { EmptyBuilderState } from "@/components/EmptyBuilderState";

interface ArgumentItem {
    id: string;
    type: "premise" | "conclusion" | "evidence" | "objection" | "rebuttal";
    content: string;
    isAiGenerated?: boolean;
}

interface ArgumentBlockListProps {
    argumentBlocks: ArgumentItem[];
    onMoveBlockUp: (index: number) => void;
    onMoveBlockDown: (index: number) => void;
    onUpdateBlock: (id: string, content: string) => void;
    onDeleteBlock: (id: string) => void;
    onOpenAddDialog: () => void;
    onRequestBlockSuggestion: (blockId: string) => void;
    isGeneratingSuggestion: boolean;
    selectedBlockId: string | null;
}

export function ArgumentBlockList({
                                      argumentBlocks,
                                      onMoveBlockUp,
                                      onMoveBlockDown,
                                      onUpdateBlock,
                                      onDeleteBlock,
                                      onOpenAddDialog,
                                      onRequestBlockSuggestion,
                                      isGeneratingSuggestion,
                                      selectedBlockId
                                  }: ArgumentBlockListProps) {
    const handleEmptyStateAddBlock = () => {
        console.log("Empty state add block button clicked");
        onOpenAddDialog();
    };

    const addButtonText = argumentBlocks.length > 0 ? "Add Another Block" : "Add Your First Block";

    return (
        <div>
            {argumentBlocks.length === 0 ? (
                <EmptyBuilderState onStartNew={handleEmptyStateAddBlock} />
            ) : (
                <div className="space-y-4">
                    {argumentBlocks.map((block, index) => (
                        <ArgumentBlock
                            key={block.id}
                            id={block.id}
                            type={block.type}
                            content={block.content}
                            onUpdate={onUpdateBlock}
                            onDelete={onDeleteBlock}
                            onMoveUp={() => onMoveBlockUp(index)}
                            onMoveDown={() => onMoveBlockDown(index)}
                            canMoveUp={index !== 0}
                            canMoveDown={index !== argumentBlocks.length - 1}
                            onRequestSuggestion={() => onRequestBlockSuggestion(block.id)}
                            isProcessing={isGeneratingSuggestion && selectedBlockId === block.id}
                            isAiGenerated={block.isAiGenerated}
                        />
                    ))}

                    <Button
                        className="w-full mt-6 group hover:bg-primary/90 transition-all shadow-sm hover:shadow-md py-5"
                        onClick={onOpenAddDialog}
                    >
                        <Plus className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                        {addButtonText}
                    </Button>
                </div>
            )}
        </div>
    );
}
