
import { AlertTriangle, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface Fallacy {
    block?: string;
    type: string;
    description: string;
}

interface FallaciesListProps {
    fallacies: Fallacy[];
}

export function FallaciesList({ fallacies }: FallaciesListProps) {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    if (!fallacies || fallacies.length === 0) return null;

    return (
        <div>
            <h3 className="font-semibold flex items-center gap-2 mb-3">
                <div className="bg-amber-100 p-1 rounded-full">
                    <AlertTriangle className="h-4 w-4 text-amber-600" />
                </div>
                <span>Potential Fallacies</span>
                <span className="text-xs text-muted-foreground ml-2 bg-muted px-2 py-0.5 rounded-full">
          {fallacies.length}
        </span>
            </h3>
            <div className="space-y-3">
                {fallacies.map((fallacy, i) => (
                    <div
                        key={i}
                        className={cn(
                            "border border-amber-200 overflow-hidden rounded-md transition-all duration-200",
                            expandedIndex === i ? "bg-amber-50" : "bg-white hover:bg-amber-50/50"
                        )}
                    >
                        <div
                            className="flex items-center justify-between p-3 cursor-pointer"
                            onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
                        >
                            <div className="font-medium text-amber-800">{fallacy.type}</div>
                            <button className="text-amber-600 p-1 rounded-full hover:bg-amber-100">
                                {expandedIndex === i ?
                                    <ChevronUp className="h-4 w-4" /> :
                                    <ChevronDown className="h-4 w-4" />
                                }
                            </button>
                        </div>
                        <div className={cn(
                            "text-muted-foreground text-sm px-3 pb-3 transition-all",
                            expandedIndex === i ? "block" : "hidden"
                        )}>
                            <p>{fallacy.description}</p>
                            {fallacy.block && (
                                <div className="mt-2 p-2 border border-amber-100 bg-amber-50 rounded text-xs italic">
                                    <div className="text-xs font-medium text-amber-800 mb-1">Found in:</div>
                                    <div>"{fallacy.block.slice(0, 100)}{ fallacy.block.length > 100 ? '...' : '' }"</div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
