
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useRef, useState } from "react";

export function Testimonials() {
    const [visibleItems, setVisibleItems] = useState<number[]>([]);
    const testimonialsRef = useRef<HTMLDivElement>(null);

    const testimonials = [
        {
            quote: "Argumentor has completely transformed how I approach writing philosophical papers. The clarity it brings to complex arguments is invaluable.",
            author: "Philosophy Professor",
            role: "University Faculty",
            avatar: "PF",
            image: "/placeholder.svg"
        },
        {
            quote: "As a debate coach, I've seen remarkable improvement in my students' logical reasoning since we started using Argumentor. It's become essential to our preparation process.",
            author: "Debate Team Coach",
            role: "High School Faculty",
            avatar: "DC",
            image: "/placeholder.svg"
        },
        {
            quote: "Writing research papers used to be daunting, but Argumentor helps me organize my thoughts and strengthen my arguments before I even begin drafting.",
            author: "Graduate Student",
            role: "Research University",
            avatar: "GS",
            image: "/placeholder.svg"
        }
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = parseInt(entry.target.getAttribute('data-index') || '0');
                        setVisibleItems((prev) => [...prev, index]);
                    }
                });
            },
            { threshold: 0.2 }
        );

        const testimonialsSection = testimonialsRef.current;
        if (testimonialsSection) {
            const testimonialElements = testimonialsSection.querySelectorAll('.testimonial-card');
            testimonialElements.forEach((element) => {
                observer.observe(element);
            });
        }

        return () => {
            if (testimonialsSection) {
                const testimonialElements = testimonialsSection.querySelectorAll('.testimonial-card');
                testimonialElements.forEach((element) => {
                    observer.unobserve(element);
                });
            }
        };
    }, []);

    return (
        <section className="py-20" ref={testimonialsRef}>
            <div className="container px-4">
                <div className="text-center mb-12">
                    <h2 className="font-display text-3xl md:text-4xl font-bold text-primary">
                        Trusted by critical thinkers
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                        See how Argumentor is helping people clarify their thinking and strengthen their arguments
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                    {testimonials.map((testimonial, index) => (
                        <Card
                            key={index}
                            data-index={index}
                            className={`testimonial-card bg-card border border-border/60 transition-all duration-500 transform ${
                                visibleItems.includes(index)
                                    ? 'opacity-100 translate-y-0'
                                    : 'opacity-0 translate-y-10'
                            } hover:-translate-y-2 hover:shadow-md`}
                            style={{ transitionDelay: `${index * 150}ms` }}
                        >
                            <CardContent className="pt-6">
                                <blockquote className="space-y-4">
                                    <p className="text-lg text-foreground/90 italic">"{testimonial.quote}"</p>
                                    <footer className="flex items-center gap-4 mt-4">
                                        <Avatar>
                                            <AvatarFallback className="bg-primary text-primary-foreground">
                                                {testimonial.avatar}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-semibold">{testimonial.author}</p>
                                            <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                                        </div>
                                    </footer>
                                </blockquote>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
