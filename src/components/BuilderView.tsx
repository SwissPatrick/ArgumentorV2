
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, FileText } from "lucide-react";
import { ArgumentBlockList } from "./builder/ArgumentBlockList";
import { ClearBuilderDialog } from "./builder/ClearBuilderDialog";
import { AddBlockDialog } from "./builder/AddBlockDialog";
import { EmptyBuilderState } from "./EmptyBuilderState";
import { TemplatesDialog } from "./builder/TemplatesDialog";
import { useState } from "react";
import { getTemplateById, ArgumentTemplate } from "@/lib/templates";
import { toast } from "@/hooks/use-toast";

interface BuilderViewProps {
    title: string;
    setTitle: (title: string) => void;
    argumentBlocks: any[];
    setArgumentBlocks: (blocks: any[]) => void;
    isClearConfirmOpen: boolean;
    setIsClearConfirmOpen: (isOpen: boolean) => void;
    isAddDialogOpen: boolean;
    setIsAddDialogOpen: (isOpen: boolean) => void;
    onOpenAddDialog: () => void;
}

export function BuilderView({
                                title,
                                setTitle,
                                argumentBlocks,
                                setArgumentBlocks,
                                isClearConfirmOpen,
                                setIsClearConfirmOpen,
                                isAddDialogOpen,
                                setIsAddDialogOpen,
                                onOpenAddDialog,
                            }: BuilderViewProps) {
    const [isTemplatesDialogOpen, setIsTemplatesDialogOpen] = useState(false);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleClearClick = () => {
        if (argumentBlocks.length > 0) {
            setIsClearConfirmOpen(true);
        }
    };

    const handleOpenTemplates = () => {
        setIsTemplatesDialogOpen(true);
    };

    const handleTemplateSelect = (template: ArgumentTemplate) => {
        if (argumentBlocks.length > 0) {
            // Ask for confirmation if there are existing blocks
            if (!confirm("Applying a template will replace your current work. Are you sure you want to continue?")) {
                return;
            }
        }

        // Apply the template
        setTitle(template.title);
        setArgumentBlocks(template.blocks);

        toast({
            title: "Template applied",
            description: `"${template.title}" template has been applied successfully.`,
        });
    };

    return (
        <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4 md:items-center">
                <div className="flex-1">
                    <Input
                        className="text-xl font-semibold h-12 placeholder:text-muted-foreground/50"
                        placeholder="Enter your argument title..."
                        value={title}
                        onChange={handleTitleChange}
                    />
                </div>
                <div className="flex space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        className="text-destructive"
                        onClick={handleClearClick}
                        disabled={argumentBlocks.length === 0}
                    >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Clear
                    </Button>
                </div>
            </div>

            {argumentBlocks.length === 0 ? (
                <EmptyBuilderState onAddBlock={onOpenAddDialog} onUseTemplate={handleOpenTemplates} />
            ) : (
                <ArgumentBlockList
                    argumentBlocks={argumentBlocks}
                    setArgumentBlocks={setArgumentBlocks}
                    onMoveBlockUp={() => {}}
                    onMoveBlockDown={() => {}}
                    onUpdateBlock={() => {}}
                    onDeleteBlock={() => {}}
                    onOpenAddDialog={onOpenAddDialog}
                    onRequestBlockSuggestion={() => {}}
                    isGeneratingSuggestion={false}
                    selectedBlockId={null}
                />
            )}

            {argumentBlocks.length > 0 && (
                <div className="flex justify-center mt-8">
                    <Button
                        variant="outline"
                        onClick={onOpenAddDialog}
                        className="mx-2"
                    >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Block
                    </Button>
                    <Button
                        variant="outline"
                        onClick={handleOpenTemplates}
                        className="mx-2"
                    >
                        <FileText className="h-4 w-4 mr-2" />
                        Use Template
                    </Button>
                </div>
            )}

            <ClearBuilderDialog
                isOpen={isClearConfirmOpen}
                onOpenChange={setIsClearConfirmOpen}
                onClear={() => {
                    setArgumentBlocks([]);
                    setIsClearConfirmOpen(false);
                }}
            />

            <AddBlockDialog
                isOpen={isAddDialogOpen}
                onOpenChange={setIsAddDialogOpen}
                onAddBlock={(type, content) => {
                    setArgumentBlocks([...argumentBlocks, { type, content }]);
                    setIsAddDialogOpen(false);
                }}
            />

            <TemplatesDialog
                isOpen={isTemplatesDialogOpen}
                onClose={() => setIsTemplatesDialogOpen(false)}
                onSelectTemplate={handleTemplateSelect}
            />
        </div>
    );
}
