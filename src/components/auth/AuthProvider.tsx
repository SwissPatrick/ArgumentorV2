import { createContext, useContext, useEffect, useState, useRef } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

type AuthContextType = {
    session: Session | null;
    user: User | null;
    loading: boolean;
    signIn: (email: string, password?: string) => Promise<void>;
    signUp: (email: string, password: string, options?: Record<string, any>) => Promise<void>;
    signOut: () => Promise<void>;
    userIsEmailVerified: boolean;
    isAdmin: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_SESSION_EXPIRY = 28800;

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [session, setSession] = useState<Session | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [userIsEmailVerified, setUserIsEmailVerified] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [adminCheckAttempted, setAdminCheckAttempted] = useState(false);
    const adminCheckInProgress = useRef(false);

    const checkIsAdmin = async (userEmail?: string | null) => {
        if (!userEmail || adminCheckInProgress.current) return false;

        try {
            adminCheckInProgress.current = true;
            console.log("AuthProvider - Checking admin status for:", userEmail);

            const timeoutPromise = new Promise<{data?: {isAdmin: boolean}, error?: Error}>((resolve) => {
                setTimeout(() => {
                    console.log("AuthProvider - Admin check timed out after 5 seconds");
                    resolve({ data: { isAdmin: false }, error: new Error("Timeout") });
                }, 5000);
            });

            const functionPromise = supabase.functions.invoke('check-admin', {
                body: { email: userEmail.toLowerCase() }
            });

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

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (event, newSession) => {
                console.log("AuthProvider - Auth state changed:", event);

                if (didCancel) return;

                if (newSession?.user?.id !== user?.id) {
                    setSession(newSession);
                    setUser(newSession?.user ?? null);
                    setUserIsEmailVerified(!!newSession?.user?.email_confirmed_at);
                }

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

        const checkForExistingSession = async () => {
            try {
                console.log("AuthProvider - Checking for existing session");
                const { data } = await supabase.auth.getSession();

                if (didCancel) return;

                setSession(data.session);
                setUser(data.session?.user ?? null);
                setUserIsEmailVerified(!!data.session?.user?.email_confirmed_at);

                if (data.session?.user?.email && !adminCheckInProgress.current) {
                    const adminStatus = await checkIsAdmin(data.session.user.email);
                    if (!didCancel) {
                        setIsAdmin(adminStatus);
                    }
                }

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

        const safetyTimeout = setTimeout(() => {
            if (!didCancel && loading) {
                console.log("AuthProvider - Safety timeout triggered to complete loading");
                setLoading(false);
            }
        }, 5000);

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
                response = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
            } else {
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

    const signUp = async (email: string, password: string, options?: Record<string, any>) => {
        try {
            console.log("AuthProvider - Attempting sign up for:", email, "with options:", options);

            const signUpOptions = {
                email,
                password,
                options: {
                    emailRedirectTo: `${window.location.origin}/auth?email_confirmed=true`,
                    data: {
                        signUpDate: new Date().toISOString(),
                    }
                },
            };

            const { error, data } = await supabase.auth.signUp(signUpOptions);

            if (error) {
                console.error("AuthProvider - Sign up error:", error);
                throw error;
            }

            console.log("AuthProvider - Sign up successful:", data);

            if (options?.referralCode && data.user) {
                localStorage.setItem('pending_referral_code', options.referralCode);
                console.log("Saved referral code for later application:", options.referralCode);
            }

            toast({
                title: "Account created successfully",
                description: "Please check your email to verify your account before logging in.",
            });

            return;
        } catch (error: any) {
            console.error("Error signing up:", error);

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
            const { data } = await supabase.auth.getSession();

            if (!data.session) {
                setUser(null);
                setSession(null);
                toast({
                    title: "Signed out",
                    description: "You have been successfully signed out",
                });
                return;
            }

            console.log("AuthProvider - Signing out");
            const { error } = await supabase.auth.signOut();
            if (error) {
                throw error;
            }

            setUser(null);
            setSession(null);

            toast({
                title: "Signed out",
                description: "You have been successfully signed out",
            });
        } catch (error: any) {
            console.error("Error during sign out:", error);
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
