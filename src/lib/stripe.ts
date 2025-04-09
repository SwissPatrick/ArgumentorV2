
/**
 * Stripe Integration Utilities
 *
 * Handles redirecting users to Stripe checkout for subscription purchases.
 */

import { upgradeSubscription as updateUserSubscription, subscriptionTiers } from "./subscription";


// Stripe checkout URLs for each subscription tier
const STRIPE_CHECKOUT_URLS = {
    free: "", // No checkout needed for free tier
    basic: "https://buy.stripe.com/dR6bKg7gG47Aa0o8ww", // Basic plan checkout URL
    premium: "https://buy.stripe.com/cN2dSobwWdIa8Wk5kl", // Premium plan checkout URL
};

/**
 * Redirects the user to Stripe checkout for a specific subscription tier
 */
export const redirectToStripeCheckout = (tierId: string, userId?: string) => {
    const checkoutUrl = STRIPE_CHECKOUT_URLS[tierId as keyof typeof STRIPE_CHECKOUT_URLS];

    if (!checkoutUrl && tierId !== 'free') {
        console.error(`No Stripe checkout URL found for tier: ${tierId}`);
        return false;
    }

    // Free tier doesn't need checkout
    if (tierId === 'free') {
        return true;
    }

    // Redirect to Stripe checkout, adding user ID as a parameter
    const urlWithParams = `${checkoutUrl}?client_reference_id=${encodeURIComponent(userId || '')}`;
    window.location.href = urlWithParams;
    return true;
};

/**
 * Verifies a Stripe purchase and activates the subscription
 * This would normally be handled by a webhook in a production environment
 */
export const verifyStripePurchase = async (tierId: string, userId: string): Promise<boolean> => {
    // In a real implementation, this would verify the purchase with Stripe's API
    // For now, we'll just simulate a successful purchase by updating the user's subscription

    try {
        // Update the user's subscription
        return await updateUserSubscription(tierId);
    } catch (error) {
        console.error("Error verifying Stripe purchase:", error);
        return false;
    }
};

// Export the upgradeSubscription function directly
export { updateUserSubscription as upgradeSubscription };
