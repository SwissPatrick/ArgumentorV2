
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, Scale, Lightbulb, Compass, CheckCircle, BookOpen, Edit, BarChart } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function Features() {
    const [visibleItems, setVisibleItems] = useState<number[]>([]);
    const featuresRef = useRef<HTMLDivElement>(null);

    const features = [
        {
            icon: <Scale className="h-6 w-6 text-secondary" />,
            title: "Logical Structure",
            description: "Build arguments with premises and conclusions using formal logical structures"
        },
        {
            icon: <Lightbulb className="h-6 w-6 text-secondary" />,
            title: "Identify Weaknesses",
            description: "Analyze your arguments to find and fix logical fallacies and weak points"
        },
        {
            icon: <Compass className="h-6 w-6 text-secondary" />,
            title: "Clear Direction",
            description: "Visualize and navigate complex reasoning paths to maintain coherence"
        },
        {
            icon: <CheckCircle className="h-6 w-6 text-secondary" />,
            title: "Evidence Integration",
            description: "Seamlessly incorporate sources and evidence to strengthen your position"
        },
        {
            icon: <BookOpen className="h-6 w-6 text-secondary" />,
            title: "AI Suggestions",
            description: "Get intelligent recommendations to improve individual argument blocks"
        },
        {
            icon: <BarChart className="h-6 w-6 text-secondary" />,
            title: "Argument Analysis",
            description: "Receive comprehensive evaluation of your entire argument's strength"
        },
        {
            icon: <Edit className="h-6 w-6 text-secondary" />,
            title: "Custom Blocks",
            description: "Create and arrange modular components for a perfect argument structure"
        }
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = parseInt(entry.target.getAttribute('data-index') || '0');
                        setVisibleItems(prev => [...prev, index]);
                    }
                });
            },
            { threshold: 0.2 }
        );

        const featuresSection = featuresRef.current;
        if (featuresSection) {
            const featureElements = featuresSection.querySelectorAll('.feature-card');
            featureElements.forEach(element => {
                observer.observe(element);
            });
        }

        return () => {
            if (featuresSection) {
                const featureElements = featuresSection.querySelectorAll('.feature-card');
                featureElements.forEach(element => {
                    observer.unobserve(element);
                });
            }
        };
    }, []);

    return (
        <section className="py-20 bg-muted/50" ref={featuresRef}>
            <div className="container px-4">
                <div className="text-center mb-12">
                    <h2 className="font-display text-3xl md:text-4xl font-bold text-primary">
                        Designed for clear, powerful thinking
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                        Argumentor provides the tools you need to build well-structured, compelling arguments
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <Card
                            key={index}
                            data-index={index}
                            className={`feature-card transition-all duration-500 transform ${
                                visibleItems.includes(index)
                                    ? 'opacity-100 translate-y-0'
                                    : 'opacity-0 translate-y-10'
                            } hover:shadow-lg hover:-translate-y-2 group cursor-pointer`}
                            style={{ transitionDelay: `${index * 100}ms` }}
                        >
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div className="p-2 rounded-md bg-primary/5 group-hover:bg-primary/10 transition-colors">
                                        {feature.icon}
                                    </div>
                                    <ArrowUpRight className="h-4 w-4 text-muted-foreground/70 group-hover:text-primary transition-colors" />
                                </div>
                                <CardTitle className="mt-4 text-xl font-semibold group-hover:text-primary transition-colors">{feature.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-base">{feature.description}</CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
