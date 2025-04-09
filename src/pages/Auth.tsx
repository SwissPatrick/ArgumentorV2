
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LoginForm } from "@/components/auth/LoginForm";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/components/auth/AuthProvider";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2, Info } from "lucide-react";

const Auth = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { user, loading, userIsEmailVerified } = useAuth();
    const redirectTo = searchParams.get("redirectTo") || "/";

    // Check for email verification success parameter
    const emailVerified = searchParams.get("email_confirmed") === "true";

    // Redirect if already logged in and email is verified
    useEffect(() => {
        if (!loading && user && userIsEmailVerified) {
            toast({
                title: "Already logged in",
                description: "You are already signed in",
            });

            // Use path from URL or default to home
            console.log("Redirecting authenticated user to:", redirectTo);
            navigate(redirectTo, { replace: true });
        }
    }, [user, loading, navigate, redirectTo, userIsEmailVerified]);

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1 flex items-center justify-center py-12">
                <div className="container px-4">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold">Welcome to Argumentor</h1>
                        <p className="text-muted-foreground mt-2">
                            Sign in or create an account to access your account and build powerful arguments
                        </p>
                    </div>

                    {emailVerified && (
                        <Alert className="max-w-md mx-auto mb-6 bg-green-50 border-green-200">
                            <CheckCircle2 className="h-5 w-5 text-green-600" />
                            <AlertTitle className="text-green-700">Email verified!</AlertTitle>
                            <AlertDescription className="text-green-600">
                                Your email has been successfully verified. You can now log in to your account.
                            </AlertDescription>
                        </Alert>
                    )}

                    {user && !userIsEmailVerified && (
                        <Alert className="max-w-md mx-auto mb-6 bg-amber-50 border-amber-200">
                            <Info className="h-5 w-5 text-amber-600" />
                            <AlertTitle className="text-amber-700">Email verification required</AlertTitle>
                            <AlertDescription className="text-amber-600">
                                Please check your inbox and click the verification link to complete your registration.
                            </AlertDescription>
                        </Alert>
                    )}

                    <LoginForm />

                    <div className="text-center mt-6 max-w-md mx-auto text-sm text-muted-foreground">
                        <p>By signing up, you agree to our <a href="/terms" className="underline">Terms of Service</a> and <a href="/privacy" className="underline">Privacy Policy</a>.</p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Auth;
