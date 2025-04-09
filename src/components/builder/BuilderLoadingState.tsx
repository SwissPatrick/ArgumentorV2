
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export function BuilderLoadingState() {
    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-background to-background/80">
            <Navbar />
            <main className="flex-1 py-8">
                <div className="container px-4">
                    <div className="flex items-center justify-center h-64">
                        <div className="p-6 rounded-lg shadow-md bg-card/60 backdrop-blur-sm border border-border/50 animate-pulse">
                            <p className="text-muted-foreground">Loading your workspace...</p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
