
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import {
    ArrowRight,
    BookOpen,
    Lightbulb,
    PenTool,
    CheckCircle,
    BrainCircuit,
    Scale
} from "lucide-react";
import { useEffect, useState } from "react";

const HowItWorks = () => {
    const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setVisibleSections((prev) => {
                            const newSet = new Set(prev);
                            newSet.add(entry.target.id);
                            return newSet;
                        });
                    }
                });
            },
            { threshold: 0.2 }
        );

        const sections = document.querySelectorAll('.animated-section');
        sections.forEach((section) => observer.observe(section));

        return () => {
            sections.forEach((section) => observer.unobserve(section));
        };
    }, []);

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">
                {/* Hero section */}
                <section className="w-full py-12 md:py-24 bg-gradient-to-b from-primary/10 to-background">
                    <div className="container px-4">
                        <div className="max-w-3xl mx-auto text-center">
                            <h1 className="font-display text-4xl md:text-5xl font-bold mb-6 text-primary animate-fade-in">
                                How Argumentor Works
                            </h1>
                            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed animate-slide-up">
                                Argumentor helps you structure, analyze, and refine your arguments with
                                precision and clarity. Discover how our platform can transform your critical thinking.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Main content */}
                <div className="container px-4 py-12">
                    <div className="max-w-4xl mx-auto space-y-20">
                        {/* Building your argument section */}
                        <section
                            id="building"
                            className={`animated-section transition-all duration-700 transform ${
                                visibleSections.has('building') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                            }`}
                        >
                            <div className="flex flex-col md:flex-row gap-8 items-center">
                                <div className="md:w-1/2">
                                    <div className="bg-primary/10 p-6 rounded-2xl">
                                        <PenTool className="h-12 w-12 text-primary mb-4" />
                                        <h2 className="text-2xl md:text-3xl font-display font-semibold mb-4">
                                            Building Your Argument
                                        </h2>
                                        <p className="text-muted-foreground mb-6">
                                            Start by creating a new argument in the Builder. You'll construct your argument
                                            using specialized blocks that represent different components of logical reasoning.
                                        </p>
                                    </div>
                                </div>
                                <div className="md:w-1/2 space-y-4">
                                    <div className="bg-card border border-border/60 rounded-lg p-4 hover:shadow-md transition-all">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                                                <CheckCircle className="h-5 w-5 text-green-600" />
                                            </div>
                                            <h3 className="font-semibold">Premises</h3>
                                        </div>
                                        <p className="mt-2 text-sm text-muted-foreground">
                                            The foundational statements or assumptions that support your main point.
                                        </p>
                                    </div>

                                    <div className="bg-card border border-border/60 rounded-lg p-4 hover:shadow-md transition-all">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                                                <CheckCircle className="h-5 w-5 text-blue-600" />
                                            </div>
                                            <h3 className="font-semibold">Evidence</h3>
                                        </div>
                                        <p className="mt-2 text-sm text-muted-foreground">
                                            Facts, data, or examples that strengthen your premises.
                                        </p>
                                    </div>

                                    <div className="bg-card border border-border/60 rounded-lg p-4 hover:shadow-md transition-all">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                                                <CheckCircle className="h-5 w-5 text-amber-600" />
                                            </div>
                                            <h3 className="font-semibold">Objections & Rebuttals</h3>
                                        </div>
                                        <p className="mt-2 text-sm text-muted-foreground">
                                            Potential counterarguments and your responses defending your position.
                                        </p>
                                    </div>

                                    <div className="bg-card border border-border/60 rounded-lg p-4 hover:shadow-md transition-all">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                                                <CheckCircle className="h-5 w-5 text-purple-600" />
                                            </div>
                                            <h3 className="font-semibold">Conclusions</h3>
                                        </div>
                                        <p className="mt-2 text-sm text-muted-foreground">
                                            The position you're arguing for, derived from your premises.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <Separator className="my-12" />

                        {/* AI-Powered Analysis */}
                        <section
                            id="analysis"
                            className={`animated-section transition-all duration-700 transform ${
                                visibleSections.has('analysis') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                            }`}
                        >
                            <div className="flex flex-col md:flex-row gap-8 items-center">
                                <div className="md:w-1/2 order-2 md:order-1 space-y-6">
                                    <div className="bg-card border border-border/60 rounded-lg p-5 hover:shadow-md transition-all">
                                        <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                                            <BrainCircuit className="h-5 w-5 text-primary" />
                                            Block-level suggestions
                                        </h3>
                                        <p className="text-muted-foreground">
                                            Get targeted feedback on individual components of your argument to strengthen specific points.
                                        </p>
                                    </div>

                                    <div className="bg-card border border-border/60 rounded-lg p-5 hover:shadow-md transition-all">
                                        <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                                            <Scale className="h-5 w-5 text-primary" />
                                            Full argument analysis
                                        </h3>
                                        <p className="text-muted-foreground">
                                            Receive comprehensive evaluation of your entire argument structure, including fallacy detection
                                            and strength scoring.
                                        </p>
                                    </div>
                                </div>

                                <div className="md:w-1/2 order-1 md:order-2">
                                    <div className="bg-primary/10 p-6 rounded-2xl">
                                        <Lightbulb className="h-12 w-12 text-primary mb-4" />
                                        <h2 className="text-2xl md:text-3xl font-display font-semibold mb-4">
                                            AI-Powered Analysis
                                        </h2>
                                        <p className="text-muted-foreground mb-6">
                                            Argumentor's AI can analyze your argument at different levels, helping you identify logical
                                            fallacies, strengthen weak points, and suggest improvements to make your argument more persuasive.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <Separator className="my-12" />

                        {/* Workflow section */}
                        <section
                            id="workflow"
                            className={`animated-section transition-all duration-700 transform ${
                                visibleSections.has('workflow') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                            }`}
                        >
                            <div className="text-center mb-10">
                                <BookOpen className="h-12 w-12 text-primary mx-auto mb-4" />
                                <h2 className="text-2xl md:text-3xl font-display font-semibold mb-4">
                                    Typical Workflow
                                </h2>
                                <p className="text-muted-foreground max-w-2xl mx-auto">
                                    Follow these steps to create a clear, logical, and persuasive argument using Argumentor.
                                </p>
                            </div>

                            <div className="grid md:grid-cols-5 gap-4 relative mt-16">
                                {/* Connected line through steps */}
                                <div className="hidden md:block absolute top-1/4 left-0 w-full h-0.5 bg-primary/20"></div>

                                {/* Workflow steps */}
                                {[
                                    {
                                        title: "Write",
                                        description: "Create an initial structure with premises and a conclusion"
                                    },
                                    {
                                        title: "Analyze",
                                        description: "Get AI feedback to strengthen your argument"
                                    },
                                    {
                                        title: "Add Evidence",
                                        description: "Incorporate facts and examples that support your premises"
                                    },
                                    {
                                        title: "Address Objections",
                                        description: "Add counterarguments and rebuttals to make your argument robust"
                                    },
                                    {
                                        title: "Refine",
                                        description: "Use AI analysis to polish your argument structure and language"
                                    }
                                ].map((step, index) => (
                                    <div key={index} className="flex flex-col items-center">
                                        <div className="relative z-10 w-12 h-12 rounded-full bg-primary flex items-center justify-center mb-4 shadow-md">
                                            <span className="text-primary-foreground font-semibold">{index + 1}</span>
                                        </div>
                                        <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                                        <p className="text-sm text-muted-foreground text-center">{step.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Call to action */}
                        <div className="mt-20 bg-muted rounded-lg p-8 text-center border border-border/50 shadow-sm">
                            <h3 className="text-xl md:text-2xl font-display font-semibold mb-4">Ready to build your first argument?</h3>
                            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                                Start building a clear, logical, and persuasive argument now with our intuitive builder.
                            </p>
                            <Button asChild size="lg" className="button-hover">
                                <Link to="/builder">
                                    Go to Builder <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default HowItWorks;
