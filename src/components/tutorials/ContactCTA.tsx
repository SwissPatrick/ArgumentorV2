
import { Button } from "@/components/ui/button";

export const ContactCTA = () => {
    return (
        <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold mb-4">Need personalized help?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Can't find what you're looking for? Our team is ready to help you master the art of argumentation.
            </p>
            <Button asChild size="lg">
                <a href="mailto:argumentorteam@gmail.com">Contact Our Support Team</a>
            </Button>
        </div>
    );
};
