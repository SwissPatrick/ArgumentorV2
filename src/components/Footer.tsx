
export function Footer() {
    return (
        <footer className="bg-muted">
            <div className="container px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="md:col-span-2">
                        <div className="flex items-center mb-4">
                            <img
                                src="/images/argumentorLogo.png"
                                alt="Argumentor Logo"
                                className="h-10 mr-2"
                            />
                        </div>
                        <p className="text-muted-foreground">
                            Clarify your thinking, strengthen your arguments, and communicate with precision.
                        </p>
                        <div className="mt-4">
                            <p className="text-muted-foreground">
                                <strong>Contact:</strong> argumentorteam@outlook.com
                            </p>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-3">Resources</h4>
                        <ul className="space-y-2">
                            <li><a href="/how-it-works" className="text-muted-foreground hover:text-primary transition-colors">How It Works</a></li>
                            <li><a href="/examples" className="text-muted-foreground hover:text-primary transition-colors">Examples</a></li>
                            <li><a href="/tutorials" className="text-muted-foreground hover:text-primary transition-colors">Tutorials</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-3">Company</h4>
                        <ul className="space-y-2">
                            <li><a href="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</a></li>
                            <li><a href="/pricing" className="text-muted-foreground hover:text-primary transition-colors">Pricing</a></li>
                            <li><a href="/terms" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</a></li>
                            <li><a href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a></li>
                            <li><a href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact Us</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-sm text-muted-foreground">&copy; 2025 Argumentor. All rights reserved.</p>
                    <div className="flex items-center mt-4 md:mt-0">
                        <div className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-1 rounded border border-yellow-300">
                            Beta Version - In Development
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
