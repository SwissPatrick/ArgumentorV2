
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, ArrowRight, Bookmark, Copy, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Define example argument data
const exampleArguments = [
    {
        id: "1",
        title: "Climate Change Requires Action",
        description: "An argument for immediate policy intervention based on scientific evidence",
        tags: ["Environmental", "Policy", "Science"],
        complexity: "Medium",
        blocks: [
            {
                id: "p1",
                type: "premise",
                content: "Global temperatures have increased by approximately 1.1°C since the pre-industrial era."
            },
            {
                id: "p2",
                type: "premise",
                content: "Human activities, particularly the burning of fossil fuels, are the primary driver of observed climate change."
            },
            {
                id: "e1",
                type: "evidence",
                content: "According to the IPCC, carbon dioxide concentrations have increased by 48% since pre-industrial times, primarily from fossil fuel emissions."
            },
            {
                id: "o1",
                type: "objection",
                content: "Climate has changed naturally throughout Earth's history without human intervention."
            },
            {
                id: "r1",
                type: "rebuttal",
                content: "While natural climate change occurs, current warming is occurring at a rate 10 times faster than historical warming after ice ages."
            },
            {
                id: "c1",
                type: "conclusion",
                content: "Immediate policy action is necessary to mitigate climate change impacts and meet Paris Agreement targets."
            }
        ]
    },
    {
        id: "2",
        title: "Free Speech on Campus",
        description: "Exploring the balance between free expression and creating safe academic environments",
        tags: ["Ethics", "Academic", "Rights"],
        complexity: "Advanced",
        blocks: [
            {
                id: "p1",
                type: "premise",
                content: "Universities are institutions dedicated to the pursuit of knowledge and truth."
            },
            {
                id: "p2",
                type: "premise",
                content: "The pursuit of knowledge requires open inquiry and the free exchange of ideas."
            },
            {
                id: "e1",
                type: "evidence",
                content: "Historical examples show that restrictions on academic discourse have impeded scientific and social progress."
            },
            {
                id: "o1",
                type: "objection",
                content: "Some speech can create hostile environments that prevent equal participation in academic settings."
            },
            {
                id: "r1",
                type: "rebuttal",
                content: "Content warnings and moderated discussions can balance free expression with the need for inclusive participation."
            },
            {
                id: "c1",
                type: "conclusion",
                content: "Universities should broadly protect free expression while implementing thoughtful policies to ensure all students can participate equally."
            }
        ]
    },
    {
        id: "3",
        title: "Vegetarianism as Ethical Choice",
        description: "A moral argument for adopting plant-based diets",
        tags: ["Ethics", "Food", "Moral Philosophy"],
        complexity: "Medium",
        blocks: [
            {
                id: "p1",
                type: "premise",
                content: "Causing unnecessary suffering to sentient beings is morally wrong."
            },
            {
                id: "p2",
                type: "premise",
                content: "Modern meat production causes significant suffering to animals."
            },
            {
                id: "e1",
                type: "evidence",
                content: "Scientific research confirms that animals used for food production experience pain, stress, and fear."
            },
            {
                id: "o1",
                type: "objection",
                content: "Humans have evolved as omnivores and have historically consumed meat for survival."
            },
            {
                id: "r1",
                type: "rebuttal",
                content: "In modern developed societies, nutritional needs can be met without animal products, making meat consumption a choice rather than a necessity."
            },
            {
                id: "c1",
                type: "conclusion",
                content: "Plant-based diets represent an ethical choice to reduce unnecessary animal suffering."
            }
        ]
    },
    {
        id: "4",
        title: "Universal Basic Income",
        description: "Evaluating UBI as a solution to economic inequality",
        tags: ["Economics", "Policy", "Social Welfare"],
        complexity: "Advanced",
        blocks: [
            {
                id: "p1",
                type: "premise",
                content: "Automation and technological advances are reducing the demand for human labor in many sectors."
            },
            {
                id: "p2",
                type: "premise",
                content: "Economic inequality has been increasing in many developed nations."
            },
            {
                id: "e1",
                type: "evidence",
                content: "UBI pilot programs have shown positive effects on health outcomes, educational attainment, and entrepreneurship."
            },
            {
                id: "o1",
                type: "objection",
                content: "UBI could be prohibitively expensive and may reduce the incentive to work."
            },
            {
                id: "r1",
                type: "rebuttal",
                content: "Studies of UBI pilots show minimal reduction in work hours, primarily in education and childcare, and costs could be offset by streamlining existing welfare programs."
            },
            {
                id: "c1",
                type: "conclusion",
                content: "UBI offers a promising approach to addressing economic insecurity in an increasingly automated economy."
            }
        ]
    },
    {
        id: "5",
        title: "Artificial Intelligence Regulation",
        description: "Arguments for establishing ethical frameworks for AI development",
        tags: ["Technology", "Ethics", "Policy"],
        complexity: "Advanced",
        blocks: [
            {
                id: "p1",
                type: "premise",
                content: "AI systems are being deployed in increasingly consequential domains, from healthcare to criminal justice."
            },
            {
                id: "p2",
                type: "premise",
                content: "AI systems can reproduce or amplify existing biases in training data."
            },
            {
                id: "e1",
                type: "evidence",
                content: "Studies have documented racial and gender bias in commercial AI systems for facial recognition, natural language processing, and hiring."
            },
            {
                id: "o1",
                type: "objection",
                content: "Heavy regulation could stifle innovation and put regulated countries at a competitive disadvantage."
            },
            {
                id: "r1",
                type: "rebuttal",
                content: "Proactive regulation focusing on transparency, explainability, and fairness can foster responsible innovation and public trust."
            },
            {
                id: "c1",
                type: "conclusion",
                content: "Governments should establish regulatory frameworks for high-risk AI applications to ensure alignment with human values and rights."
            }
        ]
    },
    {
        id: "6",
        title: "Socratic Mortality",
        description: "The classic syllogism demonstrating logical form",
        tags: ["Philosophy", "Logic", "Beginner"],
        complexity: "Basic",
        blocks: [
            {
                id: "p1",
                type: "premise",
                content: "All men are mortal."
            },
            {
                id: "p2",
                type: "premise",
                content: "Socrates is a man."
            },
            {
                id: "c1",
                type: "conclusion",
                content: "Therefore, Socrates is mortal."
            }
        ]
    }
];

// Component for displaying a single argument block
const ExampleArgumentBlock = ({ type, content }) => {
    const getTypeStyles = () => {
        switch (type) {
            case "premise":
                return "bg-blue-50 border-blue-200";
            case "conclusion":
                return "bg-green-50 border-green-200";
            case "evidence":
                return "bg-purple-50 border-purple-200";
            case "objection":
                return "bg-amber-50 border-amber-200";
            case "rebuttal":
                return "bg-red-50 border-red-200";
            default:
                return "bg-gray-50 border-gray-200";
        }
    };

    const getTypeLabel = () => {
        return type.charAt(0).toUpperCase() + type.slice(1);
    };

    return (
        <div className={`p-4 rounded-md border mb-3 ${getTypeStyles()}`}>
            <div className="flex justify-between items-start mb-2">
                <Badge variant="outline" className="capitalize">
                    {getTypeLabel()}
                </Badge>
            </div>
            <p className="text-sm">{content}</p>
        </div>
    );
};

// Main example viewer dialog component
const ExampleArgumentViewer = ({ argument, onClose }) => {
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-start mb-2">
                <div>
                    <h3 className="text-xl font-semibold">{argument.title}</h3>
                    <p className="text-sm text-muted-foreground">{argument.description}</p>
                </div>
                <Badge variant="outline">{argument.complexity}</Badge>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
                {argument.tags.map((tag, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                        {tag}
                    </Badge>
                ))}
            </div>

            <div className="border-t pt-4">
                <h4 className="font-medium mb-3 flex items-center gap-2">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                    Example Argument - Read Only
                </h4>
                <ScrollArea className="h-[400px] rounded-md border p-4">
                    {argument.blocks.map((block) => (
                        <ExampleArgumentBlock
                            key={block.id}
                            type={block.type}
                            content={block.content}
                        />
                    ))}
                </ScrollArea>
            </div>

            <div className="flex justify-between items-center mt-4 pt-4 border-t">
                <Button variant="outline" onClick={onClose}>
                    Close
                </Button>
                <div className="flex gap-2">
                    <Button variant="outline" asChild>
                        <Link to="/builder">
                            <Copy className="mr-2 h-4 w-4" />
                            Create Similar
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
};

const Examples = () => {
    const [selectedArgument, setSelectedArgument] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("all");

    const handleViewExample = (argument) => {
        setSelectedArgument(argument);
        setIsDialogOpen(true);
    };

    const filteredArguments = activeTab === "all"
        ? exampleArguments
        : exampleArguments.filter(arg =>
            arg.complexity.toLowerCase() === activeTab.toLowerCase());

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1 py-8">
                <div className="container px-4">
                    <div className="max-w-3xl mx-auto mb-8">
                        <h1 className="font-display text-3xl md:text-4xl font-bold text-primary">
                            Example Arguments
                        </h1>
                        <p className="text-lg text-muted-foreground mt-4">
                            Explore these example arguments to see how Argumentor can help structure and strengthen different types of reasoning.
                        </p>
                    </div>

                    <div className="mb-8">
                        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                            <TabsList className="mb-4">
                                <TabsTrigger value="all">All Examples</TabsTrigger>
                                <TabsTrigger value="basic">Basic</TabsTrigger>
                                <TabsTrigger value="medium">Medium</TabsTrigger>
                                <TabsTrigger value="advanced">Advanced</TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                        {filteredArguments.map((example) => (
                            <Card key={example.id} className="transition-all hover:shadow-md">
                                <CardHeader>
                                    <div className="flex justify-between items-start">
                                        <CardTitle className="text-xl">{example.title}</CardTitle>
                                        <Badge variant="outline">{example.complexity}</Badge>
                                    </div>
                                    <CardDescription className="mt-2">{example.description}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-wrap gap-2">
                                        {example.tags.map((tag, i) => (
                                            <Badge
                                                key={i}
                                                variant="secondary"
                                                className="text-xs"
                                            >
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                    <p className="text-sm mt-4 text-muted-foreground">
                                        {example.blocks.length} block{example.blocks.length === 1 ? '' : 's'}
                                        ({example.blocks.filter(b => b.type === "premise").length} premises,
                                        {example.blocks.filter(b => b.type === "conclusion").length} conclusions)
                                    </p>
                                </CardContent>
                                <CardFooter>
                                    <Button className="w-full" onClick={() => handleViewExample(example)}>
                                        <Eye className="mr-2 h-4 w-4" />
                                        View Example
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>

                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogContent className="sm:max-w-2xl">
                            <DialogHeader>
                                <DialogTitle>Example Argument</DialogTitle>
                                <DialogDescription>
                                    Explore this argument structure for inspiration
                                </DialogDescription>
                            </DialogHeader>
                            {selectedArgument && (
                                <ExampleArgumentViewer
                                    argument={selectedArgument}
                                    onClose={() => setIsDialogOpen(false)}
                                />
                            )}
                        </DialogContent>
                    </Dialog>

                    <div className="mt-16 text-center">
                        <h2 className="text-2xl font-display font-semibold mb-4">
                            Ready to build your own argument?
                        </h2>
                        <Button asChild size="lg" className="button-hover">
                            <Link to="/builder">
                                Start from Scratch <ArrowRight className="ml-1 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Examples;
