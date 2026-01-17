import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { dailyLog, streakState } from "@helix/db";
import { eq, and, gte, lte, desc } from "drizzle-orm";

// Validation Schemas
const exerciseSchema = z.object({
    name: z.string(),
    sets: z.number().int().positive(),
    reps: z.number().int().positive(),
    weight: z.number().positive(),
    weightUnit: z.enum(["kg", "lbs"]),
    notes: z.string().optional(),
});

const activityDetailsSchema = z.object({
    workoutType: z.enum(["strength", "cardio", "sports", "flexibility", "mixed"]),
    totalDuration: z.number().positive(),
    perceivedExertion: z.number().int().min(1).max(10).optional(),
    notes: z.string().optional(),
    exercises: z.array(exerciseSchema).optional(),
    cardioActivity: z.enum(["running", "cycling", "swimming", "rowing", "other"]).optional(),
    distance: z.number().positive().optional(),
    distanceUnit: z.enum(["km", "miles"]).optional(),
    averageHeartRate: z.number().int().positive().optional(),
});

const mealSchema = z.object({
    mealType: z.enum(["breakfast", "lunch", "dinner", "snack1", "snack2", "other"]),
    time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).optional(),
    calories: z.number().int().positive(),
    protein: z.number().positive(),
    carbs: z.number().positive().optional(),
    fats: z.number().positive().optional(),
    notes: z.string().optional(),
});

const nutritionDetailsSchema = z.object({
    meals: z.array(mealSchema),
    totalCarbs: z.number().positive().optional(),
    totalFats: z.number().positive().optional(),
});

const sleepDetailsSchema = z.object({
    bedtime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
    wakeTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
    quality: z.number().int().min(1).max(5),
    interruptions: z.number().int().min(0).optional(),
    notes: z.string().optional(),
});

export const dailyLogRouter = createTRPCRouter({
    // Create or update daily log
    upsert: protectedProcedure
        .input(
            z.object({
                logDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // YYYY-MM-DD
                activityMinutes: z.number().int().min(0).max(1440).optional(),
                activityIntensity: z.enum(["light", "moderate", "intense"]).optional(),
                activityDetails: activityDetailsSchema.optional(),
                totalCalories: z.number().int().min(0).max(10000).optional(),
                totalProtein: z.number().positive().max(500).optional(),
                nutritionDetails: nutritionDetailsSchema.optional(),
                sleepHours: z.number().positive().max(24).optional(),
                sleepDetails: sleepDetailsSchema.optional(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const { logDate, ...data } = input;

            // Block future dates
            const today = new Date().toISOString().split("T")[0];
            if (logDate > today!) {
                throw new Error("Cannot log data for future dates. Please select today or a past date.");
            }

            // Check if log exists for this date
            const existing = await ctx.db.query.dailyLog.findFirst({
                where: and(
                    eq(dailyLog.userId, ctx.session.user.id),
                    eq(dailyLog.logDate, logDate)
                ),
            });

            if (existing) {
                // Update existing log
                const [updated] = await ctx.db
                    .update(dailyLog)
                    .set({ ...data, updatedAt: new Date() })
                    .where(eq(dailyLog.id, existing.id))
                    .returning();
                return updated;
            } else {
                // Create new log
                const [created] = await ctx.db.insert(dailyLog).values({
                    userId: ctx.session.user.id,
                    logDate,
                    ...data,
                }).returning();
                return created;
            }
        }),

    // Get log for specific date
    getByDate: protectedProcedure
        .input(z.object({ date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/) }))
        .query(async ({ ctx, input }) => {
            const log = await ctx.db.query.dailyLog.findFirst({
                where: and(
                    eq(dailyLog.userId, ctx.session.user.id),
                    eq(dailyLog.logDate, input.date)
                ),
            });
            return log ?? null;
        }),

    // Get logs for date range (for charts/trends)
    getRange: protectedProcedure
        .input(
            z.object({
                startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
                endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
            })
        )
        .query(async ({ ctx, input }) => {
            return await ctx.db.query.dailyLog.findMany({
                where: and(
                    eq(dailyLog.userId, ctx.session.user.id),
                    gte(dailyLog.logDate, input.startDate),
                    lte(dailyLog.logDate, input.endDate)
                ),
                orderBy: [dailyLog.logDate],
            });
        }),

    // Get current streak
    getStreak: protectedProcedure.query(async ({ ctx }) => {
        const logs = await ctx.db.query.dailyLog.findMany({
            where: eq(dailyLog.userId, ctx.session.user.id),
            orderBy: [desc(dailyLog.logDate)],
            limit: 365, // Check up to 1 year
        });

        // Calculate streak (consecutive days with all three pillars logged)
        let currentStreak = 0;
        let longestStreak = 0;
        let tempStreak = 0;

        const today = new Date().toISOString().split("T")[0];
        let checkDate = new Date(today!);

        for (const log of logs) {
            const logDateStr = log.logDate;
            const expectedDateStr = checkDate.toISOString().split("T")[0];

            if (logDateStr !== expectedDateStr) break;

            // Check if all three pillars are logged
            const isComplete =
                (log.activityMinutes !== null || log.activityDetails !== null) &&
                (log.totalCalories !== null || log.nutritionDetails !== null) &&
                (log.sleepHours !== null || log.sleepDetails !== null);

            if (isComplete) {
                currentStreak++;
                tempStreak++;
                longestStreak = Math.max(longestStreak, tempStreak);
            } else {
                break;
            }

            checkDate.setDate(checkDate.getDate() - 1);
        }

        return { currentStreak, longestStreak };
    }),

    // Get weekly summary stats
    getWeeklySummary: protectedProcedure.query(async ({ ctx }) => {
        const today = new Date();
        const sevenDaysAgo = new Date(today);
        sevenDaysAgo.setDate(today.getDate() - 7);

        const logs = await ctx.db.query.dailyLog.findMany({
            where: and(
                eq(dailyLog.userId, ctx.session.user.id),
                gte(dailyLog.logDate, sevenDaysAgo.toISOString().split("T")[0]!)
            ),
        });

        const userProfile = await ctx.db.query.userProfile.findFirst({
            where: (profile, { eq }) => eq(profile.userId, ctx.session.user.id),
        });

        // Calculate adherence and goal achievement
        const daysLogged = logs.length;
        const adherenceScore = (daysLogged / 7) * 100;

        let daysGoalsMet = 0;
        logs.forEach((log) => {
            const targets = userProfile?.nutritionPreferences as any;
            const metricsTargets = userProfile?.metrics as any;

            const caloriesOnTarget =
                targets?.targetCalories &&
                log.totalCalories &&
                Math.abs(log.totalCalories - targets.targetCalories) <=
                targets.targetCalories * 0.1;

            const sleepOnTarget =
                metricsTargets?.targetSleep &&
                log.sleepHours &&
                log.sleepHours >= metricsTargets.targetSleep;

            if (caloriesOnTarget && sleepOnTarget) daysGoalsMet++;
        });

        const goalAchievementScore = (daysGoalsMet / 7) * 100;

        return {
            adherenceScore: Math.round(adherenceScore),
            goalAchievementScore: Math.round(goalAchievementScore),
            daysLogged,
            daysGoalsMet,
        };
    }),
});
