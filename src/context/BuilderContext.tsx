
import React, { createContext, useContext, useState, ReactNode } from "react";
import type { Json } from "@/integrations/supabase/types";
import { toast } from "@/hooks/use-toast";

export interface ArgumentItem {
    id: string;
    type: "premise" | "conclusion" | "evidence" | "objection" | "rebuttal";
    content: string;
    isAiGenerated?: boolean;
}

interface BuilderContextType {
    title: string;
    setTitle: (title: string) => void;
    argumentBlocks: ArgumentItem[];
    setArgumentBlocks: (blocks: ArgumentItem[]) => void;
    currentArgumentId: string | null;
    setCurrentArgumentId: (id: string | null) => void;
    isSaving: boolean;
    setIsSaving: (isSaving: boolean) => void;
    isClearConfirmOpen: boolean;
    setIsClearConfirmOpen: (isOpen: boolean) => void;
    isAddDialogOpen: boolean;
    setIsAddDialogOpen: (isOpen: boolean) => void;
}

const BuilderContext = createContext<BuilderContextType | undefined>(undefined);

export function BuilderProvider({ children }: { children: ReactNode }) {
    const [title, setTitle] = useState("New Argument");
    const [argumentBlocks, setArgumentBlocks] = useState<ArgumentItem[]>([]);
    const [currentArgumentId, setCurrentArgumentId] = useState<string | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [isClearConfirmOpen, setIsClearConfirmOpen] = useState(false);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

    return (
        <BuilderContext.Provider
            value={{
                title,
                setTitle,
                argumentBlocks,
                setArgumentBlocks,
                currentArgumentId,
                setCurrentArgumentId,
                isSaving,
                setIsSaving,
                isClearConfirmOpen,
                setIsClearConfirmOpen,
                isAddDialogOpen,
                setIsAddDialogOpen,
            }}
        >
            {children}
        </BuilderContext.Provider>
    );
}

export function useBuilder() {
    const context = useContext(BuilderContext);

    if (context === undefined) {
        throw new Error("useBuilder must be used within a BuilderProvider");
    }

    return context;
}
