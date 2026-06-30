import { describe, it, expect, vi, beforeEach } from "vitest";
import { createCaller } from "../../root";
import { createMockDb, createMockSession, createTestContext } from "../helpers/mock-context";

describe("dailyLogRouter", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("upsert", () => {
    it("rejects logs for future dates", async () => {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 1);
      const futureDateStr = futureDate.toISOString().split("T")[0]!;

      const caller = createCaller(
        createTestContext({ session: createMockSession() }),
      );

      await expect(
        caller.dailyLog.upsert({
          logDate: futureDateStr,
          activityMinutes: 30,
        }),
      ).rejects.toThrow("Cannot log data for future dates");
    });

    it("creates a new log when none exists for the date", async () => {
      const today = new Date().toISOString().split("T")[0]!;
      const returning = vi.fn().mockResolvedValue([
        { id: "log-1", logDate: today, activityMinutes: 45 },
      ]);

      const mockDb = createMockDb({
        query: {
          dailyLog: {
            findFirst: vi.fn().mockResolvedValue(null),
            findMany: vi.fn().mockResolvedValue([]),
          },
          posts: { findFirst: vi.fn() },
          userProfile: { findFirst: vi.fn() },
        },
        insert: vi.fn().mockReturnValue({
          values: vi.fn().mockReturnValue({ returning }),
        }),
      });

      const caller = createCaller(
        createTestContext({
          session: createMockSession({ id: "user-abc" }),
          db: mockDb,
        }),
      );

      const result = await caller.dailyLog.upsert({
        logDate: today,
        activityMinutes: 45,
        activityIntensity: "moderate",
      });

      expect(result).toEqual(
        expect.objectContaining({ id: "log-1", activityMinutes: 45 }),
      );
      expect(mockDb.insert).toHaveBeenCalled();
    });

    it("updates an existing log for the same date", async () => {
      const today = new Date().toISOString().split("T")[0]!;
      const existingLog = { id: "log-existing", logDate: today, userId: "user-abc" };
      const returning = vi.fn().mockResolvedValue([
        { ...existingLog, sleepHours: 8 },
      ]);

      const mockDb = createMockDb({
        query: {
          dailyLog: {
            findFirst: vi.fn().mockResolvedValue(existingLog),
            findMany: vi.fn().mockResolvedValue([]),
          },
          posts: { findFirst: vi.fn() },
          userProfile: { findFirst: vi.fn() },
        },
        update: vi.fn().mockReturnValue({
          set: vi.fn().mockReturnValue({
            where: vi.fn().mockReturnValue({ returning }),
          }),
        }),
      });

      const caller = createCaller(
        createTestContext({
          session: createMockSession({ id: "user-abc" }),
          db: mockDb,
        }),
      );

      const result = await caller.dailyLog.upsert({
        logDate: today,
        sleepHours: 8,
      });

      expect(result).toEqual(expect.objectContaining({ sleepHours: 8 }));
      expect(mockDb.update).toHaveBeenCalled();
    });
  });

  describe("getByDate", () => {
    it("returns null when no log exists for the date", async () => {
      const caller = createCaller(
        createTestContext({ session: createMockSession() }),
      );

      const result = await caller.dailyLog.getByDate({ date: "2024-06-01" });

      expect(result).toBeNull();
    });
  });

  describe("getStreak", () => {
    it("returns zero streak when no logs exist", async () => {
      const caller = createCaller(
        createTestContext({ session: createMockSession() }),
      );

      const result = await caller.dailyLog.getStreak();

      expect(result).toEqual({ currentStreak: 0, longestStreak: 0 });
    });
  });
});
