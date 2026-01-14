import { createAuthClient } from "better-auth/react";

// Determine the base URL for the client
// In the browser, use the current origin
// During SSR, use localhost for development or VERCEL_URL for production
const getClientBaseURL = () => {
    // Client-side: use the current window location
    if (typeof window !== "undefined") {
        return window.location.origin;
    }

    // Server-side (SSR): use environment variables
    if (process.env.BETTER_AUTH_URL) {
        return process.env.BETTER_AUTH_URL;
    }

    if (process.env.VERCEL_URL) {
        return `https://${process.env.VERCEL_URL}`;
    }

    return "http://localhost:3000";
};

export const authClient = createAuthClient({
    baseURL: getClientBaseURL(),
});

export const { useSession } = authClient;
