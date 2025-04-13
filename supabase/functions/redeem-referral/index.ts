import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.8.0";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
        "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
    if (req.method === "OPTIONS") {
        return new Response(null, { headers: corsHeaders });
    }

    try {
        const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
        const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

        if (!supabaseUrl || !supabaseServiceKey) {
            console.error("Missing environment variables");
            return new Response(
                JSON.stringify({ success: false, error: "Missing Supabase env vars" }),
                { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
            );
        }

        const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
        const body = await req.json();

        console.log("Incoming request payload:", body);

        const { code, userId } = body;

        if (!code || !userId) {
            console.warn("Missing parameters", { code, userId });
            return new Response(
                JSON.stringify({ success: false, message: "Missing code or userId" }),
                { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
            );
        }

        console.log(`Redeeming referral code "${code}" for user "${userId}"`);

        const { data, error } = await supabaseAdmin.rpc("apply_referral_bonus", {
            referral_code: code,
            referred_user_id: userId,
        });

        console.log("RPC response:", { data, error });

        if (error) {
            const message = error.message || "Unknown error";
            console.error("Postgres error:", message);

            let status = 400;
            if (message.toLowerCase().includes("already redeemed")) status = 409;
            else if (message.toLowerCase().includes("invalid referral code")) status = 404;
            else if (message.toLowerCase().includes("cannot refer yourself")) status = 403;

            return new Response(
                JSON.stringify({ success: false, message }),
                { headers: { ...corsHeaders, "Content-Type": "application/json" }, status }
            );
        }

        return new Response(
            JSON.stringify({
                success: true,
                message: "Referral code successfully redeemed! You've earned 2 basic and 1 advanced credit.",
            }),
            { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
    } catch (err) {
        console.error("Unexpected server error:", err);
        return new Response(
            JSON.stringify({ success: false, message: "Unexpected server error" }),
            { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
        );
    }
});
