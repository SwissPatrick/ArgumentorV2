
import { createContext, useContext, useEffect, useState, useRef } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

type AuthContextType = {
    session: Session | null;
    user: User | null;
    loading: boolean;
    signIn: (email: string, password?: string) => Promise<void>;
    signUp: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
    userIsEmailVerified: boolean;
    isAdmin: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom auth configuration with shorter session duration
// Supabase default is 1 week, we'll set it to 8 hours (28800 seconds)
const AUTH_SESSION_EXPIRY = 28800;

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [session, setSession] = useState<Session | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [userIsEmailVerified, setUserIsEmailVerified] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [adminCheckAttempted, setAdminCheckAttempted] = useState(false);
    const adminCheckInProgress = useRef(false);

    // Check if a user is an admin - now uses the cached email or default to false
    const checkIsAdmin = async (userEmail?: string | null) => {
        if (!userEmail || adminCheckInProgress.current) return false;

        try {
            // Set the admin check flag to prevent multiple simultaneous calls
            adminCheckInProgress.current = true;
            console.log("AuthProvider - Checking admin status for:", userEmail);

            // Set a timeout to prevent hanging indefinitely
            const timeoutPromise = new Promise<{data?: {isAdmin: boolean}, error?: Error}>((resolve) => {
                setTimeout(() => {
                    console.log("AuthProvider - Admin check timed out after 5 seconds");
                    resolve({ data: { isAdmin: false }, error: new Error("Timeout") });
                }, 5000);
            });

            // Call the check-admin edge function to verify if the user is an admin
            const functionPromise = supabase.functions.invoke('check-admin', {
                body: { email: userEmail.toLowerCase() }
            });

            // Race the function call with the timeout
            const result = await Promise.race([functionPromise, timeoutPromise]);

            if (result.error) {
                console.error("Error checking admin status:", result.error);
                return false;
            }

            console.log("AuthProvider - Admin check result:", result.data?.isAdmin || false);
            return result.data?.isAdmin || false;
        } catch (error) {
            console.error("Error invoking check-admin function:", error);
            return false;
        } finally {
            adminCheckInProgress.current = false;
            setAdminCheckAttempted(true);
        }
    };

    useEffect(() => {
        console.log("AuthProvider - Initializing auth state");
        let didCancel = false;

        // Set up auth state listener first
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (event, newSession) => {
                console.log("AuthProvider - Auth state changed:", event);

                if (didCancel) return;

                // Only update state if values are different to avoid unnecessary renders
                if (newSession?.user?.id !== user?.id) {
                    setSession(newSession);
                    setUser(newSession?.user ?? null);
                    setUserIsEmailVerified(!!newSession?.user?.email_confirmed_at);
                }

                // Check admin status if user is logged in - Wrap in setTimeout to avoid React errors
                if (newSession?.user?.email && !adminCheckInProgress.current) {
                    setTimeout(async () => {
                        if (didCancel) return;
                        const adminStatus = await checkIsAdmin(newSession.user?.email);
                        setIsAdmin(adminStatus);
                    }, 0);
                } else if (!newSession?.user) {
                    setIsAdmin(false);
                }
            }
        );

        // Then check for existing session - only if we haven't loaded it already
        const checkForExistingSession = async () => {
            try {
                console.log("AuthProvider - Checking for existing session");
                const { data } = await supabase.auth.getSession();

                if (didCancel) return;

                // Update state with session data
                setSession(data.session);
                setUser(data.session?.user ?? null);
                setUserIsEmailVerified(!!data.session?.user?.email_confirmed_at);

                // Check admin status if user is logged in
                if (data.session?.user?.email && !adminCheckInProgress.current) {
                    const adminStatus = await checkIsAdmin(data.session.user.email);
                    if (!didCancel) {
                        setIsAdmin(adminStatus);
                    }
                }

                // Always complete loading after session check
                if (!didCancel) {
                    setLoading(false);
                }

                console.log("AuthProvider - Session check complete:", {
                    hasSession: !!data.session,
                    userVerified: !!data.session?.user?.email_confirmed_at
                });
            } catch (error) {
                console.error("Error checking session:", error);
                if (!didCancel) {
                    setLoading(false);
                }
            }
        };

        checkForExistingSession();

        // Safety timeout - ensure loading state completes even if something goes wrong
        const safetyTimeout = setTimeout(() => {
            if (!didCancel && loading) {
                console.log("AuthProvider - Safety timeout triggered to complete loading");
                setLoading(false);
            }
        }, 5000); // Reduced from 8000 to 5000ms for faster response

        return () => {
            didCancel = true;
            subscription.unsubscribe();
            clearTimeout(safetyTimeout);
        };
    }, []);

    const signIn = async (email: string, password?: string) => {
        try {
            console.log("AuthProvider - Attempting sign in for:", email);
            let response;

            if (password) {
                // Sign in with email and password
                response = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
            } else {
                // Sign in with OTP (magic link) as fallback
                response = await supabase.auth.signInWithOtp({
                    email,
                    options: {
                        emailRedirectTo: window.location.origin,
                    },
                });

                if (!response.error) {
                    toast({
                        title: "Check your email",
                        description: "We've sent you a login link",
                    });
                    return;
                }
            }

            if (response.error) {
                console.error("AuthProvider - Sign in error:", response.error);
                throw response.error;
            }

            // Check if email is verified
            if (response.data.user && !response.data.user.email_confirmed_at) {
                console.log("AuthProvider - Email not confirmed");
                throw new Error("Email not confirmed. Please check your inbox for verification instructions.");
            }

            if (response.data.session) {
                console.log("AuthProvider - Sign in successful");
                toast({
                    title: "Authentication successful",
                    description: "You are now signed in",
                });
            }
        } catch (error: any) {
            console.error("Error signing in:", error);
            throw error;
        }
    };

    const signUp = async (email: string, password: string) => {
        try {
            const { error, data } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    emailRedirectTo: `${window.location.origin}/auth`,
                    data: {
                        signUpDate: new Date().toISOString(),
                    }
                },
            });

            if (error) {
                throw error;
            }

            // Show a success message with a clear next step
            toast({
                title: "Account created successfully",
                description: "Please check your email to verify your account before logging in.",
            });

            return;
        } catch (error: any) {
            console.error("Error signing up:", error);

            // More specific error message for database errors
            if (error.message?.includes("Database error")) {
                toast({
                    title: "Sign up error",
                    description: "There was a problem creating your account. Please try again or contact support.",
                    variant: "destructive",
                });
            }

            throw error;
        }
    };

    const signOut = async () => {
        try {
            // Check if we have a session before trying to sign out
            const { data } = await supabase.auth.getSession();

            if (!data.session) {
                // If no session exists, just clear local state without calling signOut API
                setUser(null);
                setSession(null);
                toast({
                    title: "Signed out",
                    description: "You have been successfully signed out",
                });
                return;
            }

            console.log("AuthProvider - Signing out");
            // If we have a session, proceed with normal signOut
            const { error } = await supabase.auth.signOut();
            if (error) {
                throw error;
            }

            // Clear user and session state after successful signout
            setUser(null);
            setSession(null);

            toast({
                title: "Signed out",
                description: "You have been successfully signed out",
            });
        } catch (error: any) {
            console.error("Error during sign out:", error);
            // Even if there's an error, we should still clear the local state
            setUser(null);
            setSession(null);

            toast({
                title: "Error signing out",
                description: "You've been signed out locally, but there was an issue with the server",
                variant: "destructive",
            });
        }
    };

    return (
        <AuthContext.Provider value={{
            session,
            user,
            loading,
            signIn,
            signUp,
            signOut,
            userIsEmailVerified,
            isAdmin
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}