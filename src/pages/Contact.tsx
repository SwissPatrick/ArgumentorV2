
import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Mail, Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { generateCSRFToken, validateCSRFToken } from "@/lib/csrf";
import { supabase } from "@/integrations/supabase/client";

// Define the form validation schema
const formSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    subject: z.string().min(3, { message: "Subject must be at least 3 characters." }),
    message: z.string().min(10, { message: "Message must be at least 10 characters." }),
    csrfToken: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

const Contact = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [csrfToken, setCsrfToken] = useState("");

    // Generate CSRF token on component mount
    useEffect(() => {
        const token = generateCSRFToken();
        setCsrfToken(token);
    }, []);

    // Initialize form with validation
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            subject: "",
            message: "",
            csrfToken: "",
        },
    });

    // Update the CSRF token in the form when it changes
    useEffect(() => {
        form.setValue("csrfToken", csrfToken);
    }, [csrfToken, form]);

    const onSubmit = async (data: FormValues) => {
        setIsSubmitting(true);

        try {
            // Validate CSRF token
            if (!validateCSRFToken(data.csrfToken)) {
                throw new Error("Security validation failed. Please refresh the page and try again.");
            }

            // Call the Supabase Edge Function to send the email
            const { error } = await supabase.functions.invoke('send-contact-email', {
                body: {
                    name: data.name,
                    email: data.email,
                    subject: data.subject,
                    message: data.message,
                    to: 'argumentorteam@gmail.com' // Hardcode the recipient
                }
            });

            if (error) {
                throw new Error("There was a problem sending your message. Please try again later.");
            }

            toast({
                title: "Message sent successfully",
                description: "Thank you for contacting us. We'll respond to your inquiry soon.",
            });

            // Regenerate CSRF token after successful submission
            const newToken = generateCSRFToken();
            setCsrfToken(newToken);
            form.reset({
                name: "",
                email: "",
                subject: "",
                message: "",
                csrfToken: newToken,
            });
        } catch (error) {
            toast({
                title: "Something went wrong",
                description: error instanceof Error ? error.message : "There was a problem sending your message. Please try again later.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1 py-8">
                <div className="container px-4 max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold mb-6">Contact Us</h1>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Get in Touch</h2>
                            <p className="text-muted-foreground mb-6">
                                Have questions about our services? Need assistance with your subscription?
                                We're here to help. Send us a message and we'll get back to you as soon as possible.
                            </p>

                            <div className="space-y-4">
                                <div className="flex items-start">
                                    <Mail className="h-5 w-5 mr-3 text-primary mt-0.5" />
                                    <div>
                                        <h3 className="font-medium">Email Us</h3>
                                        <p className="text-muted-foreground">
                                            Customer support: <a href="mailto:argumentorteam@gmail.com" className="text-primary hover:underline">argumentorteam@gmail.com</a>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8">
                                <h3 className="font-medium mb-2">Response Time</h3>
                                <p className="text-muted-foreground">
                                    We strive to respond to all inquiries within 24-48 hours during business days.
                                </p>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold mb-4">Send a Message</h2>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Your Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="John Doe" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email Address</FormLabel>
                                                <FormControl>
                                                    <Input type="email" placeholder="john.doe@example.com" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="subject"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Subject</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="How can we help you?" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="message"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Message</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Please describe your inquiry in detail..."
                                                        rows={5}
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Hidden CSRF Token field */}
                                    <input
                                        type="hidden"
                                        {...form.register("csrfToken")}
                                    />

                                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Sending...
                                            </>
                                        ) : (
                                            "Send Message"
                                        )}
                                    </Button>
                                </form>
                            </Form>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Contact;
