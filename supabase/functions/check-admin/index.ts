import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

interface RequestData {
    email?: string;
}

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
    console.log("check-admin function called");

    // Handle CORS preflight requests
    if (req.method === "OPTIONS") {
        console.log("Handling OPTIONS request");
        return new Response("ok", { headers: corsHeaders });
    }

    try {
        // Get admin emails from environment variable with fallback
        // Note: Keeping Deno.env.get as this is a Deno edge function
        const adminEmailsString = Deno.env.get("ADMIN_EMAILS") || "";
        console.log("Admin emails config:", adminEmailsString ? "Present (redacted)" : "Empty");

        // If no admin emails are configured, always return false to avoid hanging
        if (!adminEmailsString.trim()) {
            console.log("No admin emails configured in environment");
            return new Response(
                JSON.stringify({ isAdmin: false }),
                { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
            );
        }

        const adminEmails = adminEmailsString.split(",").map(email => email.trim().toLowerCase());

        // Parse request body
        let email;
        try {
            const body = await req.json() as RequestData;
            email = body.email;
            console.log("Checking admin status for email:", email ? email.substring(0, 3) + "***" : "No email provided");
        } catch (parseError) {
            console.error("Error parsing request body:", parseError);
            return new Response(
                JSON.stringify({ error: "Invalid request body", isAdmin: false }),
                { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
            );
        }

        if (!email) {
            console.log("No email provided in request");
            return new Response(
                JSON.stringify({ error: "Email is required", isAdmin: false }),
                { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
            );
        }

        // Check if the email is in the admin list
        const isAdmin = adminEmails.includes(email.toLowerCase());
        console.log("Admin check result:", isAdmin);

        // Always return a successful response, even if not admin
        return new Response(
            JSON.stringify({ isAdmin }),
            { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
    } catch (error) {
        console.error("Error checking admin status:", error);

        // Return a default response with isAdmin: false when an error occurs
        return new Response(
            JSON.stringify({ error: "Internal server error", details: error.message, isAdmin: false }),
            { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
    }
});
