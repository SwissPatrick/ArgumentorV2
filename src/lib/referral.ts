
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

// Types
export type ReferralCode = {
    code: string;
};

export type ReferralInfo = {
    code: string;
    usedByCount: number;
};

/**
 * Fetches the current user's referral code
 */
export const getUserReferralCode = async (): Promise<string | null> => {
    try {
        const { data: user } = await supabase.auth.getUser();

        if (!user.user) {
            console.log("No authenticated user found");
            return null;
        }

        const { data, error } = await supabase
            .from('referral_codes')
            .select('code')
            .eq('user_id', user.user.id)
            .maybeSingle();

        if (error) {
            // Only log as error if it's not a "no rows returned" error
            if (!error.message.includes("no rows")) {
                console.error("Error fetching referral code:", error);
            } else {
                console.log("No referral code found for user");
            }
            return null;
        }

        return data?.code || null;
    } catch (error) {
        console.error("Error fetching referral code:", error);
        return null;
    }
};

/**
 * Fetches the count of users who have used the current user's referral code
 */
export const getReferralUsedCount = async (code: string): Promise<number> => {
    try {
        if (!code) return 0;

        const { count, error } = await supabase
            .from('referral_uses')
            .select('*', { count: 'exact', head: true })
            .eq('referral_code', code);

        if (error) {
            console.error("Error fetching referral usage count:", error);
            return 0;
        }

        return count || 0;
    } catch (error) {
        console.error("Error fetching referral usage count:", error);
        return 0;
    }
};

/**
 * Gets the full referral information for the current user
 */
export const getUserReferralInfo = async (): Promise<ReferralInfo | null> => {
    try {
        // Get the user's referral code
        const code = await getUserReferralCode();

        if (!code) {
            // No need to try to create one automatically or show errors
            // The user can explicitly request a code later
            return null;
        }

        // Get the count of users who have used this code
        const usedByCount = await getReferralUsedCount(code);

        return {
            code,
            usedByCount
        };
    } catch (error) {
        console.error("Error getting referral info:", error);
        return null;
    }
};

/**
 * Creates a referral code for the current user if one doesn't exist
 * This is separated from the signup process to avoid permission errors
 */
export const createReferralCode = async (): Promise<boolean> => {
    try {
        const { data: user } = await supabase.auth.getUser();

        if (!user.user) {
            console.log("No authenticated user found");
            return false;
        }

        // Check if a code already exists
        const { data: existingCode } = await supabase
            .from('referral_codes')
            .select('code')
            .eq('user_id', user.user.id)
            .maybeSingle();

        if (existingCode?.code) {
            // A code already exists
            return true;
        }

        // Generate a unique referral code (8 characters)
        const generatedCode = Array.from(
            { length: 8 },
            () => "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"[Math.floor(Math.random() * 32)]
        ).join("");

        // Insert the new code
        const { error } = await supabase
            .from('referral_codes')
            .upsert({
                user_id: user.user.id,
                code: generatedCode
            }, {
                onConflict: 'user_id',
                ignoreDuplicates: true
            });

        if (error) {
            // Log the error but don't throw
            console.error("Error creating referral code:", error);
            return false;
        }

        return true;
    } catch (error) {
        console.error("Error creating referral code:", error);
        return false;
    }
};

/**
 * Redeems a referral code
 */
export const redeemReferralCode = async (code: string): Promise<boolean> => {
    try {
        const { data: user } = await supabase.auth.getUser();

        if (!user.user) {
            console.log("No authenticated user found");
            toast({
                title: "Authentication required",
                description: "You must be logged in to redeem a referral code",
                variant: "destructive",
            });
            return false;
        }

        const { data, error } = await supabase.functions.invoke('redeem-referral', {
            body: { code, userId: user.user.id }
        });

        if (error) {
            console.error("Error redeeming referral code:", error);
            toast({
                title: "Error",
                description: error.message || "There was a problem redeeming your referral code",
                variant: "destructive",
            });
            return false;
        }

        if (!data.success) {
            toast({
                title: "Invalid referral code",
                description: data.message || "This code is invalid or has already been used",
                variant: "destructive",
            });
            return false;
        }

        toast({
            title: "Success!",
            description: data.message || "Referral code successfully redeemed",
        });

        return true;
    } catch (error: any) {
        console.error("Error redeeming referral code:", error);
        toast({
            title: "Error",
            description: error.message || "There was a problem redeeming your referral code",
            variant: "destructive",
        });
        return false;
    }
};
