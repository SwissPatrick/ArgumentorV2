import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Auth } from "./Auth";
import { ThemeToggle } from "./theme/ThemeToggle";

export function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/90 backdrop-blur">
            <div className="container flex h-16 items-center justify-between">
                <div className="flex items-center gap-2">
                    <Link to="/" className="flex items-center">
                        <img
                            src="/images/argumentorLogo.png"
                            alt="Argumentor Logo"
                            className="h-8 md:h-10"
                        />
                    </Link>
                </div>

                {/* Desktop menu */}
                <nav className="hidden md:flex items-center gap-6">
                    <Link
                        to="/how-it-works"
                        className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                        How It Works
                    </Link>
                    <Link
                        to="/my-arguments"
                        className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                        My Arguments
                    </Link>
                    <Link
                        to="/builder"
                        className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                        Builder
                    </Link>
                    <Link
                        to="/about"
                        className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                        About
                    </Link>
                    <ThemeToggle />
                    <Auth />
                </nav>

                {/* Mobile menu button */}
                <div className="md:hidden">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                    >
                        {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </Button>
                </div>
            </div>

            {/* Mobile menu */}
            {mobileMenuOpen && (
                <div className="container py-4 md:hidden">
                    <nav className="flex flex-col space-y-4">
                        <Link
                            to="/how-it-works"
                            className="text-base font-medium hover:text-primary transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            How It Works
                        </Link>
                        <Link
                            to="/my-arguments"
                            className="text-base font-medium hover:text-primary transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            My Arguments
                        </Link>
                        <Link
                            to="/builder"
                            className="text-base font-medium hover:text-primary transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Builder
                        </Link>
                        <Link
                            to="/about"
                            className="text-base font-medium hover:text-primary transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            About
                        </Link>
                        <div className="pt-2">
                            <Auth />
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
}
