
import { useState, useEffect } from "react";
import { useArgumentBlocks } from "@/hooks/useArgumentBlocks";
import { useAiSuggestions } from "@/hooks/useAiSuggestions";
import { getUserSubscription, hasAdvancedCredits } from "@/lib/subscription";
import { BuilderContent } from "@/components/builder/BuilderContent";
import { ApiErrorDisplay } from "@/components/builder/ApiErrorDisplay";
import { ClearBuilderDialog } from "./builder/ClearBuilderDialog";
import { AddBlockDialog } from "./builder/AddBlockDialog";
import { AISuggestionDialog } from "./builder/AISuggestionDialog";
import { PremiumFeatureDialog } from "./PremiumFeatureDialog";
import { useArgumentAnalysis } from "@/hooks/useArgumentAnalysis";
import { BuilderSidebar } from "./BuilderSidebar";

interface BuilderViewProps {
    title: string;
    setTitle: (title: string) => void;
    argumentBlocks: Array<{
        id: string;
        type: "premise" | "conclusion" | "evidence" | "objection" | "rebuttal";
        content: string;
        isAiGenerated?: boolean;
    }>;
    setArgumentBlocks: (blocks: Array<{
        id: string;
        type: "premise" | "conclusion" | "evidence" | "objection" | "rebuttal";
        content: string;
        isAiGenerated?: boolean;
    }>) => void;
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
                                onOpenAddDialog
                            }: BuilderViewProps) {
    const [isSuggestionDialogOpen, setIsSuggestionDialogOpen] = useState(false);
    const [isPremiumDialogOpen, setIsPremiumDialogOpen] = useState(false);
    const [subscription, setSubscription] = useState<Awaited<ReturnType<typeof getUserSubscription>>>(null);
    const [isSubscriptionLoading, setIsSubscriptionLoading] = useState(true);
    const [savedSuggestions, setSavedSuggestions] = useState<Array<{
        id: string;
        type: string;
        content: string;
        isImplemented: boolean;
    }>>([]);

    const blockOperations = useArgumentBlocks(argumentBlocks);
    const { analysis, setAnalysis } = useArgumentAnalysis();

    useEffect(() => {
        blockOperations.setArgumentBlocks(argumentBlocks);
    }, [argumentBlocks]);

    useEffect(() => {
        setArgumentBlocks(blockOperations.argumentBlocks);
    }, [blockOperations.argumentBlocks, setArgumentBlocks]);

    const aiSuggestions = useAiSuggestions(
        blockOperations.argumentBlocks,
        blockOperations.addAiSuggestion,
        blockOperations.updateBlock
    );

    useEffect(() => {
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

        loadSubscription();
    }, []);

    const clearBuilder = () => {
        blockOperations.clearBlocks();
        setTitle("");
        setIsClearConfirmOpen(false);
        setAnalysis(null);
        setSavedSuggestions([]);
    };

    const openFullAnalysis = async () => {
        const hasCredits = await hasAdvancedCredits();
        if (!hasCredits) {
            setIsPremiumDialogOpen(true);
            return;
        }
    };

    const addSuggestionToList = (type: string, content: string) => {
        const newSuggestion = {
            id: Date.now().toString(),
            type,
            content,
            isImplemented: false
        };

        setSavedSuggestions(prev => [...prev, newSuggestion]);
    };

    const implementSuggestion = (id: string) => {
        const suggestion = savedSuggestions.find(s => s.id === id);
        if (!suggestion) return;

        blockOperations.addAiSuggestion(suggestion.type, suggestion.content);

        setSavedSuggestions(prev =>
            prev.map(s => s.id === id ? { ...s, isImplemented: true } : s)
        );
    };

    if (aiSuggestions.apiError) {
        return (
            <div className="lg:col-span-3">
                <ApiErrorDisplay error={aiSuggestions.apiError} />
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-6">
            <div className="lg:col-span-3 space-y-4">
                <BuilderContent
                    title={title}
                    setTitle={setTitle}
                    argumentBlocks={blockOperations.argumentBlocks}
                    onMoveBlockUp={blockOperations.moveBlockUp}
                    onMoveBlockDown={blockOperations.moveBlockDown}
                    onUpdateBlock={blockOperations.updateBlock}
                    onDeleteBlock={blockOperations.deleteBlock}
                    onOpenAddDialog={onOpenAddDialog}
                    onOpenClearDialog={() => setIsClearConfirmOpen(true)}
                    onOpenSuggestionDialog={() => setIsSuggestionDialogOpen(true)}
                    onAnalyzeArgument={openFullAnalysis}
                    onRequestBlockSuggestion={aiSuggestions.requestBlockLevelSuggestion}
                    isGeneratingSuggestion={aiSuggestions.isGeneratingSuggestion}
                    selectedBlockId={aiSuggestions.selectedBlockId}
                    onAddSuggestion={addSuggestionToList}
                />

                <ClearBuilderDialog
                    isOpen={isClearConfirmOpen}
                    onOpenChange={setIsClearConfirmOpen}
                    onClear={clearBuilder}
                />

                <AddBlockDialog
                    isOpen={isAddDialogOpen}
                    onOpenChange={setIsAddDialogOpen}
                    onAddBlock={blockOperations.addBlock}
                />

                <AISuggestionDialog
                    isOpen={isSuggestionDialogOpen}
                    onOpenChange={setIsSuggestionDialogOpen}
                    onRequestSuggestion={aiSuggestions.requestAISuggestion}
                    isGeneratingSuggestion={aiSuggestions.isGeneratingSuggestion}
                />

                <PremiumFeatureDialog
                    isOpen={isPremiumDialogOpen}
                    onClose={() => setIsPremiumDialogOpen(false)}
                    featureName="Full Argument Analysis"
                    description="You don't have any advanced credits remaining. Upgrade to get more advanced credits for argument analysis, including fallacy detection, strength scoring, and AI-powered improvement suggestions."
                />
            </div>

            <BuilderSidebar
                savedSuggestions={savedSuggestions}
                onImplementSuggestion={implementSuggestion}
            />
        </div>
    );
}
