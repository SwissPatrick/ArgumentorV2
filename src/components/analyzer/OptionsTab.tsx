
import { Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CustomPromptInput } from "./CustomPromptInput";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";

interface OptionsTabProps {
    customPrompt: string;
    setCustomPrompt: (value: string) => void;
    isPremiumUser: boolean;
    addAnalysisOption: (option: string) => void;
}

export function OptionsTab({
                               customPrompt,
                               setCustomPrompt,
                               isPremiumUser,
                               addAnalysisOption
                           }: OptionsTabProps) {
    return (
        <div className="space-y-4">
            <div className="grid gap-2">
                <CustomPromptInput
                    customPrompt={customPrompt}
                    setCustomPrompt={setCustomPrompt}
                />
            </div>

            <div className="bg-muted/50 rounded-md p-4">
                <h3 className="text-sm font-medium flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-purple-500" />
                    <span>Analysis Options</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                    <HoverCard>
                        <HoverCardTrigger asChild>
                            <Button
                                variant="outline"
                                className="w-full justify-start text-sm"
                                disabled={!isPremiumUser}
                                onClick={() => addAnalysisOption("Focus on identifying fallacies in my argument and explain how to avoid them.")}
                            >
                                <Badge variant="outline" className="mr-2 bg-amber-50 text-amber-700 border-amber-200">Fallacy</Badge>
                                Detect Logical Fallacies
                            </Button>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-80">
                            <p className="text-sm">AI will focus on finding logical fallacies like straw man, ad hominem, or circular reasoning in your argument.</p>
                        </HoverCardContent>
                    </HoverCard>

                    <HoverCard>
                        <HoverCardTrigger asChild>
                            <Button
                                variant="outline"
                                className="w-full justify-start text-sm"
                                disabled={!isPremiumUser}
                                onClick={() => addAnalysisOption("Provide specific structural improvements for each section of my argument to enhance overall flow and coherence.")}
                            >
                                <Badge variant="outline" className="mr-2 bg-blue-50 text-blue-700 border-blue-200">Structure</Badge>
                                Improve Structure
                            </Button>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-80">
                            <p className="text-sm">Get suggestions for reorganizing your argument for better flow and impact.</p>
                        </HoverCardContent>
                    </HoverCard>

                    <HoverCard>
                        <HoverCardTrigger asChild>
                            <Button
                                variant="outline"
                                className="w-full justify-start text-sm"
                                disabled={!isPremiumUser}
                                onClick={() => addAnalysisOption("Suggest specific evidence sources and examples that would strengthen my claims and make my argument more credible.")}
                            >
                                <Badge variant="outline" className="mr-2 bg-green-50 text-green-700 border-green-200">Sources</Badge>
                                Suggest Evidence Sources
                            </Button>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-80">
                            <p className="text-sm">AI will recommend potential sources and evidence types to strengthen your claims.</p>
                        </HoverCardContent>
                    </HoverCard>

                    <HoverCard>
                        <HoverCardTrigger asChild>
                            <Button
                                variant="outline"
                                className="w-full justify-start text-sm"
                                disabled={!isPremiumUser}
                                onClick={() => addAnalysisOption("Identify strong potential counterarguments to my position and provide strategies to address them effectively.")}
                            >
                                <Badge variant="outline" className="mr-2 bg-purple-50 text-purple-700 border-purple-200">Counter</Badge>
                                Find Counterarguments
                            </Button>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-80">
                            <p className="text-sm">Get an overview of potential objections to your argument and suggestions for addressing them.</p>
                        </HoverCardContent>
                    </HoverCard>
                </div>
            </div>
        </div>
    );
}
