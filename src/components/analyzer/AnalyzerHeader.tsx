
import { Brain, ChevronDown, ChevronUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { Lock } from "lucide-react";

interface AnalyzerHeaderProps {
    isPremiumUser: boolean;
    isCollapsed: boolean;
    toggleCollapse: () => void;
}

export function AnalyzerHeader({ isPremiumUser, isCollapsed, toggleCollapse }: AnalyzerHeaderProps) {
    return (
        <div className="flex flex-row items-center justify-between py-4 space-y-0">
            <div className="flex items-center gap-2">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-1.5 rounded-md">
                    <Brain className="h-5 w-5 text-white" />
                </div>
                <div>
                    <CardTitle className="flex items-center gap-2">
                        <span>AI Argument Analysis</span>
                        {!isPremiumUser && (
                            <Badge variant="outline" className="ml-2 text-amber-600 border-amber-200 bg-amber-50">
                                <Lock className="h-3 w-3 mr-1" /> Premium
                            </Badge>
                        )}
                    </CardTitle>
                    <CardDescription className="mt-1">
                        {isPremiumUser
                            ? "Get AI-powered analysis and improvement suggestions"
                            : "Upgrade to premium for complete argument analysis"
                        }
                    </CardDescription>
                </div>
            </div>
            <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={toggleCollapse}
            >
                {isCollapsed ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
            </Button>
        </div>
    );
}
