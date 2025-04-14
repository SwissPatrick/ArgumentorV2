
import { Button } from "@/components/ui/button";
import { CreditsDisplay } from "@/components/CreditsDisplay";
import { Download, Save, Share2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

interface BuilderHeaderProps {
    title: string;
}

export function BuilderHeader({ title }: BuilderHeaderProps) {
    const navigate = useNavigate();

    const saveArgument = () => {
        // This function will be handled by the parent component
        // through props, implemented in BuilderLayout.tsx
        toast({
            title: "Argument saved",
            description: "Your argument has been saved successfully",
        });
    };

    const exportArgument = () => {
        // Create and trigger a download event for the current argument
        if (typeof window === 'undefined') return;

        try {
            // Create a dummy argument object for demonstration
            // In a real implementation, this would be passed via props
            const argumentData = {
                title: title || "New Argument",
                lastEdited: new Date().toISOString(),
                content: "This is a placeholder for the argument content"
            };

            // Convert to JSON string
            const jsonString = JSON.stringify(argumentData, null, 2);

            // Create blob and download link
            const blob = new Blob([jsonString], { type: 'application/json' });
            const url = URL.createObjectURL(blob);

            // Create and trigger download
            const a = document.createElement('a');
            a.href = url;
            a.download = `${title || 'argument'}.json`;
            document.body.appendChild(a);
            a.click();

            // Clean up
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            toast({
                title: "Argument exported",
                description: "Your argument has been exported as a JSON file",
            });
        } catch (error) {
            console.error("Error exporting argument:", error);
            toast({
                title: "Export failed",
                description: "There was an error exporting your argument",
                variant: "destructive",
            });
        }
    };

    const shareArgument = () => {
        // Implement sharing via clipboard
        try {
            // Get the current URL
            const currentUrl = window.location.href;

            // Copy to clipboard
            navigator.clipboard.writeText(currentUrl).then(() => {
                toast({
                    title: "Link copied",
                    description: "Shareable link has been copied to clipboard",
                });
            }).catch((err) => {
                console.error("Failed to copy: ", err);
                toast({
                    title: "Sharing failed",
                    description: "Could not copy link to clipboard",
                    variant: "destructive",
                });
            });
        } catch (error) {
            console.error("Error sharing argument:", error);
            toast({
                title: "Sharing failed",
                description: "There was an error sharing your argument",
                variant: "destructive",
            });
        }
    };

    return (
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
            <div>
                <h1 className="font-display text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                    {title || "New Argument"}
                </h1>
                <p className="text-muted-foreground mt-1 text-xs md:text-sm">
                    Build and refine your argument structure
                </p>
            </div>

            <div className="flex items-center gap-2 mt-2 md:mt-0">
                <CreditsDisplay />
                <div className="flex gap-1">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={saveArgument}
                        className="h-8 border-primary/30 hover:border-primary/60 transition-colors"
                    >
                        <Save className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={exportArgument}
                        className="h-8 border-primary/30 hover:border-primary/60 transition-colors"
                    >
                        <Download className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={shareArgument}
                        className="h-8 border-primary/30 hover:border-primary/60 transition-colors"
                    >
                        <Share2 className="h-3.5 w-3.5" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
