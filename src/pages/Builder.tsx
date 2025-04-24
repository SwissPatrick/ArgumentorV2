
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BuilderLayout } from "@/components/builder/BuilderLayout";
import { BuilderProvider } from "@/context/BuilderContext";
import { useAuth } from "@/components/auth/AuthProvider";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const Builder = () => {
    const { user, loading } = useAuth();
    const navigate = useNavigate();
    const [isInitializing, setIsInitializing] = useState(true);
    const redirectAttempted = useRef(false);
    const initTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        // Clear any existing timeout to prevent memory leaks
        if (initTimeoutRef.current) {
            clearTimeout(initTimeoutRef.current);
            initTimeoutRef.current = null;
        }

        // Safety timeout to prevent getting stuck
        const safetyTimeout = setTimeout(() => {
            setIsInitializing(false);
        }, 5000);

        initTimeoutRef.current = safetyTimeout;

        // Only proceed with checks if we haven't already redirected
        if (!loading && !redirectAttempted.current) {
            if (!user) {
                toast({
                    title: "Authentication required",
                    description: "Please log in to access the builder",
                });
                redirectAttempted.current = true;
                navigate(`/auth?redirectTo=${encodeURIComponent('/builder')}`, { replace: true });
                return;
            }

            // Add a slight delay to prevent flashing
            const timer = setTimeout(() => {
                setIsInitializing(false);
            }, 300);

            return () => {
                clearTimeout(timer);
            };
        }

        return () => {
            if (initTimeoutRef.current) {
                clearTimeout(initTimeoutRef.current);
                initTimeoutRef.current = null;
            }
        };
    }, [user, loading, navigate]);

    // Handle initial loading state
    if (loading || isInitializing) {
        return (
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-1 flex items-center justify-center">
                    <div className="flex flex-col items-center justify-center p-8">
                        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                        <h2 className="text-xl font-medium mb-2">Loading the Argument Builder</h2>
                        <p className="text-muted-foreground text-center">
                            Preparing your workspace...
                        </p>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    // No user, don't render anything as we're redirecting
    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
                <span className="text-muted-foreground">Redirecting to login...</span>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-background to-background/80">
            <Navbar />
            <main className="flex-1 py-6 md:py-8">
                <BuilderProvider>
                    <BuilderLayout />
                </BuilderProvider>
            </main>
            <Footer />
        </div>
    );
}

export default Builder;
