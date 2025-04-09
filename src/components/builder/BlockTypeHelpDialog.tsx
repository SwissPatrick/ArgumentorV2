
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface BlockTypeHelpDialogProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
}

export function BlockTypeHelpDialog({ isOpen, onOpenChange }: BlockTypeHelpDialogProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Argument Block Types</DialogTitle>
                    <DialogDescription>
                        Understanding the different components of an argument
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 my-4">
                    <div>
                        <h4 className="font-medium">Premise</h4>
                        <p className="text-sm text-muted-foreground">A basic statement or assumption that supports your main point. Premises form the foundation of your argument.</p>
                    </div>
                    <div>
                        <h4 className="font-medium">Evidence</h4>
                        <p className="text-sm text-muted-foreground">Facts, data, examples, or expert opinions that support your premises and strengthen your overall argument.</p>
                    </div>
                    <div>
                        <h4 className="font-medium">Objection</h4>
                        <p className="text-sm text-muted-foreground">A counterargument, potential weakness, or alternative viewpoint that challenges your position.</p>
                    </div>
                    <div>
                        <h4 className="font-medium">Rebuttal</h4>
                        <p className="text-sm text-muted-foreground">Your response to objections, defending your original argument and addressing counterpoints.</p>
                    </div>
                    <div>
                        <h4 className="font-medium">Conclusion</h4>
                        <p className="text-sm text-muted-foreground">The position you're arguing for, derived from your premises and evidence. The conclusion is what you want your audience to accept.</p>
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={() => onOpenChange(false)}>Close</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
