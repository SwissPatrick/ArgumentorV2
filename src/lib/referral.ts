
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export type ReferralInfo = {
    code: string;
    usedByCount: number;
};

// Get a user's referral code
export const getUserReferralCode = async (): Promise<string | null> => {
    try {
        const { data: { session } } = await supabase.auth.getSession();

        if (!session) {
            return null;
        }

        const { data, error } = await supabase
            .from('referral_codes')
            .select('code')
            .eq('user_id', session.user.id)
            .maybeSingle(); // Changed from single() to maybeSingle()

        if (error) {
            console.error("Error fetching referral code:", error);
            return null;
        }

        // If no code exists yet, create one
        if (!data) {
            const newCode = await createReferralCode(session.user.id);
            return newCode;
        }

        return data.code || null;
    } catch (error) {
        console.error("Error in getUserReferralCode:", error);
        return null;
    }
};

// Create a new referral code for a user
const createReferralCode = async (userId: string): Promise<string | null> => {
    try {
        // Generate a random code (similar to the SQL function)
        const generateCode = () => {
            const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
            let result = '';
            for (let i = 0; i < 8; i++) {
                const pos = Math.floor(Math.random() * chars.length);
                result += chars.charAt(pos);
            }
            return result;
        };

        const code = generateCode();

        // Insert the new code
        const { data, error } = await supabase
            .from('referral_codes')
            .insert({ user_id: userId, code })
            .select('code')
            .single();

        if (error) {
            console.error("Error creating referral code:", error);
            return null;
        }

        return data?.code || null;
    } catch (error) {
        console.error("Error in createReferralCode:", error);
        return null;
    }
};

// Get information about a user's referrals
export const getUserReferralInfo = async (): Promise<ReferralInfo | null> => {
    try {
        const { data: { session } } = await supabase.auth.getSession();

        if (!session) {
            return null;
        }

        // Get the user's referral code
        const code = await getUserReferralCode(); // Use our updated function

        if (!code) {
            return null;
        }

        // Count how many people have used this code
        const { count, error: countError } = await supabase
            .from('referral_uses')
            .select('*', { count: 'exact', head: true })
            .eq('referrer_id', session.user.id);

        if (countError) {
            console.error("Error counting referrals:", countError);
            return null;
        }

        return {
            code: code,
            usedByCount: count || 0
        };
    } catch (error) {
        console.error("Error in getUserReferralInfo:", error);
        return null;
    }
};

// Redeem a referral code
export const redeemReferralCode = async (code: string): Promise<boolean> => {
    try {
        const { data: { session } } = await supabase.auth.getSession();

        if (!session) {
            toast({
                title: "Authentication required",
                description: "You must be logged in to redeem a referral code",
                variant: "destructive",
            });
            return false;
        }

        // Call our edge function to redeem the code
        const { data, error } = await supabase.functions.invoke('redeem-referral', {
            body: {
                code: code.toUpperCase().trim(),
                userId: session.user.id
            }
        });

        if (error) {
            console.error("Error invoking redeem-referral function:", error);
            toast({
                title: "Error redeeming code",
                description: error.message,
                variant: "destructive",
            });
            return false;
        }

        if (data.success) {
            toast({
                title: "Referral code redeemed!",
                description: data.message,
            });
            return true;
        } else {
            toast({
                title: "Invalid referral code",
                description: data.message || "This code cannot be redeemed",
                variant: "destructive",
            });
            return false;
        }
    } catch (error) {
        console.error("Error in redeemReferralCode:", error);
        toast({
            title: "Error redeeming code",
            description: "An unexpected error occurred",
            variant: "destructive",
        });
        return false;
    }
};
