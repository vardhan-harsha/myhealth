"use client";

import { ActivityCalendar } from "react-activity-calendar";
import { useEffect, useState, useMemo } from "react";
import { useTheme } from "next-themes";

interface HealthActivityWidgetProps {
    title?: string;
    description?: string;
    className?: string;
}

// Generate sample health tracking data with a seed for consistency
// In a real app, this would come from your database
function generateSampleData(seed: number) {
    const today = new Date();
    const activityData = [];

    // Simple seeded random function for consistent results
    let random = seed;
    const seededRandom = () => {
        random = (random * 9301 + 49297) % 233280;
        return random / 233280;
    };

    // Generate activity data for the past 365 days (1 year)
    for (let i = 365; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);

        // Use seeded random for consistent results
        const shouldHaveActivity = seededRandom() > 0.3;
        const count = shouldHaveActivity ? Math.floor(seededRandom() * 10) : 0;

        activityData.push({
            date: date.toISOString().split("T")[0]!, // YYYY-MM-DD format
            count: count,
            level: count === 0 ? 0 : Math.min(Math.floor(count / 2.5) + 1, 4), // Map to 0-4 levels
        });
    }

    return activityData;
}

export function HealthActivityWidget({
    title = "Health Activity",
    description = "Your health tracking activity over the past year",
    className,
}: HealthActivityWidgetProps) {
    const [mounted, setMounted] = useState(false);
    const { theme } = useTheme();

    // Only render after mounting to avoid hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    // Generate stable data using a fixed seed
    const sampleData = useMemo(() => generateSampleData(12345), []);

    // Custom emerald green theme
    const customTheme = {
        light: [
            "hsl(var(--muted))",
            "rgb(167, 243, 208)", // emerald-200
            "rgb(110, 231, 183)", // emerald-300
            "rgb(52, 211, 153)",  // emerald-400
            "rgb(16, 185, 129)",  // emerald-500
        ],
        dark: [
            "hsl(var(--muted))",
            "rgba(6, 78, 59, 0.4)",   // emerald-900/40
            "rgba(6, 95, 70, 0.6)",   // emerald-800/60
            "rgba(4, 120, 87, 0.8)",  // emerald-700/80
            "rgba(16, 185, 129, 1)",  // emerald-500
        ],
    };

    if (!mounted) {
        // Return a skeleton/placeholder during SSR
        return (
            <div className={className}>
                <div className="rounded-lg border bg-card">
                    <div className="p-6 pb-4">
                        <h3 className="text-lg font-semibold">{title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{description}</p>
                    </div>
                    <div className="px-6 pb-6">
                        <div className="h-40 flex items-center justify-center text-muted-foreground">
                            Loading activity data...
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={className}>
            <div className="rounded-lg border bg-card">
                <div className="p-6 pb-4">
                    <h3 className="text-lg font-semibold">{title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{description}</p>
                </div>
                <div className="px-6 pb-6">
                    <ActivityCalendar
                        data={sampleData}
                        theme={customTheme}
                        colorScheme={theme === "dark" ? "dark" : "light"}
                        blockSize={12}
                        blockMargin={4}
                        fontSize={14}
                        showWeekdayLabels
                        labels={{
                            totalCount: "{{count}} activities in the last year",
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
