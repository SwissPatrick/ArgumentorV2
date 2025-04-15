
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { PricingTiers } from "@/components/PricingTiers";
import { Testimonials } from "@/components/Testimonials";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { ArrowRight, Book, Lightbulb, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Index = () => {
    // JSON-LD structured data for better SEO
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Argumentor",
        "description": "An AI-powered platform to structure, analyze, and refine arguments with precision and clarity.",
        "applicationCategory": "Educational Software",
        "operatingSystem": "Web Browser",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        },
        "author": {
            "@type": "Organization",
            "name": "Argumentor",
            "url": "https://argumentor.eu"
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Helmet>
                <title>Argumentor - Build Stronger Arguments & Clarify Your Thinking</title>
                <meta name="description" content="Argumentor helps you structure, analyze, and refine your arguments with precision. Build stronger reasoning for academic papers, debates, and critical thinking." />
                <script type="application/ld+json">
                    {JSON.stringify(structuredData)}
                </script>
            </Helmet>
            <Navbar />
            <main className="flex-1">
                <Hero />

                {/* Simple Workflow Section - Streamlined */}
                <section
                    className="py-16 bg-muted/30"
                    aria-labelledby="workflow-heading"
                >
                    <div className="container px-4">
                        <div className="text-center mb-8">
                            <h2 id="workflow-heading" className="text-3xl font-bold mb-2">Simple 3-Step Process</h2>
                            <p className="text-muted-foreground max-w-xl mx-auto">
                                Build stronger arguments in minutes
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                            <article className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-sm hover:shadow-md transition-all">
                                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                                    <Book className="h-6 w-6" aria-hidden="true" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">1. Write</h3>
                                <p className="text-muted-foreground">
                                    Create your argument structure using specialized blocks
                                </p>
                            </article>

                            <article className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-sm hover:shadow-md transition-all">
                                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                                    <Sparkles className="h-6 w-6" aria-hidden="true" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">2. Analyze</h3>
                                <p className="text-muted-foreground">
                                    Get AI feedback to strengthen your reasoning
                                </p>
                            </article>

                            <article className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-sm hover:shadow-md transition-all">
                                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                                    <Lightbulb className="h-6 w-6" aria-hidden="true" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">3. Refine</h3>
                                <p className="text-muted-foreground">
                                    Improve and export your polished argument
                                </p>
                            </article>
                        </div>

                        <div className="text-center mt-8">
                            <Link to="/how-it-works" className="inline-flex items-center text-primary hover:underline">
                                Learn more about our approach <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
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
