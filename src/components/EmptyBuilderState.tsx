
import { Button } from "@/components/ui/button";
import { Plus, FileText } from "lucide-react";

interface EmptyBuilderStateProps {
    onAddBlock: () => void;
    onUseTemplate: () => void;
}

export function EmptyBuilderState({ onAddBlock, onUseTemplate }: EmptyBuilderStateProps) {
    return (
        <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg bg-muted/20 min-h-[300px] text-center">
            <h3 className="text-xl font-medium mb-3">Start Building Your Argument</h3>
            <p className="text-muted-foreground mb-6 max-w-md">
                Add blocks to structure your argument with claims, evidence, and more.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
                <Button onClick={onAddBlock} className="flex-1">
                    <Plus className="mr-2 h-4 w-4" />
                    Add First Block
                </Button>
                <Button variant="outline" onClick={onUseTemplate} className="flex-1">
                    <FileText className="mr-2 h-4 w-4" />
                    Use a Template
                </Button>
            </div>
        </div>
    );
}
