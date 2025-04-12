
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

        const { event, record } = await req.json();

        // Only proceed if this is a new user signup event
        if (event !== 'INSERT' || !record || !record.id) {
            return new Response(
                JSON.stringify({ message: "Not a user creation event" }),
                { headers: { ...corsHeaders, "Content-Type": "application/json" } }
            );
        }

        console.log("Processing new user:", record.id);

        // We will NOT try to create a referral code during signup
        // This will be handled as a separate process later

        return new Response(
            JSON.stringify({
                success: true,
                message: "User processed successfully"
            }),
            { headers: { ...corsHeaders, "Content-Type": "application/json" } }
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
