import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { env } from "./env";
import { db } from "@helix/db";
import { Resend } from "resend";

const resend = new Resend(env.RESEND_API_KEY);

// Determine the base URL based on environment
const getBaseURL = () => {
  // 1. Use BETTER_AUTH_URL if explicitly set
  if (process.env.BETTER_AUTH_URL) {
    return process.env.BETTER_AUTH_URL;
  }

  // 2. Use VERCEL_URL in production/preview (Vercel automatically sets this)
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  // 3. Fallback to localhost for development
  return "http://localhost:3000";
};

const baseURL = getBaseURL();

export const auth = betterAuth({
  baseURL,
  trustedOrigins: [baseURL],
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
    async sendResetPassword({ user, url }) {
      try {
        console.log('📧 Attempting to send password reset email to:', user.email);
        console.log('🔗 Reset URL:', url);

        const result = await resend.emails.send({
          from: env.EMAIL_FROM,
          to: user.email,
          subject: "Reset your password - Helix",
          html: `Click the link below to reset your password: <a href="${url}">${url}</a>`,
        });

        // Resend returns errors in the response, not as thrown exceptions
        if (result.error) {
          console.error('❌ Resend API error:', result.error);
          throw new Error(`Failed to send email: ${result.error.message}`);
        }

        console.log('✅ Email sent successfully! ID:', result.data?.id);
      } catch (error) {
        console.error('❌ Failed to send password reset email:', error);
        throw error;
      }
    },
  },
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["github", "google", "microsoft"],
    },
  },
  socialProviders: {
    github: {
      clientId: env.BETTER_AUTH_GITHUB_CLIENT_ID,
      clientSecret: env.BETTER_AUTH_GITHUB_CLIENT_SECRET,
      redirectURI: `${baseURL}/api/auth/callback/github`,
    },
    google: {
      clientId: env.BETTER_AUTH_GOOGLE_CLIENT_ID,
      clientSecret: env.BETTER_AUTH_GOOGLE_CLIENT_SECRET,
      redirectURI: `${baseURL}/api/auth/callback/google`,
    },
    microsoft: {
      clientId: env.BETTER_AUTH_MICROSOFT_CLIENT_ID,
      clientSecret: env.BETTER_AUTH_MICROSOFT_CLIENT_SECRET,
      redirectURI: `${baseURL}/api/auth/callback/microsoft`,
    },
  }
});

export type Session = typeof auth.$Infer.Session;
