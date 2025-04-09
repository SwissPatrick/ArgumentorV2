
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PremiumFeatureDialogProps {
    isOpen: boolean;
    onClose: () => void;
    featureName: string;
    description?: string;
}

export function PremiumFeatureDialog({ isOpen, onClose, featureName, description }: PremiumFeatureDialogProps) {
    const navigate = useNavigate();

    const handleUpgrade = () => {
        navigate('/pricing');
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-yellow-500" />
                        <span>Premium Feature: {featureName}</span>
                    </DialogTitle>
                    <DialogDescription>
                        {description || `Access to the ${featureName} feature is available with our premium plans.`}
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    <div className="rounded-lg bg-muted p-4 mb-4">
                        <h4 className="font-medium mb-2">Benefits of upgrading:</h4>
                        <ul className="space-y-1 pl-5 list-disc text-sm text-muted-foreground">
                            <li>Full argument analysis and strength scoring</li>
                            <li>Logical fallacy detection</li>
                            <li>Advanced AI recommendations</li>
                            <li>Unlimited argument saving</li>
                            <li>Export in multiple formats</li>
                        </ul>
                    </div>
                    <p className="text-center text-sm text-muted-foreground">
                        You can continue using block-level AI suggestions with your free account.
                    </p>
                </div>
                <DialogFooter className="flex flex-col sm:flex-row gap-2">
                    <Button variant="outline" onClick={onClose} className="sm:w-auto w-full">
                        Continue with Free
                    </Button>
                    <Button onClick={handleUpgrade} className="sm:w-auto w-full">
                        Upgrade Now
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
