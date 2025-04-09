
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

    // Add parameters to the success URL to identify the tier and user
    const successUrl = `${window.location.origin}/payment-success?tier=${encodeURIComponent(tierId)}`;

    // Redirect to Stripe checkout, adding user ID as a parameter
    const urlWithParams = `${checkoutUrl}?client_reference_id=${encodeURIComponent(userId || '')}&success_url=${encodeURIComponent(successUrl)}`;
    console.log(`Redirecting to Stripe checkout for tier: ${tierId}`, { urlWithParams });
    window.location.href = urlWithParams;
    return true;
};

/**
 * Verifies a Stripe purchase and activates the subscription
 * This would normally be handled by a webhook in a production environment
 */
export const verifyStripePurchase = async (tierId: string, userId: string): Promise<boolean> => {
    // In a real implementation, this would verify the purchase with Stripe's API
    // For now, we'll simulate a successful purchase by updating the user's subscription

    console.log(`Verifying Stripe purchase for tier: ${tierId} and user: ${userId}`);

    try {
        // Get the tier information to confirm what credits should be assigned
        const tierInfo = subscriptionTiers.find(tier => tier.id === tierId);

        if (!tierInfo) {
            console.error(`Invalid tier ID in verification: ${tierId}`);
            return false;
        }

        console.log(`Upgrading subscription to ${tierInfo.name} with ${tierInfo.basicCredits} basic credits and ${tierInfo.advancedCredits} advanced credits`);

        // Update the user's subscription
        const success = await updateUserSubscription(tierId);

        if (success) {
            console.log(`Subscription successfully upgraded to ${tierInfo.name}`);
        } else {
            console.error(`Failed to upgrade subscription to ${tierInfo.name}`);
        }

        return success;
    } catch (error) {
        console.error("Error verifying Stripe purchase:", error);
        return false;
    }
};

// Export the upgradeSubscription function directly
export { updateUserSubscription as upgradeSubscription };
