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
            .from("referral_codes")
            .select("code")
            .eq("user_id", user.user.id)
            .maybeSingle();

        if (error) {
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
            .from("referral_uses")
            .select("*", { count: "exact", head: true })
            .eq("referral_code", code);

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
 * Creates a code if one does not yet exist
 */
export const getUserReferralInfo = async (): Promise<ReferralInfo | null> => {
    try {
        let code = await getUserReferralCode();

        if (!code) {
            const created = await createReferralCode();
            if (created) {
                code = await getUserReferralCode();
            }
        }

        if (!code) return null;

        const usedByCount = await getReferralUsedCount(code);

        return {
            code,
            usedByCount,
        };
    } catch (error) {
        console.error("Error getting referral info:", error);
        return null;
    }
};

/**
 * Creates a referral code for the current user if one doesn't exist
 */
export const createReferralCode = async (): Promise<boolean> => {
    try {
        const { data: user } = await supabase.auth.getUser();
        if (!user.user) return false;

        const { data: existingCode } = await supabase
            .from("referral_codes")
            .select("code")
            .eq("user_id", user.user.id)
            .maybeSingle();

        if (existingCode?.code) return true;

        const generatedCode = Array.from(
            { length: 8 },
            () =>
                "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"[Math.floor(Math.random() * 32)]
        ).join("");

        const { error } = await supabase
            .from("referral_codes")
            .upsert(
                { user_id: user.user.id, code: generatedCode },
                { onConflict: "user_id", ignoreDuplicates: true }
            );

        if (error) {
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
 * Redeems a referral code via Supabase Edge Function
 */
export const redeemReferralCode = async (code: string): Promise<boolean> => {
    try {
        const { data: user } = await supabase.auth.getUser();

        if (!user.user) {
            toast({
                title: "Authentication required",
                description: "You must be logged in to redeem a referral code",
                variant: "destructive",
            });
            return false;
        }

        const result = await supabase.functions.invoke("redeem-referral", {
            body: { code, userId: user.user.id },
        });

        const { data, error } = result;

        if (error) {
            let message = "There was a problem redeeming your referral code";

            try {
                const res = error.response;
                if (res) {
                    const parsed = await res.json();
                    if (parsed?.message) {
                        message = parsed.message;
                    }
                }
            } catch (e) {
                console.warn("Failed to parse referral error response", e);
            }

            toast({
                title: "Could not redeem code",
                description: message,
                variant: "destructive",
            });

            return false;
        }

        if (!data?.success) {
            toast({
                title: "Could not redeem code",
                description: data?.message ?? "Invalid or already used referral code",
                variant: "destructive",
            });
            return false;
        }

        toast({
            title: "Success!",
            description:
                data?.message ||
                "Referral code successfully redeemed. Enjoy your bonus credits!",
        });

        return true;
    } catch (err: any) {
        console.error("Unexpected error:", err);
        toast({
            title: "Unexpected error",
            description: err?.message || "Something went wrong",
            variant: "destructive",
        });
        return false;
    }
};
