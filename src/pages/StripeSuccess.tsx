
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { verifyStripePurchase, upgradeSubscription } from "@/lib/stripe";
import { useAuth } from "@/components/auth/AuthProvider";
import { toast } from "@/hooks/use-toast";
import { Loader2, CheckCircle2, XCircle, CreditCard, Coins } from "lucide-react";
import { Button } from "@/components/ui/button";
import { subscriptionTiers } from "@/lib/subscription";
import { getUserSubscription } from "@/lib/subscription";

const StripeSuccess = () => {
    const [searchParams] = useSearchParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(true);
    const [isSuccess, setIsSuccess] = useState(false);
    const [subscriptionDetails, setSubscriptionDetails] = useState<{
        basicCredits: number;
        advancedCredits: number;
        tierName: string;
    } | null>(null);

    // Get tier ID from URL parameter
    const tierId = searchParams.get("tier") || "basic";

    // Get tier information
    const tierInfo = subscriptionTiers.find(tier => tier.id === tierId);

    useEffect(() => {
        if (user) {
            // Process the purchase
            setIsProcessing(true);

            // Verify payment with Stripe
            const verifyPayment = async () => {
                try {
                    console.log(`Processing purchase for tier: ${tierId}, user: ${user.id}`);

                    // Verify and process the purchase
                    const success = await verifyStripePurchase(tierId, user.id);
                    setIsSuccess(success);

                    if (success) {
                        // Get updated subscription details to confirm the change
                        const subscription = await getUserSubscription();
                        console.log("Updated subscription details:", subscription);

                        setSubscriptionDetails({
                            basicCredits: subscription.basicCreditsRemaining,
                            advancedCredits: subscription.advancedCreditsRemaining,
                            tierName: subscription.tier
                        });

                        toast({
                            title: "Payment successful",
                            description: `Thank you for subscribing! Your account has been upgraded to the ${tierInfo?.name} plan.`,
                        });
                    } else {
                        toast({
                            title: "Payment verification failed",
                            description: "There was an issue verifying your payment. Please contact support.",
                            variant: "destructive"
                        });
                    }
                } catch (error) {
                    console.error("Error processing purchase:", error);
                    setIsSuccess(false);
                    toast({
                        title: "Payment processing error",
                        description: "There was an error processing your payment. Please contact support.",
                        variant: "destructive"
                    });
                } finally {
                    setIsProcessing(false);
                }
            };

            verifyPayment();
        }
    }, [user, tierId, tierInfo?.name]);

    const handleContinue = () => {
        navigate("/builder");
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1 py-16">
                <div className="container px-4 max-w-3xl mx-auto text-center">
                    {isProcessing ? (
                        <div className="flex flex-col items-center">
                            <Loader2 className="h-16 w-16 text-primary animate-spin mb-6" />
                            <h1 className="text-3xl font-bold mb-4">Processing Your Payment</h1>
                            <p className="text-lg text-muted-foreground">
                                Please wait while we verify your payment and activate your subscription...
                            </p>
                        </div>
                    ) : isSuccess ? (
                        <div>
                            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-100 mb-6">
                                <CheckCircle2 className="w-12 h-12 text-green-600" />
                            </div>
                            <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
                            <p className="text-lg text-muted-foreground mb-8">
                                Thank you for your subscription. Your account has been upgraded to the {tierInfo?.name} plan.
                            </p>

                            {(tierInfo || subscriptionDetails) && (
                                <div className="mb-8 p-6 bg-muted/30 rounded-lg">
                                    <h2 className="text-xl font-semibold mb-4">Your New Benefits</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="bg-background p-4 rounded-md flex flex-col items-center">
                                            <Coins className="h-8 w-8 text-amber-500 mb-2" />
                                            <span className="text-2xl font-bold">
                        {subscriptionDetails?.basicCredits || tierInfo?.basicCredits}
                      </span>
                                            <span className="text-sm text-muted-foreground">Basic Credits</span>
                                        </div>
                                        <div className="bg-background p-4 rounded-md flex flex-col items-center">
                                            <Coins className="h-8 w-8 text-purple-500 mb-2" />
                                            <span className="text-2xl font-bold">
                        {subscriptionDetails?.advancedCredits || tierInfo?.advancedCredits}
                      </span>
                                            <span className="text-sm text-muted-foreground">Advanced Credits</span>
                                        </div>
                                    </div>

                                    {subscriptionDetails && (
                                        <div className="mt-4 p-3 bg-green-50 border border-green-100 rounded-md text-green-700">
                                            <p>Your credits have been successfully added to your account!</p>
                                        </div>
                                    )}
                                </div>
                            )}

                            <Button size="lg" onClick={handleContinue}>
                                Continue to Argumentor
                            </Button>
                        </div>
                    ) : (
                        <div>
                            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-red-100 mb-6">
                                <XCircle className="w-12 h-12 text-red-600" />
                            </div>
                            <h1 className="text-3xl font-bold mb-4">Payment Verification Issue</h1>
                            <p className="text-lg text-muted-foreground mb-8">
                                There was a problem verifying your payment. If you believe this is an error, please contact our support team.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button variant="outline" onClick={() => navigate("/pricing")}>
                                    Return to Pricing
                                </Button>
                                <Button onClick={() => navigate("/contact")}>
                                    Contact Support
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default StripeSuccess;
