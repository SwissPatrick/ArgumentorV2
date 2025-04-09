
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

// CORS headers
const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const serveWithCORS = async (req: Request) => {
    // Handle CORS preflight requests
    if (req.method === "OPTIONS") {
        return new Response(null, { headers: corsHeaders });
    }

    try {
        const { text, blockType, context } = await req.json();

        if (!text || !blockType) {
            return new Response(
                JSON.stringify({ error: "Missing required parameters" }),
                {
                    status: 400,
                    headers: { ...corsHeaders, "Content-Type": "application/json" },
                }
            );
        }

        // Get OpenAI API key from environment
        const openAiKey = Deno.env.get("OPENAI_API_KEY");
        if (!openAiKey) {
            return new Response(
                JSON.stringify({ error: "OpenAI API key not configured" }),
                {
                    status: 500,
                    headers: { ...corsHeaders, "Content-Type": "application/json" },
                }
            );
        }

        // Format the context if provided
        let contextString = "";
        if (context && Array.isArray(context) && context.length > 0) {
            contextString = "Context of the argument:\n" +
                context.map(block => `${block.type}: ${block.content}`).join("\n\n");
        }

        // Build the prompt
        let prompt = `Improve the following ${blockType} in an argument:\n\n"${text}"\n\n`;

        if (contextString) {
            prompt += `${contextString}\n\n`;
        }

        prompt += `Please provide a revised version of this ${blockType} that:
1. Strengthens the argument
2. Improves clarity and precision
3. Addresses potential counterarguments
4. Uses more persuasive language where appropriate

Only provide the improved text without explanations or formatting. `;

        console.log("Sending to OpenAI:", { blockType, textLength: text.length });

        // Make request to OpenAI
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${openAiKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [
                    { role: "system", content: "You are an expert in argumentation and debate." },
                    { role: "user", content: prompt }
                ],
                temperature: 0.7,
                max_tokens: 500
            })
        });

        if (!response.ok) {
            throw new Error(`OpenAI API request failed with status ${response.status}`);
        }

        const result = await response.json();
        const improvement = result.choices[0].message.content.trim();

        if (!improvement) {
            throw new Error("No improvement suggestion received from OpenAI");
        }

        return new Response(
            JSON.stringify({ improvement }),
            {
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            }
        );
    } catch (error) {
        console.error("Error in improve-block function:", error);
        return new Response(
            JSON.stringify({ error: error.message || "Unknown error occurred" }),
            {
                status: 500,
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            }
        );
    }
};

serve(serveWithCORS);
