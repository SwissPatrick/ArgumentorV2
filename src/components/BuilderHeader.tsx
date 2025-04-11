import { Button } from "@/components/ui/button";
import { CreditsDisplay } from "@/components/CreditsDisplay";
import { Download, Save, Share2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface BuilderHeaderProps {
    title: string;
}

export function BuilderHeader({ title }: BuilderHeaderProps) {
    const navigate = useNavigate();

    const saveArgument = () => {
        // In a real app, save to database here
        toast({
            title: "Argument saved",
            description: "Your argument has been saved successfully",
        });
    };

    const exportArgument = () => {
        // Mock export functionality
        toast({
            title: "Argument exported",
            description: "Your argument has been exported as a JSON file",
        });
    };

    const shareArgument = () => {
        navigator.clipboard.writeText(window.location.href);

        toast({
            title: "Link copied",
            description: "Shareable link has been copied to clipboard",
        });
    };

    const navigateToPricing = () => {
        // Show navigation feedback
        toast({
            title: "Navigating to pricing page",
            description: "Please wait while we redirect you to our pricing options.",
        });

        // Navigate to pricing page with fragment identifier
        navigate('/pricing#pricing-tiers');
    };

    return (
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
            <div>
                <h1 className="font-display text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                    {title || "New Argument"}
                </h1>
                <p className="text-muted-foreground mt-1 text-sm md:text-base">
                    Build and refine your argument structure
                </p>
            </div>

            <div className="flex flex-col md:flex-row gap-3 mt-4 md:mt-0">
                <CreditsDisplay />
                <div className="flex gap-2 mt-2 md:mt-0">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={saveArgument}
                        className="border-primary/30 hover:border-primary/60 transition-colors"
                    >
                        <Save className="mr-1 h-4 w-4" /> Save
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={exportArgument}
                        className="border-primary/30 hover:border-primary/60 transition-colors"
                    >
                        <Download className="mr-1 h-4 w-4" /> Export
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={shareArgument}
                        className="border-primary/30 hover:border-primary/60 transition-colors"
                    >
                        <Share2 className="mr-1 h-4 w-4" /> Share
                    </Button>
                </div>
            </div>
        </div>
    );
}
