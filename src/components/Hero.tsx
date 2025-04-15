
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
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
        "challenge all assumptions",
        "build with better logic"
    ];

    const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
    const [displayPhrase, setDisplayPhrase] = useState("");
    const [isTyping, setIsTyping] = useState(true);

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

    return (
        <>
            <Helmet>
                <title>Argumentor - Structure Your Thinking & Build Stronger Arguments</title>
                <meta name="description" content="Clarify your thinking and strengthen your arguments with Argumentor. Our AI-powered platform helps you structure, analyze, and refine your arguments with precision." />
            </Helmet>
            <section
                className="radial-gradient w-full pt-20 pb-24 md:pt-28 md:pb-32"
                aria-labelledby="hero-heading"
            >
                <div className="container px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1
                            id="hero-heading"
                            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-primary animate-fade-in"
                        >
                            Clarify your thinking, <br className="hidden sm:inline" />
                            <span className="text-secondary relative">
                <span className="inline-block min-h-[1.3em] min-w-[16ch] text-left">
                  <span className="typewriter-text">
                    {displayPhrase}
                      <span className="typewriter-cursor"></span>
                  </span>
                </span>
              </span>
                        </h1>
                        <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-slide-up">
                            Argumentor helps you structure, analyze, and refine your arguments with
                            precision and clarity. Build stronger reasoning for academic papers, debates, and critical thinking.
                        </p>
                        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4 animate-slide-up" style={{ animationDelay: "0.1s" }}>
                            <Button asChild size="lg" className="button-hover">
                                <Link to={startBuildingLink}>
                                    Start Building <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                            <Button variant="outline" size="lg" asChild className="button-hover">
                                <Link to="/how-it-works">How It Works</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
