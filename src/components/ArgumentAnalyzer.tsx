
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HelpCircle } from "lucide-react";
import { useArgumentAnalysis } from "@/hooks/useArgumentAnalysis";
import { useSuggestionHandler } from "@/hooks/useSuggestionHandler";
import { getUserSubscription, hasAdvancedCredits } from "@/lib/subscription";
import { PremiumFeatureDialog } from "./PremiumFeatureDialog";
import { AnalyzerHeader } from "./analyzer/AnalyzerHeader";
import { AnalysisTab } from "./analyzer/AnalysisTab";
import { OptionsTab } from "./analyzer/OptionsTab";
import { HelpTab } from "./analyzer/HelpTab";
import { useAnalyzerTabs } from "@/hooks/useAnalyzerTabs";
import { toast } from "@/hooks/use-toast";

interface ArgumentAnalyzerProps {
    argumentBlocks: Array<{
        id: string;
        type: string;
        content: string;
    }>;
    onAddSuggestion: (type: string, content: string) => void;
}

export function ArgumentAnalyzer({ argumentBlocks, onAddSuggestion }: ArgumentAnalyzerProps) {
    const [isPremiumDialogOpen, setIsPremiumDialogOpen] = useState(false);
    const [subscription, setSubscription] = useState<Awaited<ReturnType<typeof getUserSubscription>>>(null);
    const [hasCredits, setHasCredits] = useState(false);

    const {
        activeTab,
        setActiveTab,
        isCollapsed,
        toggleCollapse,
        customPrompt,
        setCustomPrompt,
        sanitizeCustomPrompt,
        addAnalysisOption
    } = useAnalyzerTabs();

    const { isAnalyzing, analysis, analyzeArgument, setAnalysis } = useArgumentAnalysis();
    const { handleAddSuggestion } = useSuggestionHandler(onAddSuggestion);

    useEffect(() => {
        loadSubscription();
        checkAdvancedCredits();
    }, []);

    const loadSubscription = async () => {
        try {
            const sub = await getUserSubscription();
            setSubscription(sub);
        } catch (error) {
            console.error("Error loading subscription:", error);
        }
    };

    const checkAdvancedCredits = async () => {
        try {
            const credits = await hasAdvancedCredits();
            setHasCredits(credits);
        } catch (error) {
            console.error("Error checking advanced credits:", error);
            setHasCredits(false);
        }
    };

    // Instead of checking premium tier, check if user has advanced credits
    const canUseAnalysis = hasCredits;

    const handleAnalyze = async () => {
        if (!canUseAnalysis) {
            console.log("Opening premium feature dialog - no advanced credits available");
            setIsPremiumDialogOpen(true);
            return;
        }

        // Validate there are sufficient blocks to analyze
        if (argumentBlocks.length < 2) {
            toast({
                title: "Insufficient argument content",
                description: "Please add at least two argument blocks to perform an analysis.",
                variant: "destructive",
            });
            return;
        }

        // Sanitize the custom prompt before sending
        const sanitizedPrompt = sanitizeCustomPrompt(customPrompt);

        // If sanitization removed all content but there was original content, notify the user
        if (customPrompt && !sanitizedPrompt) {
            return; // Toast was already shown in sanitizeCustomPrompt
        }

        await analyzeArgument(argumentBlocks, sanitizedPrompt);
    };

    return (
        <Card className={`transition-all duration-300 ${isCollapsed ? 'max-h-24 overflow-hidden' : ''}`}>
            <CardHeader className="p-6 pb-0">
                <AnalyzerHeader
                    isPremiumUser={canUseAnalysis}
                    isCollapsed={isCollapsed}
                    toggleCollapse={toggleCollapse}
                />
            </CardHeader>
            <CardContent className="p-0">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <div className="border-t border-b">
                        <TabsList className="w-full justify-start rounded-none border-b bg-transparent px-6">
                            <TabsTrigger
                                value="analysis"
                                className="data-[state=active]:bg-background relative py-2"
                            >
                                Analysis
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-sm data-[state=inactive]:opacity-0" data-state={activeTab === "analysis" ? "active" : "inactive"} />
                            </TabsTrigger>
                            <TabsTrigger
                                value="customization"
                                className="data-[state=active]:bg-background relative py-2"
                            >
                                Options
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-sm data-[state=inactive]:opacity-0" data-state={activeTab === "customization" ? "active" : "inactive"} />
                            </TabsTrigger>
                            <TabsTrigger
                                value="help"
                                className="data-[state=active]:bg-background relative py-2"
                            >
                                <HelpCircle className="h-4 w-4" />
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-sm data-[state=inactive]:opacity-0" data-state={activeTab === "help" ? "active" : "inactive"} />
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    <TabsContent value="analysis" className="px-6 py-4">
                        <AnalysisTab
                            customPrompt={customPrompt}
                            isAnalyzing={isAnalyzing}
                            analysis={analysis}
                            onAnalyze={handleAnalyze}
                            onAddSuggestion={handleAddSuggestion}
                        />
                    </TabsContent>

                    <TabsContent value="customization" className="px-6 py-4">
                        <OptionsTab
                            customPrompt={customPrompt}
                            setCustomPrompt={setCustomPrompt}
                            isPremiumUser={canUseAnalysis}
                            addAnalysisOption={addAnalysisOption}
                        />
                    </TabsContent>

                    <TabsContent value="help" className="px-6 py-4">
                        <HelpTab />
                    </TabsContent>
                </Tabs>

                <PremiumFeatureDialog
                    isOpen={isPremiumDialogOpen}
                    onClose={() => setIsPremiumDialogOpen(false)}
                    featureName="Full Argument Analysis"
                    description="You don't have any advanced credits remaining. Upgrade to get more advanced credits for argument analysis, including fallacy detection, strength scoring, and AI-powered improvement suggestions."
                />
            </CardContent>
        </Card>
    );
}
