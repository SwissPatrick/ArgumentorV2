
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface EmptyBuilderStateProps {
    onStartNew: () => void;
}

export function EmptyBuilderState({ onStartNew }: EmptyBuilderStateProps) {
    const handleClick = () => {
        console.log("EmptyBuilderState button clicked");
        onStartNew();
    };

    return (
        <div className="flex flex-col items-center justify-center py-12 text-center border-2 border-dashed border-muted-foreground/20 rounded-lg">
            <div className="h-20 w-20 bg-muted/40 rounded-full flex items-center justify-center mb-6">
                <Plus className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-medium mb-2">Start Building Your Argument</h3>
            <p className="text-muted-foreground mb-6 max-w-md px-4">
                Add premises, evidence, and conclusions to construct a logical, well-structured argument
            </p>
            <Button
                size="lg"
                onClick={handleClick}
                className="gap-2"
            >
                <Plus className="h-4 w-4" /> Add Your First Block
            </Button>
        </div>
    );
}
