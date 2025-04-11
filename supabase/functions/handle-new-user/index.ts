
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
        const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY") || "";
        const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

        // Create authenticated Supabase client
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

        // Check if user has a referral code in metadata
        const { data: userData, error: userError } = await supabaseAdmin.auth.admin.getUserById(record.id);

        if (userError || !userData.user) {
            console.error("Error fetching user data:", userError);
            return new Response(
                JSON.stringify({ success: false, error: userError?.message }),
                {
                    headers: { ...corsHeaders, "Content-Type": "application/json" },
                    status: 500
                }
            );
        }

        // Check if there's a referral code in the user's metadata
        const referralCode = userData.user.user_metadata?.referralCode;

        if (referralCode) {
            console.log(`Found referral code ${referralCode} for user ${record.id}`);

            // Process the referral
            const { data: referralData, error: referralError } = await supabaseAdmin.rpc(
                'apply_referral_bonus',
                { _referral_code: referralCode, _referred_user_id: record.id }
            );

            if (referralError) {
                console.error("Error processing referral:", referralError);
            } else {
                console.log("Referral processing result:", referralData);
            }
        }

        // Make sure the user has a referral code created
        const { data: existingCode, error: codeCheckError } = await supabaseAdmin
            .from('referral_codes')
            .select('code')
            .eq('user_id', record.id)
            .maybeSingle();

        if (codeCheckError) {
            console.error("Error checking for existing referral code:", codeCheckError);
        }

        // If no code exists, we'll create one using the database function
        if (!existingCode) {
            console.log("No referral code found, creating one for user:", record.id);

            // The trigger should create this automatically, but we double-check here
            const { data: newCode, error: createError } = await supabaseAdmin.rpc(
                'create_referral_code_for_new_user_manual',
                { user_id: record.id }
            );

            if (createError) {
                console.error("Error creating referral code:", createError);
            } else {
                console.log("Created new referral code for user");
            }
        }

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
