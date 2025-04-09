
import { ArgumentAnalyzer } from "./ArgumentAnalyzer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/components/auth/AuthProvider";

interface AIAnalysisPanelProps {
    argumentBlocks: Array<{
        id: string;
        type: string;
        content: string;
    }>;
    onAddSuggestion: (type: string, content: string) => void;
}

export function AIAnalysisPanel({ argumentBlocks, onAddSuggestion }: AIAnalysisPanelProps) {
    const navigate = useNavigate();
    const { user } = useAuth();
    const loggedIn = !!user; // Use the actual auth state from AuthProvider

    if (!loggedIn) {
        return (
            <Card className="mb-6">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Lock className="h-5 w-5" />
                        <span>AI Analysis - Login Required</span>
                    </CardTitle>
                    <CardDescription>
                        Please log in to access AI-powered argument analysis
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                    <Lock className="h-16 w-16 text-muted-foreground/60 mb-4" />
                    <h3 className="text-lg font-medium mb-2">Authentication Required</h3>
                    <p className="text-muted-foreground mb-6 max-w-md">
                        To access our AI argument analysis features, please log in with your email address
                    </p>
                    <Button onClick={() => navigate('/auth')}>
                        Login to Continue
                    </Button>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="mb-6">
            <ArgumentAnalyzer
                argumentBlocks={argumentBlocks}
                onAddSuggestion={onAddSuggestion}
            />
        </div>
    );
}
