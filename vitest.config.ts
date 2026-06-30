import { defineConfig } from "vitest/config";

/**
 * Root Vitest configuration for the Helix monorepo.
 * Uses Vitest 4 projects to run tests in @helix/api and @helix/web.
 *
 * @see https://vitest.dev/guide/projects
 */
export default defineConfig({
  test: {
    projects: ["packages/api", "apps/web", "apps/mobile"],
  },
});
