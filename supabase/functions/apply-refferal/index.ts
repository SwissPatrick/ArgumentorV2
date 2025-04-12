
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

        const { userId, referralCode } = await req.json();

        if (!userId || !referralCode) {
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

        console.log(`Processing referral code ${referralCode} for user ${userId}`);

        try {
            // Call the database function to apply the referral bonus
            const { data, error } = await supabaseAdmin.rpc(
                'apply_referral_bonus',
                { _referral_code: referralCode, _referred_user_id: userId }
            );

            if (error) {
                console.error("Error processing referral:", error);
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

            return new Response(
                JSON.stringify({
                    success: !!data,
                    message: !!data
                        ? "Referral bonus applied successfully"
                        : "Invalid or already used referral code"
                }),
                {
                    headers: { ...corsHeaders, "Content-Type": "application/json" }
                }
            );
        } catch (dbError) {
            console.error("Database error during referral processing:", dbError);
            return new Response(
                JSON.stringify({
                    success: false,
                    error: "Database error during referral processing"
                }),
                {
                    headers: { ...corsHeaders, "Content-Type": "application/json" },
                    status: 500
                }
            );
        }
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
