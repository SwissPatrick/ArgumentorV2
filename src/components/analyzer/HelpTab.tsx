
import { Badge } from "@/components/ui/badge";

export function HelpTab() {
    return (
        <div className="space-y-4">
            <div className="bg-muted/50 rounded-md p-4">
                <h3 className="font-medium mb-2">How the AI Analysis Works</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex gap-2">
                        <Badge variant="outline" className="bg-primary/10 text-primary">1</Badge>
                        <span>The AI evaluates your entire argument structure and flow</span>
                    </li>
                    <li className="flex gap-2">
                        <Badge variant="outline" className="bg-primary/10 text-primary">2</Badge>
                        <span>It assigns a strength score and letter grade based on clarity, evidence, and logic</span>
                    </li>
                    <li className="flex gap-2">
                        <Badge variant="outline" className="bg-primary/10 text-primary">3</Badge>
                        <span>Logical fallacies are identified and explained</span>
                    </li>
                    <li className="flex gap-2">
                        <Badge variant="outline" className="bg-primary/10 text-primary">4</Badge>
                        <span>The AI generates improvement suggestions for specific blocks</span>
                    </li>
                </ul>
            </div>

            <div className="bg-muted/50 rounded-md p-4">
                <h3 className="font-medium mb-2">Tips for Better Analysis</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex gap-2">
                        <span>•</span>
                        <span>Include a mix of premises, evidence, and at least one conclusion</span>
                    </li>
                    <li className="flex gap-2">
                        <span>•</span>
                        <span>Consider adding objections and rebuttals for a more balanced argument</span>
                    </li>
                    <li className="flex gap-2">
                        <span>•</span>
                        <span>Use the options tab to guide the AI's focus</span>
                    </li>
                    <li className="flex gap-2">
                        <span>•</span>
                        <span>You can add AI suggestions directly to your argument with one click</span>
                    </li>
                </ul>
            </div>
        </div>
    );
}
