
import { Button } from "@/components/ui/button";
import { Download, Save } from "lucide-react";
import { useExportPdf } from "@/hooks/useExportPdf";
import { toast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { getUserSubscription } from "@/lib/subscription";
import { PremiumFeatureDialog } from "@/components/PremiumFeatureDialog";
import { useNavigate } from "react-router-dom";

interface BuilderActionsProps {
    onSave: () => void;
    isSaving: boolean;
    currentArgumentId: string | null;
    title: string;
    argumentBlocks: Array<{
        id: string;
        type: "premise" | "conclusion" | "evidence" | "objection" | "rebuttal";
        content: string;
        isAiGenerated?: boolean;
    }>;
}

export function BuilderActions({
                                   onSave,
                                   isSaving,
                                   currentArgumentId,
                                   title,
                                   argumentBlocks
                               }: BuilderActionsProps) {
    const { exportToPdf, isExporting } = useExportPdf();
    const [isPremiumDialogOpen, setIsPremiumDialogOpen] = useState(false);
    const [subscription, setSubscription] = useState<any>(null);
    const [isSubscriptionLoading, setIsSubscriptionLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        loadSubscription();
    }, []);

    const loadSubscription = async () => {
        setIsSubscriptionLoading(true);
        try {
            const sub = await getUserSubscription();
            setSubscription(sub);
        } catch (error) {
            console.error("Error loading subscription:", error);
        } finally {
            setIsSubscriptionLoading(false);
        }
    };

    const isPremiumUser = subscription?.tier !== 'free';

    const handleExport = () => {
        if (argumentBlocks.length === 0) {
            toast({
                title: "Nothing to export",
                description: "Please add at least one block to your argument",
                variant: "destructive",
            });
            return;
        }

        if (!isPremiumUser) {
            setIsPremiumDialogOpen(true);
            return;
        }

        exportToPdf(title, argumentBlocks);
    };

    return (
        <>
            <div className="flex gap-2 mt-4 md:mt-0">
                <Button
                    onClick={onSave}
                    disabled={isSaving}
                    className="flex items-center gap-2 transition-all hover:shadow-md"
                >
                    <Save className="h-4 w-4" />
                    {isSaving ? "Saving..." : currentArgumentId ? "Update" : "Save"}
                </Button>

                <Button
                    variant="outline"
                    onClick={handleExport}
                    disabled={isExporting || argumentBlocks.length === 0 || isSubscriptionLoading}
                    className="flex items-center gap-2 transition-all hover:shadow-md border-primary/30 hover:border-primary/60"
                >
                    <Download className="h-4 w-4" />
                    {isExporting ? "Exporting..." : "Export PDF"}
                </Button>
            </div>

            <PremiumFeatureDialog
                isOpen={isPremiumDialogOpen}
                onClose={() => setIsPremiumDialogOpen(false)}
                featureName="PDF Export"
                description="Exporting arguments to PDF is available with our premium plans."
            />
        </>
    );
}
