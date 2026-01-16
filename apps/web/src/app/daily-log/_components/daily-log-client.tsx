"use client";

import { useState } from "react";
import { DateSelector } from "./date-selector";
import { StreakDisplay } from "./streak-display";
import { ActivityCard } from "./activity-card";
import { NutritionCard } from "./nutrition-card";
import { SleepCard } from "./sleep-card";
import { QuickInsights } from "./quick-insights";
import { api } from "@/trpc/react";

interface DailyLogClientProps {
    initialLog: any;
    initialStreak: { currentStreak: number; longestStreak: number };
    initialDate: string;
}

export function DailyLogClient({ initialLog, initialStreak, initialDate }: DailyLogClientProps) {
    const [selectedDate, setSelectedDate] = useState(initialDate);

    // Fetch log data for selected date
    const { data: logData, isLoading } = api.dailyLog.getByDate.useQuery(
        { date: selectedDate }
    );

    const { data: streakData } = api.dailyLog.getStreak.useQuery(undefined, {
        initialData: initialStreak,
    });

    return (
        <div className="space-y-6">
            {/* Header with Date Selector and Streak */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Daily Log</h1>
                    <p className="text-muted-foreground">
                        Track your activity, nutrition, and sleep
                    </p>
                </div>
                <StreakDisplay
                    currentStreak={streakData?.currentStreak ?? 0}
                    longestStreak={streakData?.longestStreak ?? 0}
                />
            </div>

            {/* Date Selector */}
            <DateSelector
                selectedDate={selectedDate}
                onDateChange={setSelectedDate}
            />

            {/* Loading State */}
            {isLoading && (
                <div className="flex items-center justify-center py-12">
                    <div className="text-muted-foreground">Loading...</div>
                </div>
            )}

            {/* Main Content */}
            {!isLoading && (
                <div className="grid gap-6">
                    <ActivityCard
                        logDate={selectedDate}
                        initialData={logData ?? null}
                    />
                    <NutritionCard
                        logDate={selectedDate}
                        initialData={logData ?? null}
                    />
                    <SleepCard
                        logDate={selectedDate}
                        initialData={logData ?? null}
                    />
                    <QuickInsights />
                </div>
            )}
        </div>
    );
}
