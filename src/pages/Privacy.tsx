
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const Privacy = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1 py-8">
                <div className="container px-4 max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

                    <div className="prose prose-sm sm:prose lg:prose-lg mx-auto">
                        <p className="text-muted-foreground">Last updated: April 6, 2025</p>

                        <section className="mt-6">
                            <h2 className="text-2xl font-semibold mb-3">1. Introduction</h2>
                            <p>
                                Argumentor ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.
                            </p>
                        </section>

                        <section className="mt-6">
                            <h2 className="text-2xl font-semibold mb-3">2. Information We Collect</h2>
                            <p>We may collect information about you in a variety of ways:</p>
                            <ul className="list-disc pl-6 mt-2 space-y-2">
                                <li><strong>Personal Data:</strong> Email address, name, and contact information when you register an account.</li>
                                <li><strong>Payment Information:</strong> When you purchase a subscription, our payment processor (Stripe) collects payment method details. We do not store complete credit card information on our servers.</li>
                                <li><strong>Usage Data:</strong> Information on how you access and use our services, including your browser type, IP address, and the pages you visit.</li>
                                <li><strong>Argument Data:</strong> The content of arguments you create, analyze, and store using our services.</li>
                            </ul>
                        </section>

                        <section className="mt-6">
                            <h2 className="text-2xl font-semibold mb-3">3. How We Use Your Information</h2>
                            <p>We may use the information we collect for various purposes:</p>
                            <ul className="list-disc pl-6 mt-2 space-y-2">
                                <li>To provide and maintain our services</li>
                                <li>To process and complete transactions</li>
                                <li>To notify you about changes to our services</li>
                                <li>To allow you to participate in interactive features</li>
                                <li>To provide customer support</li>
                                <li>To gather analysis to improve our services</li>
                                <li>To monitor the usage of our services</li>
                                <li>To detect, prevent and address technical issues</li>
                            </ul>
                        </section>

                        <section className="mt-6">
                            <h2 className="text-2xl font-semibold mb-3">4. Payment Processing</h2>
                            <p>
                                We use Stripe as our payment processor for all subscription transactions. When you provide payment information, you are providing it directly to Stripe, whose use of your personal information is governed by their privacy policy. We receive only limited information from Stripe about your payment method, such as the last four digits of your credit card, the expiration date, and whether the transaction was successful.
                            </p>
                            <p className="mt-2">
                                For more information about how Stripe processes your data, please visit the Stripe Privacy Policy at <a href="https://stripe.com/privacy" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">https://stripe.com/privacy</a>.
                            </p>
                        </section>

                        <section className="mt-6">
                            <h2 className="text-2xl font-semibold mb-3">5. Disclosure of Your Information</h2>
                            <p>We may disclose your information in the following situations:</p>
                            <ul className="list-disc pl-6 mt-2 space-y-2">
                                <li><strong>Service Providers:</strong> To trusted third parties who assist us in operating our website, conducting our business, or servicing you.</li>
                                <li><strong>Business Transfers:</strong> In connection with a merger, sale, or acquisition.</li>
                                <li><strong>With Your Consent:</strong> We may disclose your information for any other purpose with your consent.</li>
                                <li><strong>Legal Requirements:</strong> To comply with legal obligations.</li>
                            </ul>
                        </section>

                        <section className="mt-6">
                            <h2 className="text-2xl font-semibold mb-3">6. Data Retention</h2>
                            <p>
                                We will retain your personal information only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your information to the extent necessary to comply with our legal obligations, resolve disputes, and enforce our policies.
                            </p>
                        </section>

                        <section className="mt-6">
                            <h2 className="text-2xl font-semibold mb-3">7. Security of Your Information</h2>
                            <p>
                                We use appropriate security measures to protect your information. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
                            </p>
                        </section>

                        <section className="mt-6">
                            <h2 className="text-2xl font-semibold mb-3">8. Your Data Protection Rights</h2>
                            <p>
                                Depending on your location, you may have certain rights regarding your personal information, including:
                            </p>
                            <ul className="list-disc pl-6 mt-2 space-y-2">
                                <li>The right to access your personal data</li>
                                <li>The right to rectification if the information is inaccurate or incomplete</li>
                                <li>The right to erasure of your personal data</li>
                                <li>The right to restrict processing of your personal data</li>
                                <li>The right to data portability</li>
                                <li>The right to object to processing of your personal data</li>
                            </ul>
                            <p className="mt-2">
                                To exercise any of these rights, please contact us at privacy@argumentor.com.
                            </p>
                        </section>

                        <section className="mt-6">
                            <h2 className="text-2xl font-semibold mb-3">9. Contact Us</h2>
                            <p>
                                If you have questions about this Privacy Policy or wish to exercise your data protection rights, please contact us at:
                            </p>
                            <p className="mt-2">
                                <strong>Email:</strong> privacy@argumentor.com<br />
                                <strong>Customer Service:</strong> support@argumentor.com
                            </p>
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Privacy;
