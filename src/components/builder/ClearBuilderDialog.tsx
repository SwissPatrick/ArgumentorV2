
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertCircle } from "lucide-react";

interface ClearBuilderDialogProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    onClear: () => void;
}

export function ClearBuilderDialog({ isOpen, onOpenChange, onClear }: ClearBuilderDialogProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <AlertCircle className="h-5 w-5 text-destructive" />
                        Clear All Content?
                    </DialogTitle>
                    <DialogDescription>
                        This will remove all argument blocks and reset the title. This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex items-center justify-end space-x-2">
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button variant="destructive" onClick={onClear}>
                        Yes, Clear Everything
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
