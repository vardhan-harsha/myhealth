import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { env } from "@/env";
import { db } from "@/server/db";
import { Resend } from "resend";

const resend = new Resend(env.RESEND_API_KEY);

export const auth = betterAuth({
  baseURL: "http://localhost:3000",
  trustedOrigins: ["http://localhost:3000"],
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
          subject: "Reset your password - SoloFounder",
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
      redirectURI: "http://localhost:3000/api/auth/callback/github",
    },
    google: {
      clientId: env.BETTER_AUTH_GOOGLE_CLIENT_ID,
      clientSecret: env.BETTER_AUTH_GOOGLE_CLIENT_SECRET,
      redirectURI: "http://localhost:3000/api/auth/callback/google",
    },
    microsoft: {
      clientId: env.BETTER_AUTH_MICROSOFT_CLIENT_ID,
      clientSecret: env.BETTER_AUTH_MICROSOFT_CLIENT_SECRET,
      redirectURI: "http://localhost:3000/api/auth/callback/microsoft",
    },
  }
});

export type Session = typeof auth.$Infer.Session;
