
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

// Initialize Resend with API key from environment variable
const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

// Set CORS headers for browser requests
const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Define the expected request structure
interface ContactFormRequest {
    name: string;
    email: string;
    subject: string;
    message: string;
    to: string;
}

const handler = async (req: Request): Promise<Response> => {
    // Handle CORS preflight requests
    if (req.method === "OPTIONS") {
        return new Response(null, { headers: corsHeaders });
    }

    try {
        // Parse the request body
        const { name, email, subject, message, to }: ContactFormRequest = await req.json();

        // Validate required fields
        if (!name || !email || !subject || !message || !to) {
            throw new Error("Missing required fields");
        }

        // Format the email content
        const formattedMessage = `
      Name: ${name}
      Email: ${email}
      
      Message:
      ${message}
    `;

        // Send the email using Resend
        const { data, error } = await resend.emails.send({
            from: "Argumentor <no-reply@argumentor.com>", // Update with your verified domain in Resend
            to: [to], // The recipient (argumentorteam@gmail.com)
            subject: `Contact Form: ${subject}`,
            html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>From:</strong> ${name} (${email})</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <h2>Message:</h2>
        <p>${message.replace(/\n/g, '<br/>')}</p>
      `,
            text: formattedMessage,
            reply_to: email, // Set reply-to as the sender's email for easy responses
        });

        if (error) {
            console.error("Resend API error:", error);
            throw new Error("Failed to send email");
        }

        console.log("Email sent successfully:", data);

        // Return success response
        return new Response(
            JSON.stringify({ success: true, message: "Email sent successfully" }),
            {
                status: 200,
                headers: {
                    "Content-Type": "application/json",
                    ...corsHeaders,
                },
            }
        );
    } catch (error) {
        console.error("Error in send-contact-email function:", error);

        // Return error response
        return new Response(
            JSON.stringify({
                success: false,
                error: error instanceof Error ? error.message : "Unknown error occurred"
            }),
            {
                status: 500,
                headers: {
                    "Content-Type": "application/json",
                    ...corsHeaders,
                },
            }
        );
    }
};

// Start the server
serve(handler);
