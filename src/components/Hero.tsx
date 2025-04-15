
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/components/auth/AuthProvider";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

export function Hero() {
    const { user, userIsEmailVerified } = useAuth();
    const startBuildingLink = user && userIsEmailVerified ? "/builder" : "/pricing";

    // Reduced to only 3 phrases for more subtle rotation
    const phrases = [
        "strengthen your arguments",
        "challenge assumptions",
        "build with clear logic"
    ];

    const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
    const [displayPhrase, setDisplayPhrase] = useState("");
    const [isTyping, setIsTyping] = useState(true);
    const [showScrollIndicator, setShowScrollIndicator] = useState(true);

    useEffect(() => {
        const phrase = phrases[currentPhraseIndex];

        if (isTyping) {
            if (displayPhrase.length < phrase.length) {
                const timeout = setTimeout(() => {
                    setDisplayPhrase(phrase.substring(0, displayPhrase.length + 1));
                }, 120); // Slowed down typing speed
                return () => clearTimeout(timeout);
            } else {
                // Hold the completed phrase for longer before starting to delete
                const timeout = setTimeout(() => {
                    setIsTyping(false);
                }, 2500); // Hold for 2.5 seconds
                return () => clearTimeout(timeout);
            }
        } else {
            if (displayPhrase.length > 0) {
                const timeout = setTimeout(() => {
                    setDisplayPhrase(displayPhrase.substring(0, displayPhrase.length - 1));
                }, 50); // Faster deletion
                return () => clearTimeout(timeout);
            } else {
                setIsTyping(true);
                setCurrentPhraseIndex((currentPhraseIndex + 1) % phrases.length);
            }
        }
    }, [displayPhrase, isTyping, currentPhraseIndex, phrases]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setShowScrollIndicator(false);
            } else {
                setShowScrollIndicator(true);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <Helmet>
                <title>Argumentor - Structure Your Thinking & Build Stronger Arguments</title>
                <meta name="description" content="Clarify your thinking and strengthen your arguments with Argumentor. Our AI-powered platform helps you structure, analyze, and refine your arguments with precision." />
            </Helmet>
            <section
                className="relative w-full pt-20 pb-24 md:pt-28 md:pb-32"
                aria-labelledby="hero-heading"
            >
                {/* Background elements - subtle in both light and dark mode */}
                <div className="absolute inset-0 -z-10">
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent"></div>
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-3xl"></div>
                </div>

                <div className="container relative px-4">
                    <div className="relative max-w-3xl mx-auto text-center">
                        {/* Subtle decorative elements that work in both modes */}
                        <Sparkles className="absolute -top-12 left-0 text-primary/40 h-8 w-8 animate-pulse" />
                        <Sparkles className="absolute -right-4 top-1/2 text-secondary/40 h-6 w-6 animate-pulse delay-300" />
                        <Sparkles className="absolute -left-8 bottom-0 text-primary/40 h-6 w-6 animate-pulse delay-500" />

                        <h1
                            id="hero-heading"
                            className="relative font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground"
                        >
                            Clarify your thinking, <br className="hidden sm:inline" />
                            <span className="relative text-primary">
                <span className="inline-block min-h-[1.3em] min-w-[15ch]">
                  <span className="typewriter-text">
                    {displayPhrase}
                      <span className="typewriter-cursor"></span>
                  </span>
                </span>
              </span>
                        </h1>

                        <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                            Argumentor helps you structure, analyze, and refine your arguments with
                            precision and clarity. Build stronger reasoning for academic papers, debates, and critical thinking.
                        </p>

                        {/* Fixed button alignment */}
                        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Button
                                asChild
                                size="lg"
                                className="relative overflow-hidden group"
                            >
                                <Link to={startBuildingLink}>
                                    Start Building
                                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    <span className="absolute inset-0 -z-10 bg-primary/10 group-hover:bg-primary/20 transition-colors"></span>
                                </Link>
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                asChild
                                className="border-primary/20 hover:border-primary/40"
                            >
                                <Link to="/how-it-works">
                                    How It Works
                                </Link>
                            </Button>
                        </div>

                        {/* Simplified scroll indicator that works in both modes */}
                        {showScrollIndicator && (
                            <div className="absolute left-1/2 -translate-x-1/2 -bottom-16 animate-bounce transition-opacity">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="text-primary/60"
                                >
                                    <path d="M12 5v14" />
                                    <path d="m19 12-7 7-7-7" />
                                </svg>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}
