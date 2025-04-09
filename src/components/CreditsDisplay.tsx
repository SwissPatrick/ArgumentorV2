
import { getUserSubscription } from "@/lib/subscription";
import { Coins, AlertCircle, Crown, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { toast } from "@/hooks/use-toast";
import { Separator } from "./ui/separator";

export const CreditsDisplay = () => {
    const navigate = useNavigate();
    const { user, isAdmin } = useAuth();
    const [basicCredits, setBasicCredits] = useState<number | null>(null);
    const [advancedCredits, setAdvancedCredits] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [refreshKey, setRefreshKey] = useState(0); // Used to trigger refresh

    useEffect(() => {
        if (user) {
            loadCredits();
        } else {
            setIsLoading(false);
        }
    }, [user, refreshKey]);

    const loadCredits = async () => {
        setIsLoading(true);
        try {
            console.log("Fetching user subscription data from Supabase...");
            const subscription = await getUserSubscription();
            console.log("User subscription data:", subscription);
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

    const handleRefresh = () => {
        setRefreshKey(prev => prev + 1); // Trigger a refresh
    };

    if (!user) {
        return (
            <div className="flex items-center gap-2">
                <div className="flex items-center text-sm bg-amber-100 text-amber-800 px-3 py-1.5 rounded-md">
                    <AlertCircle className="h-4 w-4 mr-1.5" />
                    <span>Login required</span>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="ml-2 text-xs h-6 py-0"
                        onClick={() => navigate('/auth')}
                    >
                        Login
                    </Button>
                </div>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="flex items-center text-sm bg-muted/40 px-3 py-1.5 rounded-md animate-pulse">
                <Coins className="h-4 w-4 mr-1.5 text-amber-400 opacity-50" />
                <span>Loading credits...</span>
            </div>
        );
    }

    // Special display for admin users
    if (isAdmin) {
        return (
            <div className="flex items-center gap-2">
                <div className="flex items-center text-sm bg-gradient-to-r from-amber-50 to-purple-50 px-3 py-1.5 rounded-md border border-amber-200">
                    <Crown className="h-4 w-4 mr-1.5 text-amber-500" />
                    <span className="font-medium text-amber-800">Admin</span>
                    <div className="mx-2 h-3 w-px bg-amber-200"></div>
                    <Coins className="h-4 w-4 mr-1 text-purple-500" />
                    <span className="font-medium text-purple-700">Unlimited</span>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-2">
            <div className="flex items-center text-sm bg-muted/40 px-3 py-1.5 rounded-md">
                <div className="flex items-center">
                    <Coins className="h-4 w-4 mr-1 text-amber-400" />
                    <span>{basicCredits}</span>
                    <span className="text-xs text-muted-foreground ml-1">basic</span>
                </div>
                <div className="mx-2 h-3 w-px bg-border/50"></div>
                <div className="flex items-center">
                    <Coins className="h-4 w-4 mr-1 text-purple-400" />
                    <span>{advancedCredits}</span>
                    <span className="text-xs text-muted-foreground ml-1">adv</span>
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-5 w-5 ml-2 -mr-1"
                    onClick={handleRefresh}
                    title="Refresh credits"
                >
                    <RefreshCw className="h-3 w-3" />
                </Button>
            </div>
        </div>
    );
};
