
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PricingTiers } from "@/components/PricingTiers";
import { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/components/auth/AuthProvider";

const Pricing = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, userIsEmailVerified } = useAuth();
    const pricingRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // If already logged in with email verified, redirect to builder
        // But don't redirect if we're here to see pricing tiers (from the hash)
        if (user && userIsEmailVerified && !location.hash) {
            navigate('/builder');
        }

        // If there's a pricing-tiers hash, scroll to it
        if (location.hash === '#pricing-tiers' && pricingRef.current) {
            // Using setTimeout to ensure the DOM is fully loaded
            setTimeout(() => {
                pricingRef.current?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    }, [user, userIsEmailVerified, navigate, location.hash]);

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">
                <div className="py-12 bg-background">
                    <div className="container px-4">
                        <div className="max-w-3xl mx-auto text-center mb-12">
                            <h1 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Plan</h1>
                            <p className="text-lg text-muted-foreground">
                                Get started with Argumentor today and take your critical thinking to the next level.
                            </p>
                            <div className="mt-6 p-4 bg-muted/50 rounded-lg max-w-xl mx-auto">
                                <h3 className="text-lg font-medium mb-2">About Our Credits System</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                    <div className="bg-background p-3 rounded-md">
                                        <div className="font-semibold mb-1 flex items-center">
                                            <span className="inline-block w-3 h-3 bg-amber-400 rounded-full mr-2"></span>
                                            Basic Credits
                                        </div>
                                        <p className="text-muted-foreground">Used for block-level AI suggestions and improvements to individual argument components.</p>
                                    </div>
                                    <div className="bg-background p-3 rounded-md">
                                        <div className="font-semibold mb-1 flex items-center">
                                            <span className="inline-block w-3 h-3 bg-purple-400 rounded-full mr-2"></span>
                                            Advanced Credits
                                        </div>
                                        <p className="text-muted-foreground">Used for full argument analysis, including strength scoring and comprehensive feedback.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div ref={pricingRef}>
                    <PricingTiers />
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Pricing;
