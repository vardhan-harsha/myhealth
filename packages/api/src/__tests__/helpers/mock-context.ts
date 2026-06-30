import type { createTRPCContext } from "../../trpc";

/** Inferred tRPC context type used by router callers in tests. */
export type TestContext = Awaited<ReturnType<typeof createTRPCContext>>;

/** Minimal authenticated user shape for protected procedure tests. */
export interface MockUser {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  image?: string | null;
}

/**
 * Creates a mock authenticated session compatible with Better Auth's session shape.
 *
 * @param user - Optional user overrides; defaults to a test user.
 * @returns A session object suitable for tRPC protected procedure tests.
 */
export function createMockSession(user?: Partial<MockUser>) {
  const defaultUser: MockUser = {
    id: "test-user-id",
    name: "Test User",
    email: "test@helix.app",
    emailVerified: true,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
    image: null,
    ...user,
  };

  return {
    session: {
      id: "test-session-id",
      userId: defaultUser.id,
      expiresAt: new Date(Date.now() + 86_400_000),
      token: "test-token",
      createdAt: new Date("2024-01-01"),
      updatedAt: new Date("2024-01-01"),
    },
    user: defaultUser,
  };
}

/**
 * Builds a lightweight mock Drizzle database for router unit tests.
 * Override specific query/ mutation methods per test as needed.
 *
 * @param overrides - Partial mock db methods to merge into the default stub.
 * @returns A mock database object assignable to the tRPC context `db` field.
 */
export function createMockDb(overrides: Record<string, unknown> = {}) {
  return {
    query: {
      dailyLog: {
        findFirst: async () => null,
        findMany: async () => [],
      },
      posts: {
        findFirst: async () => null,
      },
      userProfile: {
        findFirst: async () => null,
      },
    },
    insert: () => ({
      values: () => ({
        returning: async () => [{ id: "new-id" }],
      }),
    }),
    update: () => ({
      set: () => ({
        where: () => ({
          returning: async () => [{ id: "updated-id" }],
        }),
      }),
    }),
    ...overrides,
  };
}

/**
 * Creates a complete tRPC test context with optional session and db overrides.
 *
 * @param options - Session and database mock overrides.
 * @returns A context object ready to pass to `createCaller`.
 */
export function createTestContext(options?: {
  session?: ReturnType<typeof createMockSession> | null;
  db?: ReturnType<typeof createMockDb>;
}): TestContext {
  return {
    db: (options?.db ?? createMockDb()) as TestContext["db"],
    session: options?.session ?? null,
    headers: new Headers(),
  };
}
