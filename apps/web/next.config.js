/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
    transpilePackages: ["@helix/api", "@helix/auth", "@helix/db"],

    // Fail builds on TypeScript errors (matches Vercel's strict behavior)
    typescript: {
        ignoreBuildErrors: false,
    },

    // Fail builds on ESLint errors (optional, but recommended)
    eslint: {
        ignoreDuringBuilds: false,
    },
};

export default config;
