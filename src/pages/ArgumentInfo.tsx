
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Brain, CheckCircle, FileCheck, AlertTriangle, Scale } from "lucide-react";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

const ArgumentInfo = () => {
    const exampleArguments = [
        {
            id: "1",
            title: "Climate Change Requires Action",
            description: "An argument for immediate policy intervention based on scientific evidence",
            tags: ["Environmental", "Policy", "Science"],
            complexity: "Medium"
        },
        {
            id: "2",
            title: "Free Speech on Campus",
            description: "Exploring the balance between free expression and creating safe academic environments",
            tags: ["Ethics", "Academic", "Rights"],
            complexity: "Advanced"
        },
        {
            id: "3",
            title: "Vegetarianism as Ethical Choice",
            description: "A moral argument for adopting plant-based diets",
            tags: ["Ethics", "Food", "Moral Philosophy"],
            complexity: "Medium"
        }
    ];

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">
                <div className="py-12 bg-gradient-to-b from-primary/10 to-background">
                    <div className="container px-4">
                        <div className="max-w-3xl mx-auto">
                            <h1 className="text-3xl md:text-4xl font-bold mb-4">
                                Argument Builder
                            </h1>
                            <p className="text-lg text-muted-foreground mb-6">
                                A powerful tool to structure, analyze, and strengthen your arguments with AI assistance
                            </p>
                            <div className="flex gap-4">
                                <Button asChild size="lg">
                                    <Link to="/pricing">Try It Out</Link>
                                </Button>
                                <Button variant="outline" size="lg" asChild>
                                    <a href="#how-it-works">Learn More</a>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                <section id="how-it-works" className="py-16">
                    <div className="container px-4">
                        <div className="max-w-3xl mx-auto text-center mb-12">
                            <h2 className="text-2xl md:text-3xl font-bold mb-4">How It Works</h2>
                            <p className="text-muted-foreground">
                                Our Argument Builder helps you construct well-structured arguments through a simple step-by-step process
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                            <div className="flex flex-col items-center text-center">
                                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                                    <FileCheck className="h-6 w-6 text-primary" />
                                </div>
                                <h3 className="text-lg font-semibold mb-2">Create Components</h3>
                                <p className="text-muted-foreground">
                                    Add premises, evidence, objections, and rebuttals to build your argument structure
                                </p>
                            </div>

                            <div className="flex flex-col items-center text-center">
                                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                                    <Scale className="h-6 w-6 text-primary" />
                                </div>
                                <h3 className="text-lg font-semibold mb-2">Arrange and Connect</h3>
                                <p className="text-muted-foreground">
                                    Organize your argument components logically to create a cohesive structure
                                </p>
                            </div>

                            <div className="flex flex-col items-center text-center">
                                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                                    <Brain className="h-6 w-6 text-primary" />
                                </div>
                                <h3 className="text-lg font-semibold mb-2">AI Analysis</h3>
                                <p className="text-muted-foreground">
                                    Get AI-powered feedback to identify fallacies and strengthen your reasoning
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-16 bg-muted/30">
                    <div className="container px-4">
                        <div className="max-w-3xl mx-auto text-center mb-12">
                            <h2 className="text-2xl md:text-3xl font-bold mb-4">Key Features</h2>
                            <p className="text-muted-foreground">
                                Tools designed to help you build stronger, more persuasive arguments
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                            <Card>
                                <CardContent className="pt-6">
                                    <div className="flex gap-4">
                                        <div className="flex-shrink-0">
                                            <CheckCircle className="h-6 w-6 text-green-500" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold mb-2">Argument Structure Templates</h3>
                                            <p className="text-muted-foreground">
                                                Start with proven argument structures or build your own from scratch
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="pt-6">
                                    <div className="flex gap-4">
                                        <div className="flex-shrink-0">
                                            <AlertTriangle className="h-6 w-6 text-amber-500" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold mb-2">Fallacy Detection</h3>
                                            <p className="text-muted-foreground">
                                                AI-powered analysis identifies common logical fallacies in your arguments
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="pt-6">
                                    <div className="flex gap-4">
                                        <div className="flex-shrink-0">
                                            <Brain className="h-6 w-6 text-blue-500" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold mb-2">AI Suggestions</h3>
                                            <p className="text-muted-foreground">
                                                Get intelligent suggestions for evidence, objections, and rebuttals
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="pt-6">
                                    <div className="flex gap-4">
                                        <div className="flex-shrink-0">
                                            <CheckCircle className="h-6 w-6 text-green-500" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold mb-2">Export & Share</h3>
                                            <p className="text-muted-foreground">
                                                Export your arguments as documents or share them with collaborators
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                <section className="py-16">
                    <div className="container px-4">
                        <div className="max-w-3xl mx-auto text-center mb-12">
                            <h2 className="text-2xl md:text-3xl font-bold mb-4">Example Arguments</h2>
                            <p className="text-muted-foreground">
                                Explore these example arguments to see how Argumentor structures different types of reasoning
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                            {exampleArguments.map((example) => (
                                <Card key={example.id} className="card-hover">
                                    <CardContent className="pt-6">
                                        <div className="flex justify-between items-start mb-3">
                                            <h3 className="text-lg font-semibold">{example.title}</h3>
                                            <span className="text-xs bg-muted px-2 py-1 rounded-full">
                        {example.complexity}
                      </span>
                                        </div>
                                        <p className="text-muted-foreground text-sm mb-4">{example.description}</p>
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {example.tags.map((tag, i) => (
                                                <span
                                                    key={i}
                                                    className="text-xs bg-secondary/10 text-secondary-foreground px-2 py-1 rounded-full"
                                                >
                          {tag}
                        </span>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-16 bg-primary text-primary-foreground">
                    <div className="container px-4">
                        <div className="max-w-3xl mx-auto text-center">
                            <h2 className="text-2xl md:text-3xl font-bold mb-4">
                                Ready to build better arguments?
                            </h2>
                            <p className="text-lg opacity-90 mb-8">
                                Get started with Argumentor today and take your critical thinking to the next level
                            </p>
                            <Button
                                asChild
                                size="lg"
                                variant="secondary"
                            >
                                <Link to="/pricing">Get Started Now</Link>
                            </Button>
                        </div>
                    </div>
                </section>

            </main>
            <Footer />
        </div>
    );
};

export default ArgumentInfo;
