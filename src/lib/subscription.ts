import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/auth/AuthProvider";

export type Subscription = {
    tier: "free" | "basic" | "premium" | "enterprise";
    basicCreditsRemaining: number;
    advancedCreditsRemaining: number;
    maxBasicCredits: number;
    maxAdvancedCredits: number;
    maxSavedArguments: number;
    features: {
        aiSuggestions: boolean;
        fullAnalysis: boolean;
        export: boolean;
        templates: boolean;
    }
};

export type SubscriptionTier = {
    id: string;
    name: string;
    price: number;
    basicCredits: number;
    advancedCredits: number;
    maxSavedArguments: number;
    features: string[];
    recommended?: boolean;
};

export const subscriptionTiers: SubscriptionTier[] = [
    {
        id: "free",
        name: "Free",
        price: 0,
        basicCredits: 25,
        advancedCredits: 5,
        maxSavedArguments: 3,
        features: [
            "Basic argument builder",
            "25 basic credits for block-level AI suggestions",
            "5 advanced credits for analysis",
            "Save up to 3 arguments"
        ]
    },
    {
        id: "basic",
        name: "Basic",
        price: 7.99,
        basicCredits: 75,
        advancedCredits: 25,
        maxSavedArguments: 10,
        features: [
            "Everything in Free",
            "75 basic credits for block-level suggestions",
            "25 advanced credits for full argument analysis",
            "Export to PDF",
            "Save up to 10 arguments"
        ],
        recommended: true
    },
    {
        id: "premium",
        name: "Premium",
        price: 14.99,
        basicCredits: 200,
        advancedCredits: 50,
        maxSavedArguments: 25,
        features: [
            "Everything in Basic",
            "200 basic credits for block-level suggestions",
            "50 advanced credits for full argument analysis",
            "Premium argument templates",
            "Save up to 25 arguments"
        ]
    }
];

const defaultSubscription: Subscription = {
    tier: "free",
    basicCreditsRemaining: 25,
    advancedCreditsRemaining: 5,
    maxBasicCredits: 25,
    maxAdvancedCredits: 5,
    maxSavedArguments: 3,
    features: {
        aiSuggestions: true,
        fullAnalysis: false,
        export: false,
        templates: false
    }
};

export const isLoggedIn = async (): Promise<boolean> => {
    const { data } = await supabase.auth.getSession();
    return !!data.session;
};

// Check if a user is an admin
const checkIsAdmin = async (email: string): Promise<boolean> => {
    try {
        const { data, error } = await supabase.functions.invoke('check-admin', {
            body: { email }
        });

        if (error) {
            console.error("Error checking admin status:", error);
            return false;
        }

        return data?.isAdmin || false;
    } catch (error) {
        console.error("Error invoking check-admin function:", error);
        return false;
    }
};

export const getUserSubscription = async (): Promise<Subscription> => {
    try {
        const { data: { session } } = await supabase.auth.getSession();

        if (!session) {
            return defaultSubscription;
        }

        // Use the edge function to check admin status
        const isAdmin = session.user.email ?
            await checkIsAdmin(session.user.email.toLowerCase()) : false;

        if (isAdmin) {
            return {
                tier: "enterprise",
                basicCreditsRemaining: 999999,
                advancedCreditsRemaining: 999999,
                maxBasicCredits: 999999,
                maxAdvancedCredits: 999999,
                maxSavedArguments: 999999,
                features: {
                    aiSuggestions: true,
                    fullAnalysis: true,
                    export: true,
                    templates: true
                }
            };
        }

        const { data, error } = await supabase
            .from('user_subscriptions')
            .select('*')
            .eq('user_id', session.user.id)
            .single();

        if (error || !data) {
            console.error("Error fetching subscription:", error);
            return defaultSubscription;
        }

        return {
            tier: data.tier as "free" | "basic" | "premium" | "enterprise",
            basicCreditsRemaining: data.basic_credits_remaining,
            advancedCreditsRemaining: data.advanced_credits_remaining,
            maxBasicCredits: getMaxBasicCreditsForTier(data.tier),
            maxAdvancedCredits: getMaxAdvancedCreditsForTier(data.tier),
            maxSavedArguments: getMaxSavedArgumentsForTier(data.tier),
            features: getFeaturesForTier(data.tier)
        };
    } catch (error) {
        console.error("Error in getUserSubscription:", error);
        return defaultSubscription;
    }
};

export const hasBasicCredits = async (): Promise<boolean> => {
    const { data: { session } } = await supabase.auth.getSession();

    // Check if user is admin using the edge function
    const isAdmin = session?.user?.email ?
        await checkIsAdmin(session.user.email.toLowerCase()) : false;

    if (isAdmin) return true;

    const subscription = await getUserSubscription();
    return subscription.basicCreditsRemaining > 0;
};

export const hasAdvancedCredits = async (): Promise<boolean> => {
    const { data: { session } } = await supabase.auth.getSession();

    // Check if user is admin using the edge function
    const isAdmin = session?.user?.email ?
        await checkIsAdmin(session.user.email.toLowerCase()) : false;

    if (isAdmin) return true;

    const subscription = await getUserSubscription();
    return subscription.advancedCreditsRemaining > 0;
};

export const useBasicCredit = async (): Promise<boolean> => {
    try {
        const { data: { session } } = await supabase.auth.getSession();

        if (!session) {
            console.log("No active session found when trying to use basic credit");
            return false;
        }

        // Check if user is admin using the edge function
        const isAdmin = session.user.email ?
            await checkIsAdmin(session.user.email.toLowerCase()) : false;

        if (isAdmin) {
            console.log("Admin user, not consuming credit");
            return true;
        }

        const { data: subscription, error: fetchError } = await supabase
            .from('user_subscriptions')
            .select('basic_credits_remaining')
            .eq('user_id', session.user.id)
            .single();

        if (fetchError) {
            console.error("Error fetching subscription for basic credit usage:", fetchError);
            return false;
        }

        if (!subscription || subscription.basic_credits_remaining <= 0) {
            console.log("No basic credits remaining:", subscription?.basic_credits_remaining);
            return false;
        }

        console.log(`Using 1 basic credit. Before: ${subscription.basic_credits_remaining}`);

        const { error: updateError } = await supabase
            .from('user_subscriptions')
            .update({
                basic_credits_remaining: subscription.basic_credits_remaining - 1,
                updated_at: new Date().toISOString()
            })
            .eq('user_id', session.user.id);

        if (updateError) {
            console.error("Error updating basic credits:", updateError);
            return false;
        }

        console.log(`Basic credit used successfully. Remaining: ${subscription.basic_credits_remaining - 1}`);
        return true;
    } catch (error) {
        console.error("Unexpected error in useBasicCredit:", error);
        return false;
    }
};

export const useAdvancedCredit = async (): Promise<boolean> => {
    try {
        const { data: { session } } = await supabase.auth.getSession();

        if (!session) {
            console.log("No active session found when trying to use advanced credit");
            return false;
        }

        // Check if user is admin using the edge function
        const isAdmin = session.user.email ?
            await checkIsAdmin(session.user.email.toLowerCase()) : false;

        if (isAdmin) {
            console.log("Admin user, not consuming credit");
            return true;
        }

        const { data: subscription, error: fetchError } = await supabase
            .from('user_subscriptions')
            .select('advanced_credits_remaining')
            .eq('user_id', session.user.id)
            .single();

        if (fetchError) {
            console.error("Error fetching subscription for advanced credit usage:", fetchError);
            return false;
        }

        if (!subscription || subscription.advanced_credits_remaining <= 0) {
            console.log("No advanced credits remaining:", subscription?.advanced_credits_remaining);
            return false;
        }

        console.log(`Using 1 advanced credit. Before: ${subscription.advanced_credits_remaining}`);

        const { error: updateError } = await supabase
            .from('user_subscriptions')
            .update({
                advanced_credits_remaining: subscription.advanced_credits_remaining - 1,
                updated_at: new Date().toISOString()
            })
            .eq('user_id', session.user.id);

        if (updateError) {
            console.error("Error updating advanced credits:", updateError);
            return false;
        }

        console.log(`Advanced credit used successfully. Remaining: ${subscription.advanced_credits_remaining - 1}`);
        return true;
    } catch (error) {
        console.error("Unexpected error in useAdvancedCredit:", error);
        return false;
    }
};

export const hasCredits = hasBasicCredits;
export const useCredit = useBasicCredit;

export const canSaveNewArgument = async (): Promise<boolean> => {
    try {
        const { data: { session } } = await supabase.auth.getSession();

        if (!session) {
            return false;
        }

        const isAdmin = session?.user?.email ?
            await checkIsAdmin(session.user.email.toLowerCase()) : false;

        if (isAdmin) return true;

        const subscription = await getUserSubscription();

        const { count, error } = await supabase
            .from('saved_arguments')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', session.user.id);

        if (error) {
            console.error("Error checking saved arguments count:", error);
            return false;
        }

        return count !== null && count < subscription.maxSavedArguments;
    } catch (error) {
        console.error("Error in canSaveNewArgument:", error);
        return false;
    }
};

export const getSavedArgumentsLimitInfo = async (): Promise<{
    current: number,
    max: number
}> => {
    try {
        const { data: { session } } = await supabase.auth.getSession();

        if (!session) {
            return { current: 0, max: defaultSubscription.maxSavedArguments };
        }

        const isAdmin = session?.user?.email ?
            await checkIsAdmin(session.user.email.toLowerCase()) : false;

        if (isAdmin) return { current: 0, max: 999999 };

        const subscription = await getUserSubscription();

        const { count, error } = await supabase
            .from('saved_arguments')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', session.user.id);

        if (error) {
            console.error("Error checking saved arguments count:", error);
            return { current: 0, max: subscription.maxSavedArguments };
        }

        return {
            current: count || 0,
            max: subscription.maxSavedArguments
        };
    } catch (error) {
        console.error("Error in getSavedArgumentsLimitInfo:", error);
        return { current: 0, max: defaultSubscription.maxSavedArguments };
    }
};

/**
 * Upgrades a user's subscription to a specific tier
 * This ensures the user receives the correct number of credits based on their tier
 */
export const upgradeSubscription = async (tierId: string): Promise<boolean> => {
    try {
        const { data: { session } } = await supabase.auth.getSession();

        if (!session) {
            console.error("No active session when trying to upgrade subscription");
            return false;
        }

        // Find the tier in our subscription tiers data
        const tierInfo = subscriptionTiers.find(tier => tier.id === tierId);

        if (!tierInfo) {
            console.error(`Invalid tier ID: ${tierId}`);
            return false;
        }

        console.log(`Upgrading user to ${tierInfo.name} tier with ${tierInfo.basicCredits} basic credits and ${tierInfo.advancedCredits} advanced credits`);

        // Update the user's subscription with the correct number of credits for their tier
        const { error } = await supabase
            .from('user_subscriptions')
            .update({
                tier: tierId,
                basic_credits_remaining: tierInfo.basicCredits,
                advanced_credits_remaining: tierInfo.advancedCredits,
                updated_at: new Date().toISOString()
            })
            .eq('user_id', session.user.id);

        if (error) {
            console.error("Error upgrading subscription:", error);
            return false;
        }

        console.log(`Successfully upgraded to ${tierInfo.name} tier`);
        return true;
    } catch (error) {
        console.error("Unexpected error in upgradeSubscription:", error);
        return false;
    }
};

function getMaxBasicCreditsForTier(tier: string): number {
    const tierInfo = subscriptionTiers.find(t => t.id === tier);
    return tierInfo ? tierInfo.basicCredits : 25;
}

function getMaxAdvancedCreditsForTier(tier: string): number {
    const tierInfo = subscriptionTiers.find(t => t.id === tier);
    return tierInfo ? tierInfo.advancedCredits : 5;
}

function getMaxSavedArgumentsForTier(tier: string): number {
    const tierInfo = subscriptionTiers.find(t => t.id === tier);
    return tierInfo ? tierInfo.maxSavedArguments : 3;
}

function getFeaturesForTier(tier: string): Subscription['features'] {
    switch (tier) {
        case 'premium':
        case 'enterprise':
            return {
                aiSuggestions: true,
                fullAnalysis: true,
                export: true,
                templates: true
            };
        case 'basic':
            return {
                aiSuggestions: true,
                fullAnalysis: true,
                export: true,
                templates: false
            };
        default:
            return {
                aiSuggestions: true,
                fullAnalysis: false,
                export: false,
                templates: false
            };
    }
}
