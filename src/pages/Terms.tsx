
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const Terms = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1 py-8">
                <div className="container px-4 max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>

                    <div className="prose prose-sm sm:prose lg:prose-lg mx-auto">
                        <p className="text-muted-foreground">Last updated: April 6, 2025</p>

                        <section className="mt-6">
                            <h2 className="text-2xl font-semibold mb-3">1. Acceptance of Terms</h2>
                            <p>
                                By accessing or using Argumentor's website and services, you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of these Terms, you may not access the service.
                            </p>
                        </section>

                        <section className="mt-6">
                            <h2 className="text-2xl font-semibold mb-3">2. Description of Service</h2>
                            <p>
                                Argumentor provides an AI-powered argument construction and analysis tool designed to help users build and refine logical arguments. The service includes argument mapping, AI analysis, and educational resources.
                            </p>
                        </section>

                        <section className="mt-6">
                            <h2 className="text-2xl font-semibold mb-3">3. User Accounts</h2>
                            <p>
                                When you create an account with us, you must provide accurate, complete, and up-to-date information. You are solely responsible for safeguarding your password and for all activities that occur under your account.
                            </p>
                        </section>

                        <section className="mt-6">
                            <h2 className="text-2xl font-semibold mb-3">4. Subscription and Payment</h2>
                            <p>
                                Access to certain features requires a paid subscription. By subscribing to a premium plan, you agree to pay the fees indicated for that service. Subscriptions will automatically renew unless canceled before the renewal date.
                            </p>
                            <p className="mt-2">
                                All payments are processed securely through Stripe, our payment processor. We do not store your complete credit card information on our servers.
                            </p>
                        </section>

                        <section className="mt-6">
                            <h2 className="text-2xl font-semibold mb-3">5. Cancellation Policy</h2>
                            <p>
                                You may cancel your subscription at any time through your account settings or by contacting our customer support at support@argumentor.com. Upon cancellation:
                            </p>
                            <ul className="list-disc pl-6 mt-2 space-y-2">
                                <li>You will continue to have access to premium features until the end of your current billing period.</li>
                                <li>Your subscription will not renew automatically for the next billing period.</li>
                                <li>We do not provide partial refunds for unused portions of the current billing period.</li>
                            </ul>
                        </section>

                        <section className="mt-6">
                            <h2 className="text-2xl font-semibold mb-3">6. Refund and Dispute Policy</h2>
                            <p>
                                We strive to ensure your satisfaction with our service. Our refund policy is as follows:
                            </p>
                            <ul className="list-disc pl-6 mt-2 space-y-2">
                                <li><strong>Subscription Services:</strong> We offer a 14-day money-back guarantee for new subscriptions. If you are not satisfied with our service, you may request a full refund within 14 days of your initial purchase by contacting support@argumentor.com.</li>
                                <li><strong>Disputes:</strong> If you believe you have been charged incorrectly or have any payment disputes, please contact us at support@argumentor.com within 30 days of the charge. We will investigate and work to resolve the issue promptly.</li>
                                <li><strong>No Refunds After 14 Days:</strong> After the 14-day period, we generally do not offer refunds for subscription payments already made. However, we may consider exceptions on a case-by-case basis for extenuating circumstances.</li>
                            </ul>
                        </section>

                        <section className="mt-6">
                            <h2 className="text-2xl font-semibold mb-3">7. Promotional Terms and Conditions</h2>
                            <p>
                                From time to time, we may offer promotions, discounts, or free trials. These offers are subject to the following conditions:
                            </p>
                            <ul className="list-disc pl-6 mt-2 space-y-2">
                                <li>Promotions may have specific eligibility requirements and expiration dates.</li>
                                <li>Promotions cannot be combined with other offers unless explicitly stated.</li>
                                <li>We reserve the right to modify or terminate any promotion at any time.</li>
                                <li>Free trials automatically convert to paid subscriptions unless canceled before the trial period ends.</li>
                                <li>Discount codes must be applied at checkout and cannot be applied retroactively.</li>
                            </ul>
                        </section>

                        <section className="mt-6">
                            <h2 className="text-2xl font-semibold mb-3">8. User Content</h2>
                            <p>
                                You retain all rights to the content you create using our service. By submitting content, you grant us a non-exclusive license to use, store, and process that content solely for the purpose of providing and improving our services.
                            </p>
                        </section>

                        <section className="mt-6">
                            <h2 className="text-2xl font-semibold mb-3">9. Prohibited Uses</h2>
                            <p>You agree not to use the service to:</p>
                            <ul className="list-disc pl-6 mt-2 space-y-2">
                                <li>Violate any laws or regulations</li>
                                <li>Infringe upon intellectual property rights</li>
                                <li>Transmit harmful code or attempt to interfere with the service</li>
                                <li>Harass, abuse, or harm another person</li>
                                <li>Generate content that promotes hate speech or discrimination</li>
                            </ul>
                        </section>

                        <section className="mt-6">
                            <h2 className="text-2xl font-semibold mb-3">10. Disclaimers</h2>
                            <p>
                                THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. We do not guarantee that the service will be uninterrupted, secure, or error-free.
                            </p>
                        </section>

                        <section className="mt-6">
                            <h2 className="text-2xl font-semibold mb-3">11. Limitation of Liability</h2>
                            <p>
                                TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT WILL ARGUMENTOR BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR RELATING TO YOUR USE OF THE SERVICE.
                            </p>
                        </section>

                        <section className="mt-6">
                            <h2 className="text-2xl font-semibold mb-3">12. Changes to Terms</h2>
                            <p>
                                We reserve the right to modify these Terms at any time. We will provide notice of significant changes by posting the new Terms on our website and updating the "Last updated" date.
                            </p>
                        </section>

                        <section className="mt-6">
                            <h2 className="text-2xl font-semibold mb-3">13. Contact Information</h2>
                            <p>
                                For any questions regarding these Terms, our services, or to request support, please contact us at:
                            </p>
                            <p className="mt-2">
                                <strong>Email:</strong> support@argumentor.com<br />
                                <strong>Customer Service Hours:</strong> Monday-Friday, 9 AM - 5 PM EST
                            </p>
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Terms;
