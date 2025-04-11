
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Gift, Loader2 } from "lucide-react";
import { redeemReferralCode } from "@/lib/referral";
import { useAuth } from "@/components/auth/AuthProvider";
import { toast } from "@/hooks/use-toast";

export function RedeemReferralDialog() {
    const [referralCode, setReferralCode] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [isRedeeming, setIsRedeeming] = useState(false);
    const { user } = useAuth();

    const handleRedeemCode = async () => {
        if (!referralCode.trim()) {
            toast({
                title: "Missing referral code",
                description: "Please enter a referral code",
                variant: "destructive",
            });
            return;
        }

        if (!user) {
            toast({
                title: "Authentication required",
                description: "You must be logged in to redeem a referral code",
                variant: "destructive",
            });
            return;
        }

        setIsRedeeming(true);

        try {
            const success = await redeemReferralCode(referralCode);

            if (success) {
                setReferralCode("");
                setIsOpen(false);
            }
        } finally {
            setIsRedeeming(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1">
                    <Gift className="h-4 w-4" />
                    <span>Redeem Code</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Redeem Referral Code</DialogTitle>
                    <DialogDescription>
                        Enter a friend's referral code to get 2 basic credits and 1 advanced credit
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="referral-code">Referral Code</Label>
                        <Input
                            id="referral-code"
                            placeholder="Enter code (e.g. ABC123XY)"
                            value={referralCode}
                            onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
                            className="uppercase"
                            maxLength={10}
                        />
                    </div>
                    <div className="bg-muted p-3 rounded-md text-sm">
                        <p>You can only redeem one referral code per account. Both you and your friend will receive:</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1 text-muted-foreground">
                            <li>2 basic credits for block-level AI suggestions</li>
                            <li>1 advanced credit for full argument analysis</li>
                        </ul>
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        type="submit"
                        onClick={handleRedeemCode}
                        disabled={isRedeeming || !referralCode.trim()}
                    >
                        {isRedeeming ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Redeeming...
                            </>
                        ) : (
                            "Redeem Code"
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
