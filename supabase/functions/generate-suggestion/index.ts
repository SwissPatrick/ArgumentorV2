
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
        const { type, context, instructions } = await req.json();

        if (!type) {
            return new Response(
                JSON.stringify({ error: "Missing block type parameter" }),
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

        // Build the prompt based on block type
        let prompt = "";

        switch (type) {
            case "premise":
                prompt = "Generate a strong premise for an argument.";
                break;
            case "conclusion":
                prompt = "Generate a compelling conclusion that follows logically from premises.";
                break;
            case "evidence":
                prompt = "Generate a piece of evidence that would support an argument.";
                break;
            case "objection":
                prompt = "Generate a thoughtful objection to an argument.";
                break;
            case "rebuttal":
                prompt = "Generate a rebuttal that addresses objections to an argument.";
                break;
            default:
                prompt = `Generate content for an argument block of type: ${type}`;
        }

        // Add context if provided
        if (context && context.length > 0) {
            prompt += `\n\nConsider this context from the existing argument:\n${context}`;
        }

        // Add special instructions if provided
        if (instructions) {
            prompt += `\n\n${instructions}`;
        } else {
            prompt += "\n\nIMPORTANT: Never make up or invent sources. If citing research, use Harvard citation style (Author, Year). Only reference genuine, verifiable sources.";
        }

        prompt += "\n\nProvide only the text content without explanations or formatting.";

        console.log("Generating suggestion for block type:", type);
        console.log("Context provided:", context ? "Yes" : "No");

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
                    { role: "system", content: "You are an expert in argumentation and debate. Your goal is to help create compelling arguments with clear reasoning and strong evidence. Never invent or make up sources. If citing research, use Harvard citation style (Author, Year) and only reference genuine, verifiable sources." },
                    { role: "user", content: prompt }
                ],
                temperature: 0.7,
                max_tokens: 250
            })
        });

        if (!response.ok) {
            throw new Error(`OpenAI API request failed with status ${response.status}`);
        }

        const result = await response.json();
        const content = result.choices[0].message.content.trim();

        if (!content) {
            throw new Error("No suggestion generated from OpenAI");
        }

        return new Response(
            JSON.stringify({ content }),
            {
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            }
        );
    } catch (error) {
        console.error("Error in generate-suggestion function:", error);
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
