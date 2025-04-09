
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
    const location = useLocation();

    useEffect(() => {
        console.error(
            "404 Error: User attempted to access non-existent route:",
            location.pathname
        );
    }, [location.pathname]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-muted/30">
            <div className="text-center max-w-md px-4">
                <h1 className="text-5xl font-bold text-primary mb-4">404</h1>
                <p className="text-xl text-muted-foreground mb-8">
                    The page you're looking for doesn't exist or has been moved.
                </p>
                <Button asChild className="button-hover">
                    <Link to="/">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Return to Home
                    </Link>
                </Button>
            </div>
        </div>
    );
};

export default NotFound;
