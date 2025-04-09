
import { Coins } from "lucide-react";
import { useState } from "react";

interface CreditsDisplayProps {
    basicCredits: number;
    advancedCredits: number;
    isLoading: boolean;
}

export function CreditsDisplay({ basicCredits, advancedCredits, isLoading }: CreditsDisplayProps) {
    return (
        <div className="flex flex-col gap-2 bg-muted/40 p-3 rounded-md">
            <span className="text-sm font-medium">Available Credits</span>
            <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center justify-between px-3 py-1.5 bg-background rounded">
                    <div className="flex items-center">
                        <Coins className="h-3.5 w-3.5 text-amber-400 mr-1.5" />
                        <span className="text-xs font-medium">Basic:</span>
                    </div>
                    {isLoading ? (
                        <span className="text-sm animate-pulse">...</span>
                    ) : (
                        <span className="text-sm">{basicCredits}</span>
                    )}
                </div>
                <div className="flex items-center justify-between px-3 py-1.5 bg-background rounded">
                    <div className="flex items-center">
                        <Coins className="h-3.5 w-3.5 text-purple-400 mr-1.5" />
                        <span className="text-xs font-medium">Advanced:</span>
                    </div>
                    {isLoading ? (
                        <span className="text-sm animate-pulse">...</span>
                    ) : (
                        <span className="text-sm">{advancedCredits}</span>
                    )}
                </div>
            </div>
        </div>
    );
}
