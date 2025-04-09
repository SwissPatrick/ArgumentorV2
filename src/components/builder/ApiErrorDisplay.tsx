
import { Card, CardContent } from "@/components/ui/card";

interface ApiErrorDisplayProps {
    error: string;
}

export function ApiErrorDisplay({ error }: ApiErrorDisplayProps) {
    return (
        <Card className="mb-6 border bg-card/90 backdrop-blur-sm shadow-md">
            <CardContent className="p-5">
                <div className="p-8 text-center space-y-4">
                    <h2 className="text-2xl font-semibold text-destructive">API Connection Error</h2>
                    <p className="text-muted-foreground">{error}</p>
                    <div className="bg-amber-50 border border-amber-200 p-4 rounded-md text-amber-800 text-sm mt-4">
                        <p>To fix this issue:</p>
                        <ol className="list-decimal list-inside mt-2 space-y-1 text-left">
                            <li>Make sure your VITE_API_URL environment variable is set</li>
                            <li>Create a .env.development.local file in your project root</li>
                            <li>Add the line: VITE_API_URL=https://your-api-url.com</li>
                            <li>Restart your development server</li>
                        </ol>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
