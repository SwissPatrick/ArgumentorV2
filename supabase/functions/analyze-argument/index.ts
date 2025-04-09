//@ts-ignore
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

// CORS headers
const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Helper function to sanitize inputs
const sanitizeInput = (input: string): string => {
    if (!input) return "";

    // Remove any potentially harmful content and limit length
    return input
        .replace(/[^\w\s.,?!;:()\[\]{}'"\/\\-]/g, '')
        .trim()
        .substring(0, 1000);
};

const serveWithCORS = async (req: Request) => {
    // Handle CORS preflight requests
    if (req.method === "OPTIONS") {
        return new Response(null, { headers: corsHeaders });
    }

    try {
        const { blocks, customInstructions } = await req.json();

        if (!blocks || !Array.isArray(blocks) || blocks.length === 0) {
            return new Response(
                JSON.stringify({ error: "No argument blocks provided" }),
                {
                    status: 400,
                    headers: { ...corsHeaders, "Content-Type": "application/json" },
                }
            );
        }

        // Validate and sanitize each block
        const sanitizedBlocks = blocks.map(block => ({
            type: typeof block.type === 'string' ? block.type.substring(0, 50) : 'premise', // Limit type length and provide default
            content: typeof block.content === 'string' ? sanitizeInput(block.content) : '' // Sanitize content
        })).filter(block => block.content.length > 0); // Remove empty blocks

        if (sanitizedBlocks.length === 0) {
            return new Response(
                JSON.stringify({ error: "All argument blocks were empty or invalid" }),
                {
                    status: 400,
                    headers: { ...corsHeaders, "Content-Type": "application/json" },
                }
            );
        }

        // Format blocks for the analysis
        const formattedArgument = sanitizedBlocks
            .map((block) => `${block.type}: ${block.content}`)
            .join("\n\n");

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

        // Sanitize custom instructions
        const sanitizedInstructions = customInstructions ? sanitizeInput(customInstructions) : "";

        // Build the prompt
        let prompt = `Analyze the following argument:\n\n${formattedArgument}\n\n`;
        prompt += "Please provide the following in your analysis:\n";
        prompt += "1. Any logical fallacies present, including type and description\n";
        prompt += "2. Potential improvements or additional argument blocks\n";
        prompt += "3. Overall strength score (0-100)\n";
        prompt += "4. Letter grade (A-F)\n";
        prompt += "5. Brief feedback on the argument\n\n";

        // Add custom instructions if provided
        if (sanitizedInstructions) {
            prompt += `Additional instructions: ${sanitizedInstructions}\n\n`;
        }

        // Add instructions about source citation
        prompt += "IMPORTANT SOURCE CITATION INSTRUCTIONS:\n";
        prompt += "1. NEVER make up or guess sources when suggesting evidence.\n";
        prompt += "2. If you reference any actual sources, use Harvard citation style (Author, Year).\n";
        prompt += "3. Only cite sources that genuinely exist and are verifiable.\n";
        prompt += "4. If you don't know a specific source, acknowledge this rather than inventing one.\n\n";

        prompt += "IMPORTANT: Format your response as a clean JSON object with these keys: fallacies (array of objects with type, description, and optional block properties), suggestions (array of objects with type and content properties), strength (number 0-100), grade (string A-F), feedback (string). DO NOT include markdown code blocks, backticks, or other formatting in your response.";

        console.log("Sending to OpenAI:", {
            blocks: sanitizedBlocks.length,
            hasCustomInstructions: !!sanitizedInstructions,
            prompt: prompt.substring(0, 200) + "..."
        });

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
                    {
                        role: "system",
                        content: "You are an expert in logic, rhetoric, and argumentation. Analyze arguments and provide structured feedback in valid JSON format. Your response must be valid JSON without any markdown formatting or code blocks. Address any custom instructions provided by the user. NEVER make up or fabricate sources. Only cite genuine, verifiable sources using Harvard style (Author, Year) citations."
                    },
                    { role: "user", content: prompt }
                ],
                temperature: 0.5,
                max_tokens: 1200,
                response_format: { type: "json_object" } // Enforce JSON response format
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("OpenAI API error:", errorText);
            throw new Error(`OpenAI API request failed with status ${response.status}: ${errorText}`);
        }

        const result = await response.json();
        const responseText = result.choices[0].message.content.trim();

        if (!responseText) {
            throw new Error("No response from OpenAI");
        }

        let analysisResult;
        try {
            // Clean the response text to handle potential Markdown code blocks
            const cleanedResponse = responseText
                .replace(/```json\s*/g, '')
                .replace(/```\s*$/g, '')
                .trim();

            // Parse the JSON response
            analysisResult = JSON.parse(cleanedResponse);

            // Validate the response structure
            const requiredKeys = ["fallacies", "suggestions", "strength", "grade", "feedback"];
            for (const key of requiredKeys) {
                if (!(key in analysisResult)) {
                    throw new Error(`Missing required key: ${key}`);
                }
            }

            // Ensure fallacies and suggestions are arrays
            if (!Array.isArray(analysisResult.fallacies)) {
                analysisResult.fallacies = [];
            }

            if (!Array.isArray(analysisResult.suggestions)) {
                if (typeof analysisResult.suggestions === 'string') {
                    // Convert string to array of objects if needed
                    analysisResult.suggestions = [{
                        type: "improvement",
                        content: analysisResult.suggestions
                    }];
                } else {
                    analysisResult.suggestions = [];
                }
            }

            // Format suggestions to ensure they have the correct structure
            analysisResult.suggestions = analysisResult.suggestions.map(suggestion => {
                if (typeof suggestion === 'string') {
                    return {
                        type: "premise",
                        content: suggestion
                    };
                }

                // Ensure each suggestion has a type field
                if (!suggestion.type || typeof suggestion.type !== 'string') {
                    return {
                        ...suggestion,
                        type: "premise"
                    };
                }

                return suggestion;
            });

            // Ensure strength is a number between 0-100
            if (typeof analysisResult.strength !== 'number') {
                analysisResult.strength = parseInt(analysisResult.strength) || 0;
            }

            // Keep the original strength value (0-100) for the frontend to handle
            analysisResult.strength = Math.max(0, Math.min(100, analysisResult.strength));

            // Sanitize feedback
            if (typeof analysisResult.feedback === 'string') {
                analysisResult.feedback = analysisResult.feedback.substring(0, 1000);
            } else {
                analysisResult.feedback = "Analysis completed successfully.";
            }

            // Sanitize grade
            if (typeof analysisResult.grade !== 'string' || !/^[A-F][+-]?$/.test(analysisResult.grade)) {
                analysisResult.grade = "C";
            }

        } catch (error) {
            console.error("Error parsing OpenAI response:", error, responseText);

            // Attempt to extract structured data from unstructured response
            analysisResult = {
                fallacies: [],
                suggestions: [],
                strength: 0,
                grade: "F",
                feedback: "Error analyzing argument. The AI couldn't understand your input properly. Please try again with clearer argument blocks.",
            };
        }

        return new Response(JSON.stringify(analysisResult), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error in analyze-argument function:", error);
        return new Response(
            JSON.stringify({
                error: error.message || "Unknown error occurred",
                feedback: "The AI couldn't process your argument. Please try again with simpler content or check your internet connection.",
                grade: "F",
                strength: 0,
                fallacies: [],
                suggestions: []
            }),
            {
                status: 500,
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            }
        );
    }
};

serve(serveWithCORS);