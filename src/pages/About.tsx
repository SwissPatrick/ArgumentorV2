
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const About = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">
                <section className="py-20 md:py-28 radial-gradient">
                    <div className="container px-4">
                        <div className="max-w-3xl mx-auto text-center">
                            <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-primary animate-fade-in">
                                About Argumentor
                            </h1>
                            <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                                A tool designed to elevate critical thinking and argumentation
                                through structured logical frameworks.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="py-16 md:py-24">
                    <div className="container px-4">
                        <div className="max-w-4xl mx-auto space-y-16">
                            <div className="space-y-6">
                                <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-primary">
                                    Our Philosophy
                                </h2>
                                <Card className="border-none shadow-md">
                                    <CardContent className="pt-6">
                                        <p className="text-lg mb-4">
                                            Argumentor was created with a simple belief: clear thinking leads to better outcomes.
                                            In a world of information overload and polarized debate, the ability to structure
                                            logical arguments has never been more essential.
                                        </p>
                                        <p className="text-lg mb-4">
                                            We built this tool to help students, researchers, writers, and thinkers of all kinds
                                            construct stronger arguments, identify logical fallacies, and develop more persuasive
                                            reasoning. Whether you're writing an academic paper, preparing for a debate, or simply
                                            trying to clarify your own thinking, Argumentor provides the structure you need.
                                        </p>
                                        <p className="text-lg">
                                            Our approach draws from formal logic, argumentation theory, and cognitive science
                                            to create a practical tool that enhances how you formulate and express ideas.
                                        </p>
                                    </CardContent>
                                </Card>
                            </div>

                            <div className="space-y-6">
                                <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-primary">
                                    Key Features
                                </h2>
                                <Card className="border-none shadow-md">
                                    <CardContent className="pt-6">
                                        <ul className="grid gap-4 md:grid-cols-2">
                                            <li className="flex items-start gap-3">
                                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                                                <div>
                                                    <span className="font-semibold block mb-1">Structured Building Blocks</span>
                                                    <p className="text-muted-foreground">Organize arguments with premises, evidence, objections, rebuttals, and conclusions.</p>
                                                </div>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                                                <div>
                                                    <span className="font-semibold block mb-1">Visualization</span>
                                                    <p className="text-muted-foreground">See the logical structure of your argument in a clear, intuitive layout.</p>
                                                </div>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                                                <div>
                                                    <span className="font-semibold block mb-1">Analysis Tools</span>
                                                    <p className="text-muted-foreground">Identify potential weaknesses in your reasoning before finalizing your argument.</p>
                                                </div>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                                                <div>
                                                    <span className="font-semibold block mb-1">Templates and Examples</span>
                                                    <p className="text-muted-foreground">Learn from model arguments across various disciplines and topics.</p>
                                                </div>
                                            </li>
                                        </ul>
                                    </CardContent>
                                </Card>
                            </div>

                            <div className="space-y-6">
                                <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-primary">
                                    Who We Serve
                                </h2>
                                <Card className="border-none shadow-md overflow-hidden">
                                    <CardContent className="p-0">
                                        <div className="grid md:grid-cols-2 gap-0">
                                            <div className="bg-muted/50 p-6 space-y-4">
                                                <h3 className="text-xl font-semibold">Education</h3>
                                                <ul className="space-y-3">
                                                    <li className="flex items-start gap-2">
                                                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                                        <span><span className="font-medium">Students:</span> Develop stronger papers and presentations with logical coherence.</span>
                                                    </li>
                                                    <li className="flex items-start gap-2">
                                                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                                        <span><span className="font-medium">Educators:</span> Teach critical thinking and argumentation skills with practical tools.</span>
                                                    </li>
                                                </ul>
                                            </div>

                                            <div className="p-6 space-y-4">
                                                <h3 className="text-xl font-semibold">Professional</h3>
                                                <ul className="space-y-3">
                                                    <li className="flex items-start gap-2">
                                                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                                        <span><span className="font-medium">Researchers:</span> Structure complex arguments with evidence and anticipate counterpoints.</span>
                                                    </li>
                                                    <li className="flex items-start gap-2">
                                                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                                        <span><span className="font-medium">Writers:</span> Develop more persuasive and logically sound content.</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>

                                        <Separator />

                                        <div className="p-6">
                                            <div className="flex items-start gap-2">
                                                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                                <span><span className="font-medium">Critical Thinkers:</span> Anyone looking to refine their reasoning and argumentation skills.</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            <div className="mt-12 text-center pt-8">
                                <Button asChild size="lg" className="button-hover group">
                                    <Link to="/builder">
                                        Try Argumentor Now
                                        <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default About;
