
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, FileText } from "lucide-react";
import { getAllTemplates, getFreeTemplates, getPremiumTemplates, ArgumentTemplate } from "@/lib/templates";
import { Badge } from "@/components/ui/badge";
import { getUserSubscription, Subscription } from "@/lib/subscription";
import { useAuth } from "@/components/auth/AuthProvider";
import { PremiumFeatureDialog } from "@/components/PremiumFeatureDialog";

interface TemplatesDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onSelectTemplate: (template: ArgumentTemplate) => void;
}

export function TemplatesDialog({ isOpen, onClose, onSelectTemplate }: TemplatesDialogProps) {
    const [activeTab, setActiveTab] = useState<string>("all");
    const [subscription, setSubscription] = useState<Subscription | null>(null);
    const [isPremiumDialogOpen, setIsPremiumDialogOpen] = useState(false);
    const [selectedTemplateForUpgrade, setSelectedTemplateForUpgrade] = useState<ArgumentTemplate | null>(null);
    const { user } = useAuth();

    // Load user subscription when dialog opens
    useState(() => {
        const loadSubscription = async () => {
            if (user) {
                const userSubscription = await getUserSubscription();
                setSubscription(userSubscription);
            }
        };

        if (isOpen) {
            loadSubscription();
        }
    });

    const allTemplates = getAllTemplates();
    const freeTemplates = getFreeTemplates();
    const premiumTemplates = getPremiumTemplates();

    const hasPremiumAccess = subscription?.tier === "premium" || subscription?.tier === "enterprise";

    const handleTemplateSelect = (template: ArgumentTemplate) => {
        if (template.isPremium && !hasPremiumAccess) {
            // Show premium upgrade dialog
            setSelectedTemplateForUpgrade(template);
            setIsPremiumDialogOpen(true);
        } else {
            // Allow template usage
            onSelectTemplate(template);
            onClose();
        }
    };

    const handlePremiumDialogClose = () => {
        setIsPremiumDialogOpen(false);
        setSelectedTemplateForUpgrade(null);
    };

    return (
        <>
            <Dialog open={isOpen} onOpenChange={onClose}>
                <DialogContent className="max-w-4xl">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <FileText className="h-5 w-5" />
                            Argument Templates
                        </DialogTitle>
                        <DialogDescription>
                            Choose a template to jumpstart your argument with predefined structure
                        </DialogDescription>
                    </DialogHeader>

                    <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="all">All Templates</TabsTrigger>
                            <TabsTrigger value="free">Free Templates</TabsTrigger>
                            <TabsTrigger value="premium">Premium Templates</TabsTrigger>
                        </TabsList>

                        <TabsContent value="all" className="pt-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {allTemplates.map((template) => (
                                    <TemplateCard
                                        key={template.id}
                                        template={template}
                                        isPremium={template.isPremium}
                                        hasAccess={!template.isPremium || hasPremiumAccess}
                                        onSelect={handleTemplateSelect}
                                    />
                                ))}
                            </div>
                        </TabsContent>

                        <TabsContent value="free" className="pt-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {freeTemplates.map((template) => (
                                    <TemplateCard
                                        key={template.id}
                                        template={template}
                                        isPremium={false}
                                        hasAccess={true}
                                        onSelect={handleTemplateSelect}
                                    />
                                ))}
                            </div>
                        </TabsContent>

                        <TabsContent value="premium" className="pt-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {premiumTemplates.map((template) => (
                                    <TemplateCard
                                        key={template.id}
                                        template={template}
                                        isPremium={true}
                                        hasAccess={hasPremiumAccess}
                                        onSelect={handleTemplateSelect}
                                    />
                                ))}
                            </div>
                        </TabsContent>
                    </Tabs>
                </DialogContent>
            </Dialog>

            {selectedTemplateForUpgrade && (
                <PremiumFeatureDialog
                    isOpen={isPremiumDialogOpen}
                    onClose={handlePremiumDialogClose}
                    featureName="Premium Templates"
                    description={`"${selectedTemplateForUpgrade.title}" is a premium template available with our Premium subscription plan.`}
                />
            )}
        </>
    );
}

interface TemplateCardProps {
    template: ArgumentTemplate;
    isPremium: boolean;
    hasAccess: boolean;
    onSelect: (template: ArgumentTemplate) => void;
}

function TemplateCard({ template, isPremium, hasAccess, onSelect }: TemplateCardProps) {
    return (
        <Card className={`${isPremium && hasAccess ? 'border-primary shadow-sm' : ''}`}>
            <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{template.title}</CardTitle>
                    {isPremium && (
                        <Badge variant={hasAccess ? "default" : "outline"} className={`${!hasAccess ? "bg-amber-50 text-amber-700 border-amber-200" : ""}`}>
                            {!hasAccess && <Lock className="h-3 w-3 mr-1" />}
                            Premium
                        </Badge>
                    )}
                </div>
                <CardDescription>{template.description}</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
                <div className="text-sm text-muted-foreground">
                    <span className="font-medium">Structure:</span> {template.blocks.length} blocks
                </div>
            </CardContent>
            <CardFooter>
                <Button
                    onClick={() => onSelect(template)}
                    variant={isPremium && hasAccess ? "default" : "outline"}
                    className="w-full"
                >
                    {isPremium && !hasAccess ? "Upgrade to Use" : "Use Template"}
                </Button>
            </CardFooter>
        </Card>
    );
}
