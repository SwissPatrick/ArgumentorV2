
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.8.0";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
        "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
    // Handle CORS preflight requests
    if (req.method === "OPTIONS") {
        return new Response(null, { headers: corsHeaders });
    }

    try {
        const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
        const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

        // Create authenticated Supabase client with service role key
        const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

        const { code, userId } = await req.json();

        if (!code || !userId) {
            return new Response(
                JSON.stringify({
                    success: false,
                    error: "Missing required parameters"
                }),
                {
                    headers: { ...corsHeaders, "Content-Type": "application/json" },
                    status: 400
                }
            );
        }

        console.log(`Redeeming referral code ${code} for user ${userId}`);

        // Call the database function to apply the referral bonus
        const { data, error } = await supabaseAdmin.rpc(
            'apply_referral_bonus',
            { _referral_code: code, _referred_user_id: userId }
        );

        if (error) {
            console.error("Error redeeming referral:", error);
            return new Response(
                JSON.stringify({
                    success: false,
                    error: error.message
                }),
                {
                    headers: { ...corsHeaders, "Content-Type": "application/json" },
                    status: 500
                }
            );
        }

        // Return success or failure based on the function result
        return new Response(
            JSON.stringify({
                success: data,
                message: data
                    ? "Referral code successfully redeemed! You've earned 2 basic and 1 advanced credit."
                    : "Invalid or already used referral code"
            }),
            {
                headers: { ...corsHeaders, "Content-Type": "application/json" }
            }
        );
    } catch (error) {
        console.error("Unexpected error:", error);
        return new Response(
            JSON.stringify({
                success: false,
                error: "An unexpected error occurred"
            }),
            {
                headers: { ...corsHeaders, "Content-Type": "application/json" },
                status: 500
            }
        );
    }
});
