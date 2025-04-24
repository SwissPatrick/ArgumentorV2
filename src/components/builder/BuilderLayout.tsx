
import { BuilderHeader } from "@/components/BuilderHeader";
import { BuilderActions } from "@/components/builder/BuilderActions";
import { BuilderView } from "@/components/BuilderView";
import { useBuilder } from "@/context/BuilderContext";
import { useArgumentSaving } from "@/hooks/useArgumentSaving";
import { useEffect } from "react";

export function BuilderLayout() {
    const {
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
        setIsAddDialogOpen
    } = useBuilder();

    const { saveArgument } = useArgumentSaving({
        title,
        argumentBlocks,
        currentArgumentId,
        setCurrentArgumentId,
        setTitle,
        setArgumentBlocks,
        setIsSaving
    });

    const handleOpenAddDialog = () => {
        setIsAddDialogOpen(true);
    };

    return (
        <div className="container px-4 max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 bg-card/50 backdrop-blur-sm p-4 md:p-5 rounded-lg shadow-sm border border-border/30">
                <BuilderHeader title={title} />
                <BuilderActions
                    onSave={saveArgument}
                    isSaving={isSaving}
                    currentArgumentId={currentArgumentId}
                    title={title}
                    argumentBlocks={argumentBlocks}
                />
            </div>

            <BuilderView
                title={title}
                setTitle={setTitle}
                argumentBlocks={argumentBlocks}
                setArgumentBlocks={setArgumentBlocks}
                isClearConfirmOpen={isClearConfirmOpen}
                setIsClearConfirmOpen={setIsClearConfirmOpen}
                isAddDialogOpen={isAddDialogOpen}
                setIsAddDialogOpen={setIsAddDialogOpen}
                onOpenAddDialog={handleOpenAddDialog}
            />
        </div>
    );
}
