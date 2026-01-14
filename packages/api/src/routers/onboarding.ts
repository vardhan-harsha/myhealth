import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";
import { user, userProfile } from "@helix/db";
import { eq } from "drizzle-orm";

export const onboardingRouter = createTRPCRouter({
    getOnboardingState: protectedProcedure.query(async ({ ctx }) => {
        // Try to find existing profile
        const profile = await ctx.db.query.userProfile.findFirst({
            where: eq(userProfile.userId, ctx.session.user.id),
        });

        return profile ?? null;
    }),

    saveStep: protectedProcedure
        .input(
            z.object({
                step: z.number().min(1).max(6).optional(),
                goals: z.record(z.any()).optional(),
                metrics: z.record(z.any()).optional(),
                trainingPreferences: z.record(z.any()).optional(),
                nutritionPreferences: z.record(z.any()).optional(),
                aiCoach: z.string().optional(),
                name: z.string().optional(),
                gender: z.string().optional(),
                units: z.string().optional(),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            const { goals, metrics, trainingPreferences, nutritionPreferences, aiCoach, name, gender, units } = input;
            const userId = ctx.session.user.id;

            // Update user name if provided
            if (name) {
                await ctx.db.update(user).set({ name }).where(eq(user.id, userId));
            }

            // Check if profile exists
            const existingProfile = await ctx.db.query.userProfile.findFirst({
                where: eq(userProfile.userId, userId),
            });

            const profileData = {
                goals: goals ? goals : undefined,
                metrics: metrics ? metrics : undefined,
                trainingPreferences: trainingPreferences ? trainingPreferences : undefined,
                nutritionPreferences: nutritionPreferences ? nutritionPreferences : undefined,
                aiCoach: aiCoach ? aiCoach : undefined,
                gender: gender ? gender : undefined,
                units: units ? units : undefined,
                updatedAt: new Date(),
            };

            if (existingProfile) {
                await ctx.db
                    .update(userProfile)
                    .set(profileData)
                    .where(eq(userProfile.id, existingProfile.id));
            } else {
                await ctx.db.insert(userProfile).values({
                    id: crypto.randomUUID(),
                    userId,
                    ...profileData,
                });
            }

            return { success: true };
        }),

    completeOnboarding: protectedProcedure.mutation(async ({ ctx }) => {
        await ctx.db
            .update(user)
            .set({
                onboardingCompleted: true,
                updatedAt: new Date(),
            })
            .where(eq(user.id, ctx.session.user.id));

        return { success: true };
    }),
});
