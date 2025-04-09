
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "@/components/auth/AuthProvider";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { Json } from "@/integrations/supabase/types";
import { canSaveNewArgument } from "@/lib/subscription";

interface ArgumentItem {
    id: string;
    type: "premise" | "conclusion" | "evidence" | "objection" | "rebuttal";
    content: string;
    isAiGenerated?: boolean;
}

export function useArgumentSaving({
                                      title,
                                      argumentBlocks,
                                      currentArgumentId,
                                      setCurrentArgumentId,
                                      setTitle,
                                      setArgumentBlocks,
                                      setIsSaving
                                  }: {
    title: string;
    argumentBlocks: ArgumentItem[];
    currentArgumentId: string | null;
    setCurrentArgumentId: (id: string | null) => void;
    setTitle: (title: string) => void;
    setArgumentBlocks: (blocks: ArgumentItem[]) => void;
    setIsSaving: (isSaving: boolean) => void;
}) {
    const { user } = useAuth();
    const location = useLocation();

    useEffect(() => {
        if (user) {
            const queryParams = new URLSearchParams(location.search);
            const argumentId = queryParams.get('id');

            if (argumentId) {
                loadArgument(argumentId);
                setCurrentArgumentId(argumentId);
            }
        }
    }, [location.search, user]);

    const loadArgument = async (id: string) => {
        try {
            console.log(`Loading argument with ID: ${id}`);
            const { data, error } = await supabase
                .from("saved_arguments")
                .select("*")
                .eq("id", id)
                .single();

            if (error) {
                console.error("Supabase error loading argument:", error);
                throw error;
            }

            if (data) {
                console.log("Argument loaded successfully:", data.title);
                setTitle(data.title);
                setArgumentBlocks(data.content as unknown as ArgumentItem[]);
                toast({
                    title: "Argument loaded",
                    description: `"${data.title}" has been loaded successfully`,
                });
            } else {
                console.log("No argument found with that ID");
                toast({
                    title: "Argument not found",
                    description: "The requested argument could not be found",
                    variant: "destructive",
                });
            }
        } catch (error) {
            console.error("Error loading argument:", error);
            toast({
                title: "Error",
                description: "Failed to load argument",
                variant: "destructive",
            });
        }
    };

    const saveArgument = async () => {
        if (!user) {
            console.log("No user found, cannot save argument");
            return;
        }

        try {
            console.log("Saving argument...");
            setIsSaving(true);

            // Check if we're creating a new argument or updating an existing one
            if (!currentArgumentId) {
                console.log("Creating new argument");
                // For new arguments, verify if user can save more arguments
                const canSave = await canSaveNewArgument();

                if (!canSave) {
                    console.log("User reached saved arguments limit");
                    toast({
                        title: "Limit reached",
                        description: "You've reached your saved arguments limit. Please upgrade your subscription to save more arguments.",
                        variant: "destructive",
                    });
                    setIsSaving(false);
                    return;
                }
            } else {
                console.log(`Updating existing argument: ${currentArgumentId}`);
            }

            const argumentData = {
                title,
                content: argumentBlocks as unknown as Json,
                user_id: user.id,
            };

            let response;

            if (currentArgumentId) {
                response = await supabase
                    .from("saved_arguments")
                    .update({
                        title: argumentData.title,
                        content: argumentData.content,
                        updated_at: new Date().toISOString()
                    })
                    .eq("id", currentArgumentId);
            } else {
                response = await supabase
                    .from("saved_arguments")
                    .insert([argumentData])
                    .select();
            }

            if (response.error) {
                console.error("Supabase error saving argument:", response.error);
                throw response.error;
            }

            if (!currentArgumentId && response.data && response.data.length > 0) {
                console.log(`New argument created with ID: ${response.data[0].id}`);
                setCurrentArgumentId(response.data[0].id);
            }

            toast({
                title: "Saved successfully",
                description: "Your argument has been saved"
            });

        } catch (error) {
            console.error("Error saving argument:", error);
            toast({
                title: "Error",
                description: "Failed to save your argument",
                variant: "destructive",
            });
        } finally {
            setIsSaving(false);
        }
    };

    return { saveArgument, loadArgument };
}
