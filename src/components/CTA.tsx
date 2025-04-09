
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

export function CTA() {
    const [isVisible, setIsVisible] = useState(false);
    const ctaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                    }
                });
            },
            { threshold: 0.2 }
        );

        if (ctaRef.current) {
            observer.observe(ctaRef.current);
        }

        return () => {
            if (ctaRef.current) {
                observer.unobserve(ctaRef.current);
            }
        };
    }, []);

    return (
        <section className="py-20 bg-primary/5" ref={ctaRef}>
            <div
                className={`container px-4 transition-all duration-1000 transform ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
            >
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="font-display text-3xl font-bold text-primary">
                        Ready to strengthen your arguments?
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Join thousands of critical thinkers who are using Argumentor to clarify their thinking
                        and build more persuasive arguments.
                    </p>
                    <div className="mt-8">
                        <Button asChild size="lg" className="button-hover">
                            <Link to="/builder">
                                Start Building Now <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
