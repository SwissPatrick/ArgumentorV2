
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { HelpCircle } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { BlockTypeHelpDialog } from "./BlockTypeHelpDialog";

interface AddBlockDialogProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    onAddBlock: (type: string, content: string) => void;
}

export function AddBlockDialog({ isOpen, onOpenChange, onAddBlock }: AddBlockDialogProps) {
    const [newBlockType, setNewBlockType] = useState<string>("premise");
    const [newBlockContent, setNewBlockContent] = useState("");
    const [isBlockTypeHelpOpen, setIsBlockTypeHelpOpen] = useState(false);

    const getBlockTypeDescription = (type: string) => {
        switch(type) {
            case "premise":
                return "A basic statement or assumption that supports your main point.";
            case "conclusion":
                return "The position you're arguing for, derived from your premises.";
            case "evidence":
                return "Facts, data, or examples that support your premises.";
            case "objection":
                return "A counterargument or potential weakness in your reasoning.";
            case "rebuttal":
                return "Your response to objections, defending your original argument.";
            default:
                return "A component of your argument structure.";
        }
    };

    const handleAddBlock = () => {
        onAddBlock(newBlockType, newBlockContent);
        setNewBlockContent("");
    };

    return (
        <>
            <Dialog open={isOpen} onOpenChange={onOpenChange}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Add Argument Block</DialogTitle>
                        <DialogDescription>
                            Create a new component for your argument structure.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-medium">Block Type</label>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setIsBlockTypeHelpOpen(true)}>
                                                <HelpCircle className="h-4 w-4 text-muted-foreground" />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p className="max-w-xs">Choose the type of argument component you want to add</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                            <Select
                                value={newBlockType}
                                onValueChange={(value: string) => setNewBlockType(value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Block type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="premise">Premise</SelectItem>
                                    <SelectItem value="conclusion">Conclusion</SelectItem>
                                    <SelectItem value="evidence">Evidence</SelectItem>
                                    <SelectItem value="objection">Objection</SelectItem>
                                    <SelectItem value="rebuttal">Rebuttal</SelectItem>
                                </SelectContent>
                            </Select>
                            <p className="text-sm text-muted-foreground">
                                {getBlockTypeDescription(newBlockType)}
                            </p>
                        </div>
                        <div>
                            <label className="text-sm font-medium">Content</label>
                            <Textarea
                                placeholder="Enter your argument text..."
                                value={newBlockContent}
                                onChange={(e) => setNewBlockContent(e.target.value)}
                                rows={8}
                                className="mt-1 min-h-[200px]"
                                autoFocus
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleAddBlock}>Add Block</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <BlockTypeHelpDialog
                isOpen={isBlockTypeHelpOpen}
                onOpenChange={setIsBlockTypeHelpOpen}
            />
        </>
    );
}
