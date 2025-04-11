
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ReferralCard } from "@/components/referral/ReferralCard";
import { RedeemReferralDialog } from "@/components/referral/RedeemReferralDialog";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/auth/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getUserSubscription } from "@/lib/subscription";
import { useState } from "react";
import { ArrowLeft, Loader2 } from "lucide-react";

const Account = () => {
    const { user, loading, userIsEmailVerified } = useAuth();
    const navigate = useNavigate();
    const [subscription, setSubscription] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Redirect if not logged in or email not verified
        if (!loading && (!user || !userIsEmailVerified)) {
            navigate('/auth', { replace: true });
        }
    }, [user, loading, userIsEmailVerified, navigate]);

    useEffect(() => {
        const loadSubscription = async () => {
            if (user) {
                try {
                    const sub = await getUserSubscription();
                    setSubscription(sub);
                } catch (error) {
                    console.error('Error loading subscription:', error);
                } finally {
                    setIsLoading(false);
                }
            }
        };

        loadSubscription();
    }, [user]);

    if (loading || isLoading) {
        return (
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-1 container px-4 py-12 max-w-5xl mx-auto">
                    <div className="flex justify-center items-center h-64">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    if (!user) {
        return null; // Redirect is handled by useEffect, but we need to return something
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1 container px-4 py-12 max-w-5xl mx-auto">
                <div className="mb-8">
                    <Button
                        variant="ghost"
                        onClick={() => navigate(-1)}
                        className="mb-4"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back
                    </Button>
                    <h1 className="text-3xl font-bold">Account Settings</h1>
                    <p className="text-muted-foreground mt-1">
                        Manage your account and subscription
                    </p>
                </div>

                <Tabs defaultValue="profile" className="w-full">
                    <TabsList className="mb-6">
                        <TabsTrigger value="profile">Profile</TabsTrigger>
                        <TabsTrigger value="referrals">Referrals</TabsTrigger>
                        <TabsTrigger value="subscription">Subscription</TabsTrigger>
                    </TabsList>

                    <TabsContent value="profile">
                        <Card>
                            <CardHeader>
                                <CardTitle>Your Profile</CardTitle>
                                <CardDescription>
                                    View and update your personal information
                                </CardDescription>
                            </CardHeader>
                            <div className="p-6">
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-lg font-medium">Profile Information</h3>
                                        <Separator className="my-3" />
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-sm text-muted-foreground">Email</p>
                                                <p className="font-medium">{user.email}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-muted-foreground">Account Created</p>
                                                <p className="font-medium">
                                                    {user.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </TabsContent>

                    <TabsContent value="referrals">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="md:col-span-2">
                                <ReferralCard />
                            </div>
                            <div className="space-y-5">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-lg">Redeem a Code</CardTitle>
                                        <CardDescription>
                                            Got a referral code? Redeem it to get free credits
                                        </CardDescription>
                                    </CardHeader>
                                    <div className="p-6 pt-0 flex justify-center">
                                        <RedeemReferralDialog />
                                    </div>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-lg">Rewards</CardTitle>
                                        <CardDescription>
                                            How the referral program works
                                        </CardDescription>
                                    </CardHeader>
                                    <div className="p-6 pt-0">
                                        <ul className="space-y-3 text-sm">
                                            <li className="flex gap-2">
                                                <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center">
                                                    <span className="text-green-600 text-xs">1</span>
                                                </div>
                                                <span>Share your unique referral code with friends</span>
                                            </li>
                                            <li className="flex gap-2">
                                                <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center">
                                                    <span className="text-green-600 text-xs">2</span>
                                                </div>
                                                <span>They sign up using your code</span>
                                            </li>
                                            <li className="flex gap-2">
                                                <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center">
                                                    <span className="text-green-600 text-xs">3</span>
                                                </div>
                                                <span>You both receive bonus credits</span>
                                            </li>
                                        </ul>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="subscription">
                        <Card>
                            <CardHeader>
                                <CardTitle>Your Subscription</CardTitle>
                                <CardDescription>
                                    View your current subscription plan and credits
                                </CardDescription>
                            </CardHeader>
                            <div className="p-6">
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-lg font-medium">Current Plan</h3>
                                        <Separator className="my-3" />
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-sm text-muted-foreground">Plan Type</p>
                                                <p className="font-medium capitalize">{subscription?.tier || 'Free'}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-muted-foreground">Credits</p>
                                                <div className="flex gap-4">
                                                    <div>
                                                        <p className="text-xs text-muted-foreground">Basic</p>
                                                        <p className="font-medium">{subscription?.basicCreditsRemaining || 0}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-muted-foreground">Advanced</p>
                                                        <p className="font-medium">{subscription?.advancedCreditsRemaining || 0}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-4">
                                        <Button onClick={() => navigate('/pricing')}>
                                            Upgrade Subscription
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </TabsContent>
                </Tabs>
            </main>
            <Footer />
        </div>
    );
};

export default Account;
