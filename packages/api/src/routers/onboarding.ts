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
                step: z.number().min(1).max(6).optional(), // Track current step number if needed
                goals: z.record(z.any()).optional(),
                metrics: z.record(z.any()).optional(),
                trainingPreferences: z.record(z.any()).optional(),
                nutritionPreferences: z.record(z.any()).optional(),
                aiCoach: z.string().optional(),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            const { goals, metrics, trainingPreferences, nutritionPreferences, aiCoach } = input;
            const userId = ctx.session.user.id;

            // Check if profile exists
            const existingProfile = await ctx.db.query.userProfile.findFirst({
                where: eq(userProfile.userId, userId),
            });

            if (existingProfile) {
                // Update existing profile
                await ctx.db
                    .update(userProfile)
                    .set({
                        goals: goals ? goals : undefined,
                        metrics: metrics ? metrics : undefined,
                        trainingPreferences: trainingPreferences ? trainingPreferences : undefined,
                        nutritionPreferences: nutritionPreferences ? nutritionPreferences : undefined,
                        aiCoach: aiCoach ? aiCoach : undefined,
                        updatedAt: new Date(),
                    })
                    .where(eq(userProfile.id, existingProfile.id));
            } else {
                // Create new profile
                await ctx.db.insert(userProfile).values({
                    id: crypto.randomUUID(), // Or let DB generate if default fn is set in schema
                    userId,
                    goals,
                    metrics,
                    trainingPreferences,
                    nutritionPreferences,
                    aiCoach,
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
