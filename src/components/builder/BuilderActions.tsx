
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SaveIcon, Plus, FileText, Download } from "lucide-react";
import { Subscription, getUserSubscription } from "@/lib/subscription";
import { AddBlockDialog } from "@/components/builder/AddBlockDialog";
import { TemplatesDialog } from "@/components/builder/TemplatesDialog";
import { useBuilder } from "@/context/BuilderContext";
import { PremiumFeatureDialog } from "@/components/PremiumFeatureDialog";
import { toast } from "@/hooks/use-toast";
import { ArgumentTemplate } from "@/lib/templates";
import { useExportPdf } from "@/hooks/useExportPdf";
import { ArgumentItem } from "@/hooks/useArgumentBlocks";
import { v4 as uuidv4 } from "@/lib/uuid";

interface BuilderActionsProps {
    onSave: () => void;
    isSaving: boolean;
    currentArgumentId: string | null;
    title: string;
    argumentBlocks: ArgumentItem[];
}

export function BuilderActions({
                                   onSave,
                                   isSaving,
                                   currentArgumentId,
                                   title,
                                   argumentBlocks
                               }: BuilderActionsProps) {
    const [subscription, setSubscription] = useState<Subscription | null>(null);
    const [isExporting, setIsExporting] = useState(false);
    const [isPremiumDialogOpen, setIsPremiumDialogOpen] = useState(false);
    const [isTemplatesDialogOpen, setIsTemplatesDialogOpen] = useState(false);
    const { setIsAddDialogOpen, setArgumentBlocks, setTitle } = useBuilder();
    const { exportToPdf } = useExportPdf();

    // Load user subscription when component mounts
    useState(() => {
        const loadSubscription = async () => {
            const userSubscription = await getUserSubscription();
            setSubscription(userSubscription);
        };

        loadSubscription();
    });

    const handleExport = async () => {
        if (!subscription?.features.export) {
            setIsPremiumDialogOpen(true);
            return;
        }

        setIsExporting(true);
        try {
            await exportToPdf(title, argumentBlocks);
            toast({
                title: "Export successful",
                description: "Your argument has been exported as a PDF",
            });
        } catch (error) {
            console.error("Error exporting PDF:", error);
            toast({
                title: "Export failed",
                description: "There was an error exporting your argument to PDF",
                variant: "destructive",
            });
        } finally {
            setIsExporting(false);
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

        // Convert template blocks to ArgumentItem format
        const convertedBlocks: ArgumentItem[] = template.blocks.map(block => ({
            id: uuidv4(),
            type: block.type as ArgumentItem["type"],
            content: block.content
        }));

        // Apply the template
        setTitle(template.title);
        setArgumentBlocks(convertedBlocks);

        toast({
            title: "Template applied",
            description: `"${template.title}" template has been applied successfully.`,
        });
    };

    return (
        <div className="flex space-x-2 mt-2 md:mt-0">
            <Button
                variant="outline"
                size="sm"
                onClick={handleOpenTemplates}
                className="hidden md:flex"
            >
                <FileText className="h-4 w-4 mr-2" />
                Templates
            </Button>

            <Button
                variant="outline"
                size="sm"
                onClick={() => setIsAddDialogOpen(true)}
            >
                <Plus className="h-4 w-4 mr-2" />
                Add Block
            </Button>

            <Button
                variant="outline"
                size="sm"
                onClick={handleExport}
                disabled={isExporting || argumentBlocks.length === 0}
            >
                <Download className="h-4 w-4 mr-2" />
                Export
            </Button>

            <Button
                size="sm"
                onClick={onSave}
                disabled={isSaving || title.trim() === '' || argumentBlocks.length === 0}
            >
                <SaveIcon className="h-4 w-4 mr-2" />
                {currentArgumentId ? 'Update' : 'Save'}
            </Button>

            <PremiumFeatureDialog
                isOpen={isPremiumDialogOpen}
                onClose={() => setIsPremiumDialogOpen(false)}
                featureName="Export to PDF"
                description="Export your arguments to PDF format with our premium plans."
            />

            <TemplatesDialog
                isOpen={isTemplatesDialogOpen}
                onClose={() => setIsTemplatesDialogOpen(false)}
                onSelectTemplate={handleTemplateSelect}
            />
        </div>
    );
}
