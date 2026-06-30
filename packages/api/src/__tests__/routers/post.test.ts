import { describe, it, expect, vi, beforeEach } from "vitest";
import { TRPCError } from "@trpc/server";
import { createCaller } from "../../root";
import { createMockDb, createMockSession, createTestContext } from "../helpers/mock-context";

describe("postRouter", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("hello", () => {
    it("returns a greeting for the given text", async () => {
      const caller = createCaller(createTestContext());

      const result = await caller.post.hello({ text: "Helix" });

      expect(result).toEqual({ greeting: "Hello Helix" });
    });
  });

  describe("getSecretMessage", () => {
    it("throws UNAUTHORIZED when no session is present", async () => {
      const caller = createCaller(createTestContext({ session: null }));

      await expect(caller.post.getSecretMessage()).rejects.toThrow(TRPCError);
      await expect(caller.post.getSecretMessage()).rejects.toMatchObject({
        code: "UNAUTHORIZED",
      });
    });

    it("returns the secret message for authenticated users", async () => {
      const caller = createCaller(
        createTestContext({ session: createMockSession() }),
      );

      const result = await caller.post.getSecretMessage();

      expect(result).toBe("you can now see this secret message!");
    });
  });

  describe("create", () => {
    it("inserts a post with the authenticated user id", async () => {
      const insertValues = vi.fn().mockResolvedValue(undefined);
      const mockDb = createMockDb({
        insert: vi.fn().mockReturnValue({ values: insertValues }),
      });

      const caller = createCaller(
        createTestContext({
          session: createMockSession({ id: "user-123" }),
          db: mockDb,
        }),
      );

      await caller.post.create({ name: "My first post" });

      expect(mockDb.insert).toHaveBeenCalled();
      expect(insertValues).toHaveBeenCalledWith({
        name: "My first post",
        createdById: "user-123",
      });
    });
  });

  describe("getLatest", () => {
    it("returns the most recent post or null", async () => {
      const latestPost = {
        id: "post-1",
        name: "Latest",
        createdAt: new Date(),
        createdById: "user-123",
      };

      const mockDb = createMockDb({
        query: {
          posts: {
            findFirst: vi.fn().mockResolvedValue(latestPost),
          },
        },
      });

      const caller = createCaller(
        createTestContext({
          session: createMockSession(),
          db: mockDb,
        }),
      );

      const result = await caller.post.getLatest();

      expect(result).toEqual(latestPost);
    });
  });
});
