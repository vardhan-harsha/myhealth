import { vi } from "vitest";

/**
 * Global test setup for @helix/api.
 * Mocks auth/db modules so router tests run without real credentials or Postgres.
 */
process.env.NODE_ENV = "test";
process.env.DATABASE_URL = "postgresql://test:test@localhost:5432/helix_test";
process.env.BETTER_AUTH_SECRET = "test-auth-secret";
process.env.BETTER_AUTH_GITHUB_CLIENT_ID = "test-github-client-id";
process.env.BETTER_AUTH_GITHUB_CLIENT_SECRET = "test-github-client-secret";
process.env.BETTER_AUTH_GOOGLE_CLIENT_ID = "test-google-client-id";
process.env.BETTER_AUTH_GOOGLE_CLIENT_SECRET = "test-google-client-secret";
process.env.BETTER_AUTH_MICROSOFT_CLIENT_ID = "test-microsoft-client-id";
process.env.BETTER_AUTH_MICROSOFT_CLIENT_SECRET = "test-microsoft-client-secret";
process.env.RESEND_API_KEY = "re_test_key";

vi.mock("@helix/db", async () => {
  const schemas = await import("../db/src/schemas/index.ts");
  return {
    ...schemas,
    db: {},
  };
});

vi.mock("@helix/auth", () => ({
  auth: {
    api: {
      getSession: vi.fn().mockResolvedValue(null),
    },
  },
}));
