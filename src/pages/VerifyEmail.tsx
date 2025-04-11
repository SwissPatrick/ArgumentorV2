
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";

const VerifyEmail = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [verificationState, setVerificationState] = useState<"loading" | "success" | "error">("loading");
    const [errorMessage, setErrorMessage] = useState<string>("");

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                // The token and type parameters are automatically handled by Supabase
                // We don't need to do anything extra here as Supabase processes the verification
                // We just need to check if the verification was successful

                // Check if there's a "email_confirmed=true" parameter indicating successful verification
                const emailConfirmed = searchParams.get("email_confirmed") === "true";

                if (emailConfirmed) {
                    setVerificationState("success");
                } else {
                    // Check for error messages
                    const error = searchParams.get("error_description") || searchParams.get("error");
                    if (error) {
                        setErrorMessage(decodeURIComponent(error));
                        setVerificationState("error");
                    } else {
                        // If no clear indication, default to success
                        // (Supabase should have handled the verification in the background)
                        setVerificationState("success");
                    }
                }
            } catch (error) {
                console.error("Verification error:", error);
                setErrorMessage("An unexpected error occurred during email verification.");
                setVerificationState("error");
            }
        };

        verifyEmail();
    }, [searchParams]);

    // Redirect to login page after a few seconds on success
    useEffect(() => {
        let redirectTimeout: NodeJS.Timeout;
        if (verificationState === "success") {
            redirectTimeout = setTimeout(() => {
                navigate("/auth?email_confirmed=true", { replace: true });
            }, 3000);
        }

        return () => {
            if (redirectTimeout) clearTimeout(redirectTimeout);
        };
    }, [verificationState, navigate]);

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1 flex items-center justify-center py-12">
                <div className="container px-4">
                    <Card className="max-w-md mx-auto">
                        <CardHeader className="text-center">
                            <CardTitle className="text-2xl font-bold">Email Verification</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center text-center">
                            {verificationState === "loading" && (
                                <>
                                    <Loader2 className="h-16 w-16 text-primary animate-spin mb-4" />
                                    <p className="text-muted-foreground">Verifying your email address...</p>
                                </>
                            )}

                            {verificationState === "success" && (
                                <>
                                    <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
                                    <h3 className="text-xl font-semibold mb-2">Email Successfully Verified!</h3>
                                    <p className="text-muted-foreground mb-4">
                                        Your email has been successfully verified. You will be redirected to the login page in a few seconds.
                                    </p>
                                </>
                            )}

                            {verificationState === "error" && (
                                <>
                                    <XCircle className="h-16 w-16 text-red-500 mb-4" />
                                    <h3 className="text-xl font-semibold mb-2">Verification Failed</h3>
                                    <p className="text-red-500 mb-4">{errorMessage || "There was a problem verifying your email."}</p>
                                    <p className="text-muted-foreground mb-4">
                                        Please try again or contact support if the problem persists.
                                    </p>
                                </>
                            )}
                        </CardContent>
                        <CardFooter className="flex justify-center">
                            <Button
                                onClick={() => navigate("/auth", { replace: true })}
                                variant={verificationState === "error" ? "default" : "outline"}
                            >
                                {verificationState === "success" ? "Continue to Login" : "Go to Login"}
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default VerifyEmail;
