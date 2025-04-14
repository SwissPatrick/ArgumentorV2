
import { Coins } from "lucide-react";
import { useEffect, useState } from "react";
import { getUserSubscription } from "@/lib/subscription";
import { useAuth } from "@/components/auth/AuthProvider";
import { toast } from "@/hooks/use-toast";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

export const CreditsDisplay = () => {
    const navigate = useNavigate();
    const { user, isAdmin } = useAuth();
    const [basicCredits, setBasicCredits] = useState<number | null>(null);
    const [advancedCredits, setAdvancedCredits] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (user) {
            loadCredits();
        } else {
            setIsLoading(false);
        }
    }, [user]);

    const loadCredits = async () => {
        setIsLoading(true);
        try {
            const subscription = await getUserSubscription();
            setBasicCredits(subscription.basicCreditsRemaining);
            setAdvancedCredits(subscription.advancedCreditsRemaining);
        } catch (error) {
            console.error("Error loading credits:", error);
            toast({
                title: "Error loading credits",
                description: "Please try refreshing the page",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    if (!user) {
        return (
            <Button
                variant="outline"
                onClick={() => navigate('/auth')}
                className="text-sm h-9"
            >
                Login to view credits
            </Button>
        );
    }

    if (isLoading) {
        return (
            <div className="flex items-center bg-muted/30 px-4 py-2 rounded-md animate-pulse">
                <Coins className="h-5 w-5 mr-2.5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Loading...</span>
            </div>
        );
    }

    if (isAdmin) {
        return (
            <div className="flex items-center bg-gradient-to-r from-purple-50 to-purple-100 px-4 py-2 rounded-md border border-purple-200">
                <Coins className="h-5 w-5 mr-2.5 text-purple-600" />
                <span className="text-sm font-semibold text-purple-800">Unlimited Credits</span>
            </div>
        );
    }

    return (
        <div className="flex items-center bg-muted/30 px-4 py-2 rounded-md">
            <div className="flex items-center mr-4">
                <Coins className="h-5 w-5 mr-2 text-amber-500" />
                <span className="text-sm font-semibold">{basicCredits || 0}</span>
                <span className="text-xs text-muted-foreground ml-1.5">basic</span>
            </div>
            <div className="flex items-center">
                <Coins className="h-5 w-5 mr-2 text-purple-500" />
                <span className="text-sm font-semibold">{advancedCredits || 0}</span>
                <span className="text-xs text-muted-foreground ml-1.5">adv</span>
            </div>
        </div>
    );
};
