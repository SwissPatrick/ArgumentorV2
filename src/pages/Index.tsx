
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { PricingTiers } from "@/components/PricingTiers";
import { Testimonials } from "@/components/Testimonials";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { ArrowRight, Book, Lightbulb, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">
                <Hero />

                {/* Simple Workflow Section - Streamlined */}
                <section className="py-16 bg-muted/30">
                    <div className="container px-4">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold mb-2">Simple 3-Step Process</h2>
                            <p className="text-muted-foreground max-w-xl mx-auto">
                                Build stronger arguments in minutes
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                            <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-sm hover:shadow-md transition-all">
                                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                                    <Book className="h-6 w-6" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">1. Write</h3>
                                <p className="text-muted-foreground">
                                    Create your argument structure using specialized blocks
                                </p>
                            </div>

                            <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-sm hover:shadow-md transition-all">
                                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                                    <Sparkles className="h-6 w-6" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">2. Analyze</h3>
                                <p className="text-muted-foreground">
                                    Get AI feedback to strengthen your reasoning
                                </p>
                            </div>

                            <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-sm hover:shadow-md transition-all">
                                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                                    <Lightbulb className="h-6 w-6" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">3. Refine</h3>
                                <p className="text-muted-foreground">
                                    Improve and export your polished argument
                                </p>
                            </div>
                        </div>

                        <div className="text-center mt-8">
                            <Link to="/how-it-works" className="inline-flex items-center text-primary hover:underline">
                                Learn more about our approach <ArrowRight className="ml-1 h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </section>

                <Features />
                <PricingTiers />
                <Testimonials />
                <CTA />
            </main>
            <Footer />
        </div>
    );
};

export default Index;
