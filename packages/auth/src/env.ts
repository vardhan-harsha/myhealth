import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
    server: {
        BETTER_AUTH_SECRET: process.env.NODE_ENV === "production" ? z.string() : z.string().optional(),
        BETTER_AUTH_URL: z.string().optional(),
        BETTER_AUTH_GITHUB_CLIENT_ID: z.string(),
        BETTER_AUTH_GITHUB_CLIENT_SECRET: z.string(),
        BETTER_AUTH_GOOGLE_CLIENT_ID: z.string(),
        BETTER_AUTH_GOOGLE_CLIENT_SECRET: z.string(),
        BETTER_AUTH_MICROSOFT_CLIENT_ID: z.string(),
        BETTER_AUTH_MICROSOFT_CLIENT_SECRET: z.string(),
        RESEND_API_KEY: z.string(),
        EMAIL_FROM: z.string().email().default("onboarding@resend.dev"),
        NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    },
    runtimeEnv: process.env,
    emptyStringAsUndefined: true,
});
