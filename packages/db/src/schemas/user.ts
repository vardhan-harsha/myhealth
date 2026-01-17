import { pgTable, text, timestamp, boolean, jsonb } from "drizzle-orm/pg-core";

/**
 * User & Profile Schemas
 */

export const user = pgTable("user", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    emailVerified: boolean("email_verified")
        .$defaultFn(() => false)
        .notNull(),
    image: text("image"),
    createdAt: timestamp("created_at")
        .$defaultFn(() => new Date())
        .notNull(),
    updatedAt: timestamp("updated_at")
        .$defaultFn(() => new Date())
        .notNull(),
    onboardingCompleted: boolean("onboarding_completed").default(false).notNull(),
});

export const userProfile = pgTable("user_profile", {
    id: text("id").primaryKey(),
    userId: text("user_id")
        .notNull()
        .references(() => user.id, { onDelete: "cascade" }),
    goals: jsonb("goals"),
    metrics: jsonb("metrics"),
    trainingPreferences: jsonb("training_preferences"),
    nutritionPreferences: jsonb("nutrition_preferences"),
    aiCoach: text("ai_coach"),
    gender: text("gender"),
    units: text("units"),
    createdAt: timestamp("created_at")
        .$defaultFn(() => new Date())
        .notNull(),
    updatedAt: timestamp("updated_at")
        .$defaultFn(() => new Date())
        .notNull(),
});
