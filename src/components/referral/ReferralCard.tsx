
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Share2, Gift, Check, Copy, RefreshCw } from "lucide-react";
import { getUserReferralInfo, ReferralInfo } from "@/lib/referral";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/components/auth/AuthProvider";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function ReferralCard() {
    const [referralInfo, setReferralInfo] = useState<ReferralInfo | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isCopied, setIsCopied] = useState(false);
    const { user } = useAuth();

    const loadReferralInfo = async () => {
        setIsLoading(true);
        try {
            const info = await getUserReferralInfo();
            setReferralInfo(info);
        } catch (error) {
            console.error("Error loading referral info:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            loadReferralInfo();
        } else {
            setIsLoading(false);
        }
    }, [user]);

    const handleCopyCode = () => {
        if (!referralInfo?.code) return;

        navigator.clipboard.writeText(referralInfo.code);
        setIsCopied(true);

        toast({
            title: "Code copied!",
            description: "Referral code has been copied to clipboard",
        });

        setTimeout(() => setIsCopied(false), 2000);
    };

    const handleShareLink = () => {
        if (!referralInfo?.code) return;

        const shareUrl = `${window.location.origin}/auth?referral=${referralInfo.code}`;
        navigator.clipboard.writeText(shareUrl);

        toast({
            title: "Share link copied!",
            description: "Referral link has been copied to clipboard",
        });
    };

    if (isLoading) {
        return (
            <Card className="w-full">
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <Gift className="mr-2 h-5 w-5 text-primary" />
                        <span>Your Referral Code</span>
                    </CardTitle>
                    <CardDescription>Loading your referral information...</CardDescription>
                </CardHeader>
                <CardContent className="animate-pulse">
                    <div className="h-8 bg-muted rounded w-3/4 mb-4"></div>
                    <div className="h-6 bg-muted rounded w-1/2"></div>
                </CardContent>
            </Card>
        );
    }

    if (!user) {
        return (
            <Card className="w-full">
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <Gift className="mr-2 h-5 w-5 text-primary" />
                        <span>Referral Program</span>
                    </CardTitle>
                    <CardDescription>Get free credits by referring friends</CardDescription>
                </CardHeader>
                <CardContent>
                    <Alert className="mb-4">
                        <AlertDescription>
                            Please sign in to access your referral code and earn free credits.
                        </AlertDescription>
                    </Alert>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="flex items-center">
                    <Gift className="mr-2 h-5 w-5 text-primary" />
                    <span>Your Referral Code</span>
                </CardTitle>
                <CardDescription>
                    Share your code and earn free credits when friends sign up
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div>
                        <div className="text-sm text-muted-foreground mb-2">Your unique code:</div>
                        <div className="flex gap-2">
                            <Input
                                value={referralInfo?.code || ""}
                                readOnly
                                className="font-mono uppercase text-center tracking-wider"
                            />
                            <Button
                                size="icon"
                                variant="outline"
                                onClick={handleCopyCode}
                                title="Copy code"
                            >
                                {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            </Button>
                        </div>
                    </div>

                    <div className="bg-muted p-3 rounded text-sm">
                        <p className="font-medium mb-1">How it works:</p>
                        <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                            <li>Share your code with friends who haven't signed up yet</li>
                            <li>When they sign up using your code, you both get credits</li>
                            <li>You'll receive 2 basic credits and 1 advanced credit</li>
                            <li>They'll also receive 2 basic credits and 1 advanced credit</li>
                        </ul>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                        <div className="text-sm">
                            <span className="text-muted-foreground">People referred: </span>
                            <span className="font-medium">{referralInfo?.usedByCount || 0}</span>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 px-2"
                            onClick={loadReferralInfo}
                        >
                            <RefreshCw className="h-3.5 w-3.5 mr-1" />
                            Refresh
                        </Button>
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <Button onClick={handleShareLink} className="w-full">
                    <Share2 className="mr-2 h-4 w-4" /> Share Referral Link
                </Button>
            </CardFooter>
        </Card>
    );
}
