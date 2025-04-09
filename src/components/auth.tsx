
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/auth/AuthProvider";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { Crown, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";

interface AuthProps {
    onLoginSuccess?: () => void;
}

export function Auth({ onLoginSuccess }: AuthProps) {
    const { user, signOut, isAdmin, loading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    useEffect(() => {
        console.log("Auth component - Auth state:", {
            loading,
            user: user ? "User present" : "No user",
            path: location.pathname
        });
    }, [user, loading, location.pathname]);

    const handleLoginClick = () => {
        // Store the current path for redirect after login
        const currentPath = window.location.pathname;
        console.log("Auth component - Navigating to login, current path:", currentPath);

        if (currentPath !== '/auth') {
            navigate(`/auth?redirectTo=${encodeURIComponent(currentPath)}`);
        } else {
            navigate('/auth');
        }
    };

    const handleLogout = async () => {
        try {
            setIsLoggingOut(true);
            console.log("Auth component - Logging out");
            await signOut();

            // If there was a login success callback, we can assume this component
            // is being used in a flow that might need to be updated after logout
            if (onLoginSuccess) {
                onLoginSuccess();
            }

            // After logout, navigate to home page
            navigate('/', { replace: true });

            toast({
                title: "Logged out successfully",
                description: "You have been logged out of your account",
            });
        } catch (error) {
            console.error("Error signing out:", error);
            // No need to show toast here as it's already handled in the AuthProvider
        } finally {
            setIsLoggingOut(false);
        }
    };

    // If auth is still loading, show a loading indicator
    if (loading) {
        return (
            <Button variant="outline" disabled>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Loading...
            </Button>
        );
    }

    if (!user) {
        return (
            <Button variant="outline" onClick={handleLoginClick}>
                Login
            </Button>
        );
    }

    return (
        <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">
        {user.email}
          {isAdmin && (
              <Badge variant="outline" className="ml-2 bg-amber-50 text-amber-700 border-amber-200">
                  <Crown className="h-3 w-3 mr-1" />
                  Admin
              </Badge>
          )}
      </span>
            <Button variant="outline" size="sm" onClick={handleLogout} disabled={isLoggingOut}>
                {isLoggingOut ? (
                    <>
                        <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                        Logging out...
                    </>
                ) : (
                    "Logout"
                )}
            </Button>
        </div>
    );
}
