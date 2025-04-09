
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { v4 as uuidv4 } from "@/lib/uuid";

export interface ArgumentItem {
    id: string;
    type: "premise" | "conclusion" | "evidence" | "objection" | "rebuttal";
    content: string;
    isAiGenerated?: boolean;
}

export function useArgumentBlocks(initialBlocks: ArgumentItem[] = []) {
    const [argumentBlocks, setArgumentBlocks] = useState<ArgumentItem[]>(initialBlocks);

    const addBlock = (type: string, content: string) => {
        if (content.trim() === "") {
            toast({
                title: "Error",
                description: "Please enter content for your argument block",
                variant: "destructive",
            });
            return;
        }

        const newBlock: ArgumentItem = {
            id: uuidv4(),
            type: type as ArgumentItem["type"],
            content: content
        };

        setArgumentBlocks([...argumentBlocks, newBlock]);

        toast({
            title: "Block added",
            description: `Added new ${type} to your argument`,
        });
    };

    const updateBlock = (id: string, content: string) => {
        setArgumentBlocks(
            argumentBlocks.map((block) =>
                block.id === id ? { ...block, content } : block
            )
        );
    };

    const deleteBlock = (id: string) => {
        setArgumentBlocks(argumentBlocks.filter((block) => block.id !== id));

        toast({
            title: "Block removed",
            description: "Argument block has been deleted",
        });
    };

    const moveBlockUp = (index: number) => {
        if (index === 0) return;
        const newBlocks = [...argumentBlocks];
        [newBlocks[index - 1], newBlocks[index]] = [newBlocks[index], newBlocks[index - 1]];
        setArgumentBlocks(newBlocks);
    };

    const moveBlockDown = (index: number) => {
        if (index === argumentBlocks.length - 1) return;
        const newBlocks = [...argumentBlocks];
        [newBlocks[index], newBlocks[index + 1]] = [newBlocks[index + 1], newBlocks[index]];
        setArgumentBlocks(newBlocks);
    };

    const clearBlocks = () => {
        setArgumentBlocks([]);
    };

    const addAiSuggestion = (type: string, content: string) => {
        const newBlock: ArgumentItem = {
            id: uuidv4(),
            type: type as ArgumentItem["type"],
            content,
            isAiGenerated: true
        };

        setArgumentBlocks([...argumentBlocks, newBlock]);

        toast({
            title: "Suggestion added",
            description: `Added new ${type} block to your argument`,
        });
    };

    return {
        argumentBlocks,
        setArgumentBlocks,
        addBlock,
        updateBlock,
        deleteBlock,
        moveBlockUp,
        moveBlockDown,
        clearBlocks,
        addAiSuggestion
    };
}
