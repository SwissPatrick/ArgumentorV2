
import { ReactNode, useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/components/auth/AuthProvider";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
    children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, loading, userIsEmailVerified } = useAuth();
    const [isChecking, setIsChecking] = useState(true);
    const hasRedirected = useRef(false);
    const hasShownToast = useRef(false);

    useEffect(() => {
        // Add more detailed logging to trace the flow
        console.log("Protected route - Auth state:", {
            loading,
            user: user ? "User present" : "No user",
            verified: userIsEmailVerified,
            path: location.pathname,
            isChecking
        });

        let redirectTimeout: NodeJS.Timeout;
        let safetyTimeout: NodeJS.Timeout;

        // Only proceed if we aren't in the middle of checking already
        if (hasRedirected.current) {
            return;
        }

        // Safety timeout - prevent infinite loading state
        safetyTimeout = setTimeout(() => {
            console.log("Protected route - Safety timeout triggered");
            setIsChecking(false);

            // If after 5 seconds we're still not sure about auth, redirect to auth page
            if (loading && !hasRedirected.current) {
                console.log("Protected route - Auth still loading after timeout, redirecting to auth");
                hasRedirected.current = true;
                navigate(`/auth?redirectTo=${encodeURIComponent(location.pathname)}`, { replace: true });
            }
        }, 5000); // Reduced from 10000 to 5000ms

        // Only check auth when auth loading is complete
        if (!loading) {
            if (!user && !hasRedirected.current) {
                console.log("No user found, redirecting to auth page");
                if (!hasShownToast.current) {
                    toast({
                        title: "Authentication required",
                        description: "Please log in to access this page",
                        variant: "destructive",
                    });
                    hasShownToast.current = true;
                }

                // Redirect to auth page with current path as redirect target
                hasRedirected.current = true;
                navigate(`/auth?redirectTo=${encodeURIComponent(location.pathname)}`, { replace: true });
            } else if (user && !userIsEmailVerified && !hasRedirected.current) {
                console.log("Email not verified, redirecting to auth page");
                if (!hasShownToast.current) {
                    toast({
                        title: "Email verification required",
                        description: "Please verify your email address before accessing this page",
                        variant: "destructive",
                    });
                    hasShownToast.current = true;
                }
                hasRedirected.current = true;
                navigate('/auth', { replace: true });
            } else if (user && userIsEmailVerified) {
                // User is authenticated and email is verified, render children
                console.log("User is authenticated and verified, rendering protected content");
            }

            // Set a short timeout to prevent UI flashing regardless of auth result
            redirectTimeout = setTimeout(() => {
                setIsChecking(false);
            }, 300);
        }

        return () => {
            if (redirectTimeout) clearTimeout(redirectTimeout);
            if (safetyTimeout) clearTimeout(safetyTimeout);
        };
    }, [user, loading, navigate, location.pathname, userIsEmailVerified]);

    // Show loading state when auth is loading or checking
    if (loading || isChecking) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
                <span className="text-muted-foreground">Checking authentication...</span>
                <span className="text-xs text-muted-foreground mt-2">If this takes too long, try refreshing the page</span>
            </div>
        );
    }

    // Only render children if authenticated and verified
    return user && userIsEmailVerified ? <>{children}</> : null;
}
