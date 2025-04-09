
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "./AuthProvider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

// Password validation regex
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [emailVerificationSent, setEmailVerificationSent] = useState(false);
    const { signIn, signUp } = useAuth();

    const validatePassword = (password: string) => {
        if (password.length < 8) {
            return "Password must be at least 8 characters long";
        }
        if (!PASSWORD_REGEX.test(password)) {
            return "Password must include uppercase, lowercase, number, and special character";
        }
        return "";
    };

    useEffect(() => {
        if (password) {
            setPasswordError(validatePassword(password));
        } else {
            setPasswordError("");
        }
    }, [password]);

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await signIn(email, password);
        } catch (error: any) {
            // Handle authentication errors
            let errorMessage = error.message;

            // Check for specific error messages from Supabase
            if (errorMessage.includes("Email not confirmed")) {
                errorMessage = "Please verify your email before logging in. Check your inbox for a verification link.";
                setEmailVerificationSent(true);
            } else if (errorMessage.includes("Invalid login credentials")) {
                errorMessage = "Incorrect email or password. Please try again.";
            }

            toast({
                title: "Login failed",
                description: errorMessage,
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validate password on submission too
        const error = validatePassword(password);
        if (error) {
            setPasswordError(error);
            toast({
                title: "Invalid password",
                description: error,
                variant: "destructive",
            });
            return;
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            toast({
                title: "Passwords don't match",
                description: "Please make sure your passwords match",
                variant: "destructive",
            });
            return;
        }

        setIsSubmitting(true);

        try {
            await signUp(email, password);
            setEmailVerificationSent(true);
        } catch (error: any) {
            let errorMessage = error.message;

            // Handle specific Supabase errors
            if (errorMessage.includes("already registered")) {
                errorMessage = "This email is already registered. Please try logging in instead.";
            } else if (errorMessage.includes("Database error")) {
                errorMessage = "There was a problem creating your account. Please try again later.";
            }

            toast({
                title: "Sign up failed",
                description: errorMessage,
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Card className="w-full max-w-md mx-auto">
            <Tabs defaultValue="login">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Access your account</CardTitle>
                        <TabsList>
                            <TabsTrigger value="login">Login</TabsTrigger>
                            <TabsTrigger value="signup">Sign Up</TabsTrigger>
                        </TabsList>
                    </div>
                    <CardDescription>
                        Enter your details to access Argumentor
                    </CardDescription>
                </CardHeader>

                {emailVerificationSent && (
                    <Alert className="mx-6 mb-4">
                        <InfoIcon className="h-4 w-4" />
                        <AlertDescription>
                            We've sent a verification email to <strong>{email}</strong>.
                            Please check your inbox and verify your email before logging in.
                        </AlertDescription>
                    </Alert>
                )}

                <TabsContent value="login">
                    <form onSubmit={handleLogin}>
                        <CardContent>
                            <div className="grid gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="email-login">Email</Label>
                                    <Input
                                        id="email-login"
                                        type="email"
                                        placeholder="name@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        autoComplete="email"
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="password-login">Password</Label>
                                    <Input
                                        id="password-login"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        autoComplete="current-password"
                                    />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Signing in..." : "Sign In"}
                            </Button>
                        </CardFooter>
                    </form>
                </TabsContent>

                <TabsContent value="signup">
                    <form onSubmit={handleSignUp}>
                        <CardContent>
                            <div className="grid gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="email-signup">Email</Label>
                                    <Input
                                        id="email-signup"
                                        type="email"
                                        placeholder="name@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        autoComplete="email"
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="password-signup">Password</Label>
                                    <Input
                                        id="password-signup"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        autoComplete="new-password"
                                    />
                                    {passwordError && (
                                        <p className="text-sm text-red-500">{passwordError}</p>
                                    )}
                                    <p className="text-xs text-muted-foreground">
                                        Password must be at least 8 characters and include uppercase, lowercase, number, and special character.
                                    </p>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="confirm-password">Confirm Password</Label>
                                    <Input
                                        id="confirm-password"
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                        autoComplete="new-password"
                                    />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Creating account..." : "Create Account"}
                            </Button>
                        </CardFooter>
                    </form>
                </TabsContent>
            </Tabs>
        </Card>
    );
}
