
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { subscriptionTiers, type SubscriptionTier } from "@/lib/subscription";
import { toast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/components/auth/AuthProvider";
import { redirectToStripeCheckout, verifyStripePurchase } from "@/lib/stripe";

export const PricingTiers = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedTier, setSelectedTier] = useState<SubscriptionTier | null>(null);
    const { user } = useAuth();

    // Check for redirect from auth with tier parameter
    useEffect(() => {
        // Check if we just came back from auth page with a tier to purchase
        const params = new URLSearchParams(location.search);
        const tierToSubscribe = params.get('subscribe');

        if (user && tierToSubscribe) {
            // User is logged in and has a tier to subscribe to from auth redirection
            const tier = subscriptionTiers.find(t => t.id === tierToSubscribe);
            if (tier) {
                handleSelectTier(tier);

                // Clean up URL to avoid double-processing
                navigate(location.pathname, { replace: true });
            }
        }
    }, [user, location.search]);

    const handleSelectTier = (tier: SubscriptionTier) => {
        setSelectedTier(tier);

        // Check if user is logged in
        if (!user) {
            // Redirect to auth page with return URL AND tier ID
            const redirectParams = new URLSearchParams();
            redirectParams.set('redirectTo', '/pricing');
            redirectParams.set('subscribe', tier.id);

            navigate(`/auth?${redirectParams.toString()}`);
            return;
        }

        if (tier.price === 0) {
            // Free tier - apply immediately
            verifyStripePurchase(tier.id, user.id)
                .then((success) => {
                    if (success) {
                        toast({
                            title: "Subscription updated",
                            description: `You're now on the ${tier.name} plan.`,
                        });
                        navigate('/builder');
                    }
                });
            return;
        }

        // For paid tiers, use redirectToStripeCheckout
        if (tier.id === "basic" || tier.id === "premium") {
            redirectToStripeCheckout(tier.id, user.id);
            return;
        }

        setIsDialogOpen(true);
    };

    const handleSubscribe = () => {
        if (!selectedTier || !user) return;

        // Close dialog
        setIsDialogOpen(false);

        // Show processing toast
        toast({
            title: "Redirecting to Stripe checkout",
            description: "You'll be redirected to our secure payment page...",
        });

        // Redirect to Stripe checkout
        redirectToStripeCheckout(selectedTier.id, user.id);
    };

    return (
        <div className="py-12 bg-background">
            <div className="container px-4 mx-auto">
                <div className="mb-10">
                    <h2 className="text-3xl font-bold">Choose Your Plan</h2>
                    <p className="text-muted-foreground mt-2">
                        Select the perfect plan to elevate your argumentation skills
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {subscriptionTiers.map((tier) => (
                        <Card key={tier.id} className={`flex flex-col ${tier.recommended ? "border-primary shadow-md" : ""}`}>
                            {tier.recommended && (
                                <div className="bg-primary text-primary-foreground text-center py-1 text-sm font-medium">
                                    RECOMMENDED
                                </div>
                            )}
                            <CardHeader>
                                <CardTitle>{tier.name}</CardTitle>
                                <CardDescription>
                                    <div className="flex items-baseline mt-2">
                                        <span className="text-3xl font-bold">${tier.price}</span>
                                        {tier.price > 0 && <span className="ml-1 text-muted-foreground">/month</span>}
                                    </div>
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <div className="mb-4">
                                    <div className="font-medium text-sm text-muted-foreground">Credits per month:</div>
                                    <div className="flex flex-col gap-1 mt-2">
                                        <div className="flex items-center justify-between px-3 py-1.5 bg-primary/10 rounded-md">
                                            <span className="text-sm font-medium">Basic credits:</span>
                                            <span className="font-semibold">{tier.basicCredits}</span>
                                        </div>
                                        <div className="flex items-center justify-between px-3 py-1.5 bg-primary/10 rounded-md">
                                            <span className="text-sm font-medium">Advanced credits:</span>
                                            <span className="font-semibold">{tier.advancedCredits}</span>
                                        </div>
                                    </div>
                                </div>
                                <ul className="space-y-2">
                                    {tier.features.map((feature, i) => (
                                        <li key={i} className="flex items-start">
                                            <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                            <CardFooter>
                                <Button
                                    className="w-full"
                                    variant={tier.recommended ? "default" : "outline"}
                                    onClick={() => handleSelectTier(tier)}
                                >
                                    {tier.price === 0 ? "Get Started" : "Subscribe"}
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Subscribe to {selectedTier?.name}</DialogTitle>
                        <DialogDescription>
                            You're about to subscribe to the {selectedTier?.name} plan for ${selectedTier?.price}/month.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                        <div className="grid gap-3 mb-4">
                            <div className="flex items-center justify-between p-3 bg-muted/60 rounded-md">
                                <span className="font-medium">Basic Credits:</span>
                                <span className="font-semibold">{selectedTier?.basicCredits} per month</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-muted/60 rounded-md">
                                <span className="font-medium">Advanced Credits:</span>
                                <span className="font-semibold">{selectedTier?.advancedCredits} per month</span>
                            </div>
                        </div>
                        <p>This will give you access to:</p>
                        <ul className="list-disc pl-5 mt-2">
                            {selectedTier?.features.map((feature, i) => (
                                <li key={i}>{feature}</li>
                            ))}
                        </ul>
                        <p className="mt-4 text-sm text-muted-foreground">
                            You will be redirected to our secure checkout to complete your subscription.
                        </p>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                        <Button onClick={handleSubscribe}>Proceed to Checkout</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};
