import { index, pgTableCreator, timestamp, date, integer, text, jsonb, real } from "drizzle-orm/pg-core";
import { user } from "./user";

/**
 * Health Tracking Schemas
 * Daily logs, streaks, and health metrics
 */

export const createTable = pgTableCreator((name) => `pg-drizzle_${name}`);

export const dailyLog = createTable(
    "daily_log",
    (d) => ({
        id: d.text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
        userId: d
            .text("user_id")
            .notNull()
            .references(() => user.id, { onDelete: "cascade" }),
        logDate: d.date("log_date", { mode: "string" }).notNull(),

        // Activity fields
        activityMinutes: d.integer("activity_minutes"),
        activityIntensity: d.text("activity_intensity"),
        activityDetails: d.jsonb("activity_details"),

        // Nutrition fields
        totalCalories: d.integer("total_calories"),
        totalProtein: d.integer("total_protein"),
        nutritionDetails: d.jsonb("nutrition_details"),

        // Sleep fields
        sleepHours: d.real("sleep_hours"),
        sleepDetails: d.jsonb("sleep_details"),

        // Metadata
        createdAt: d.timestamp("created_at").$defaultFn(() => new Date()).notNull(),
        updatedAt: d.timestamp("updated_at").$defaultFn(() => new Date()).notNull(),
    }),
    (t) => [
        index("daily_log_user_date_idx").on(t.userId, t.logDate),
        index("daily_log_date_idx").on(t.logDate),
    ]
);

export const streakState = createTable("streak_state", (d) => ({
    id: d.text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    userId: d
        .text("user_id")
        .notNull()
        .references(() => user.id, { onDelete: "cascade" })
        .unique(),
    currentStreak: d.integer("current_streak").default(0).notNull(),
    longestStreak: d.integer("longest_streak").default(0).notNull(),
    consecutiveMisses: d.integer("consecutive_misses").default(0).notNull(),
    graceDaysRemaining: d.integer("grace_days_remaining").default(2).notNull(),
    lastLogDate: d.date("last_log_date", { mode: "string" }),
    updatedAt: d.timestamp("updated_at").$defaultFn(() => new Date()).notNull(),
}));
