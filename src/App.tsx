
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { AuthProvider } from "@/components/auth/AuthProvider";
import Index from "./pages/Index";
import Builder from "./pages/Builder";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Pricing from "./pages/Pricing";
import ArgumentInfo from "./pages/ArgumentInfo";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Contact from "./pages/Contact";
import Auth from "./pages/Auth";
import HowItWorks from "./pages/HowItWorks";
import MyArguments from "./pages/MyArguments";
import Examples from "./pages/Examples";
import Tutorials from "./pages/Tutorials";
import StripeSuccess from "./pages/StripeSuccess";
import VerifyEmail from "./pages/VerifyEmail";
import Account from "./pages/Account";

const queryClient = new QueryClient();

const App = () => (
    <QueryClientProvider client={queryClient}>
        <TooltipProvider>
            <AuthProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Index />} />
                        <Route path="/argument-info" element={<ArgumentInfo />} />
                        <Route
                            path="/builder"
                            element={
                                <ProtectedRoute>
                                    <Builder />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/my-arguments"
                            element={
                                <ProtectedRoute>
                                    <MyArguments />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/account"
                            element={
                                <ProtectedRoute>
                                    <Account />
                                </ProtectedRoute>
                            }
                        />
                        <Route path="/how-it-works" element={<HowItWorks />} />
                        <Route path="/examples" element={<Examples />} />
                        <Route path="/tutorials" element={<Tutorials />} />
                        <Route path="/pricing" element={<Pricing />} />
                        <Route path="/payment-success" element={<StripeSuccess />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/privacy" element={<Privacy />} />
                        <Route path="/terms" element={<Terms />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/auth" element={<Auth />} />
                        <Route path="/verify-email" element={<VerifyEmail />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </BrowserRouter>
                <Analytics />
            </AuthProvider>
        </TooltipProvider>
    </QueryClientProvider>
);

export default App;
