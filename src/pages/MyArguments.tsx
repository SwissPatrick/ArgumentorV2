
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArgumentList } from "@/components/ArgumentList";
import { useAuth } from "@/components/auth/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import type { Json } from "@/integrations/supabase/types";
import { Skeleton } from "@/components/ui/skeleton";
import { getSavedArgumentsLimitInfo } from "@/lib/subscription";

interface ArgumentItem {
    id: string;
    type: "premise" | "conclusion" | "evidence" | "objection" | "rebuttal";
    content: string;
    isAiGenerated?: boolean;
}

interface SavedArgument {
    id: string;
    title: string;
    content: Json;
    created_at: string;
    updated_at: string;
}

interface ArgumentListItem {
    id: string;
    title: string;
    lastModified: Date;
    blocks: ArgumentItem[];
}

const MyArguments = () => {
    const [savedArguments, setSavedArguments] = useState<ArgumentListItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [argumentLimits, setArgumentLimits] = useState<{ current: number, max: number }>({ current: 0, max: 0 });
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            fetchSavedArguments();
            fetchArgumentLimits();
        }
    }, [user]);

    const fetchArgumentLimits = async () => {
        const limits = await getSavedArgumentsLimitInfo();
        setArgumentLimits(limits);
    };

    const fetchSavedArguments = async () => {
        try {
            setIsLoading(true);
            const { data, error } = await supabase
                .from("saved_arguments")
                .select("*")
                .order("updated_at", { ascending: false });

            if (error) {
                throw error;
            }

            // Transform the data format for the ArgumentList component
            const formattedArguments = data.map((arg) => ({
                id: arg.id,
                title: arg.title,
                lastModified: new Date(arg.updated_at),
                blocks: arg.content as unknown as ArgumentItem[],
            }));

            setSavedArguments(formattedArguments);

            // Update the limits after fetching arguments
            fetchArgumentLimits();
        } catch (error) {
            console.error("Error fetching arguments:", error);
            toast({
                title: "Error",
                description: "Failed to load your saved arguments",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateNew = () => {
        // Check if user has reached their limit before navigating
        if (argumentLimits.current >= argumentLimits.max) {
            toast({
                title: "Limit reached",
                description: "You've reached your saved arguments limit. Please upgrade your subscription to save more arguments.",
                variant: "destructive",
            });
            return;
        }
        navigate("/builder");
    };

    const handleLoadArgument = (id: string) => {
        navigate(`/builder?id=${id}`);
    };

    const handleDeleteArgument = async (id: string) => {
        try {
            const { error } = await supabase
                .from("saved_arguments")
                .delete()
                .eq("id", id);

            if (error) {
                throw error;
            }

            // Update the UI by filtering out the deleted argument
            setSavedArguments(savedArguments.filter(arg => arg.id !== id));
            // Update limits after deletion
            fetchArgumentLimits();

            toast({
                title: "Argument deleted",
                description: "Your argument has been permanently removed",
            });
        } catch (error) {
            console.error("Error deleting argument:", error);
            toast({
                title: "Error",
                description: "Failed to delete the argument",
                variant: "destructive",
            });
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1 py-12">
                <div className="container px-4">
                    {isLoading ? (
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <Skeleton className="h-8 w-40" />
                                <Skeleton className="h-10 w-32" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {[1, 2, 3].map((i) => (
                                    <Skeleton key={i} className="h-48 w-full" />
                                ))}
                            </div>
                        </div>
                    ) : (
                        <ArgumentList
                            argumentItems={savedArguments}
                            onCreateNew={handleCreateNew}
                            onLoadArgument={handleLoadArgument}
                            onDeleteArgument={handleDeleteArgument}
                            argumentLimits={argumentLimits}
                        />
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default MyArguments;
