
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Workflow, FileText, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { hasCredits, useCredit } from "@/lib/subscription";
import { v4 as uuidv4 } from "@/lib/uuid";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface ArgumentItem {
    id: string;
    type: "premise" | "conclusion" | "evidence" | "objection" | "rebuttal";
    content: string;
}

interface ArgumentListProps {
    argumentItems: {
        id: string;
        title: string;
        lastModified: Date;
        blocks: ArgumentItem[]
    }[];
    onCreateNew: () => void;
    onLoadArgument: (id: string) => void;
    onDeleteArgument?: (id: string) => void;
    argumentLimits?: {
        current: number;
        max: number;
    };
}

export function ArgumentList({ argumentItems, onCreateNew, onLoadArgument, onDeleteArgument, argumentLimits }: ArgumentListProps) {
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [argumentToDelete, setArgumentToDelete] = useState<string | null>(null);

    const handleDelete = (id: string) => {
        setArgumentToDelete(id);
        setIsDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        if (argumentToDelete && onDeleteArgument) {
            onDeleteArgument(argumentToDelete);
            setArgumentToDelete(null);
        }
        setIsDeleteDialogOpen(false);
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold">My Arguments</h2>
                    <p className="text-muted-foreground">
                        {argumentItems.length === 0
                            ? "Create your first argument to get started"
                            : `You have ${argumentItems.length} saved argument${argumentItems.length === 1 ? '' : 's'}`}
                        {argumentLimits && ` (${argumentLimits.current}/${argumentLimits.max})`}
                    </p>
                </div>
                <Button onClick={onCreateNew}>
                    <Plus className="mr-1 h-4 w-4" /> New Argument
                </Button>
            </div>

            {argumentItems.length === 0 ? (
                <Card className="text-center py-12 bg-muted/40">
                    <CardContent className="pt-6">
                        <Workflow className="mx-auto h-12 w-12 text-muted-foreground/60 mb-3" />
                        <h3 className="text-lg font-medium mb-2">No arguments yet</h3>
                        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                            Create your first argument to analyze complex topics, build stronger reasoning,
                            and develop persuasive positions.
                        </p>
                        <Button onClick={onCreateNew} size="lg">
                            <Plus className="mr-1 h-4 w-4" /> Create Your First Argument
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {argumentItems.map((arg) => (
                        <Card key={arg.id} className="cursor-pointer hover:shadow-md transition-all duration-200 border-l-2 border-l-primary/20">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-lg line-clamp-1 flex items-center gap-2">
                                    <FileText className="h-4 w-4 text-primary/70" />
                                    {arg.title}
                                </CardTitle>
                                <CardDescription>
                                    Last modified: {arg.lastModified.toLocaleDateString()}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="pb-4">
                                <p className="text-sm text-muted-foreground">
                                    {arg.blocks.length} block{arg.blocks.length === 1 ? '' : 's'}
                                </p>
                                {arg.blocks.length > 0 && (
                                    <p className="text-sm line-clamp-2 mt-1 text-foreground/80">
                                        {arg.blocks[0].content.split("AI Improvement:")[0].slice(0, 80)}
                                        {arg.blocks[0].content.length > 80 ? "..." : ""}
                                    </p>
                                )}
                            </CardContent>
                            <CardFooter className="flex justify-between">
                                <Button variant="ghost" className="text-primary" onClick={(e) => {
                                    e.stopPropagation();
                                    onLoadArgument(arg.id);
                                }}>
                                    Open
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-destructive hover:bg-destructive/10"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDelete(arg.id);
                                    }}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}

            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Argument</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete this argument? This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={confirmDelete}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
