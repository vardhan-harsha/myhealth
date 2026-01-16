import { relations } from "drizzle-orm";
import { user, userProfile } from "./user";
import { account, session } from "./auth";
import { dailyLog, streakState } from "./health";

/**
 * Database Relations
 * Defines relationships between tables
 */

export const userRelations = relations(user, ({ many, one }) => ({
    account: many(account),
    session: many(session),
    userProfile: one(userProfile),
    dailyLogs: many(dailyLog),
    streakState: one(streakState),
}));

export const userProfileRelations = relations(userProfile, ({ one }) => ({
    user: one(user, { fields: [userProfile.userId], references: [user.id] }),
}));

export const accountRelations = relations(account, ({ one }) => ({
    user: one(user, { fields: [account.userId], references: [user.id] }),
}));

export const sessionRelations = relations(session, ({ one }) => ({
    user: one(user, { fields: [session.userId], references: [user.id] }),
}));

export const dailyLogRelations = relations(dailyLog, ({ one }) => ({
    user: one(user, { fields: [dailyLog.userId], references: [user.id] }),
}));

export const streakStateRelations = relations(streakState, ({ one }) => ({
    user: one(user, { fields: [streakState.userId], references: [user.id] }),
}));
