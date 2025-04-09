
/**
 * CSRF Protection Utility
 *
 * Generates and validates CSRF tokens to protect forms against Cross-Site Request Forgery attacks.
 */

// Generate a random token
export const generateCSRFToken = (): string => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const tokenLength = 32;
    let token = '';

    for (let i = 0; i < tokenLength; i++) {
        token += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    // Store token in localStorage with expiration time
    const expiryTime = Date.now() + (60 * 60 * 1000); // 1 hour expiry
    localStorage.setItem('csrfToken', token);
    localStorage.setItem('csrfTokenExpiry', expiryTime.toString());

    return token;
};

// Validate a token against the stored token
export const validateCSRFToken = (token: string): boolean => {
    const storedToken = localStorage.getItem('csrfToken');
    const expiryTime = localStorage.getItem('csrfTokenExpiry');

    // Check if token exists and hasn't expired
    if (!storedToken || !expiryTime) {
        return false;
    }

    // Check if token has expired
    if (Date.now() > parseInt(expiryTime)) {
        // Clean up expired token
        localStorage.removeItem('csrfToken');
        localStorage.removeItem('csrfTokenExpiry');
        return false;
    }

    // Check if tokens match
    return token === storedToken;
};
