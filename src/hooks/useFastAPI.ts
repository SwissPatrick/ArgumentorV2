
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

// Constant for improved code readability
const SUPABASE_PROJECT_URL = "https://tlabsxcfgtiqmktltvbc.supabase.co";

const useFastAPI = () => {
    const fetchFromAPI = async (endpoint: string, data: any) => {
        try {
            // Use Supabase edge functions directly
            const { data: response, error } = await supabase.functions.invoke(endpoint.replace('/', ''), {
                body: data
            });

            if (error) {
                console.error(`Supabase function error (${endpoint}):`, error);
                throw error;
            }

            return response;
        } catch (error) {
            console.error(`API request error (${endpoint}):`, error);

            // Show a friendly toast message to the user
            toast({
                title: "AI Service Unavailable",
                description: "Our AI service is currently unavailable. Please try again later.",
                variant: "destructive"
            });

            throw error;
        }
    };

    return {
        fetchFromAPI,
        generateSuggestion: (type: string, context: string) =>
            fetchFromAPI('generate-suggestion', {
                type,
                context,
                instructions: "IMPORTANT: Never make up or invent sources. If citing research, use Harvard citation style (Author, Year). Only reference genuine, verifiable sources."
            }),
        analyzeArgument: (data: { blocks: any[], customInstructions?: string }) =>
            fetchFromAPI('analyze-argument', data),
        improveBlock: (blockData: { text: string, blockType: string, context: any[] }) =>
            fetchFromAPI('improve-block', blockData)
    };
};

export default useFastAPI;
