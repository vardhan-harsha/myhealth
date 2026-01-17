"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Flame } from "lucide-react";

interface StreakDisplayProps {
    currentStreak: number;
    longestStreak: number;
}

export function StreakDisplay({ currentStreak, longestStreak }: StreakDisplayProps) {
    const percentage = longestStreak > 0 ? (currentStreak / longestStreak) * 100 : 0;

    return (
        <Card className="w-full md:w-auto">
            <CardContent className="flex items-center gap-4 p-4">
                <div className="flex items-center gap-2">
                    <Flame className="h-6 w-6 text-orange-500" />
                    <div>
                        <div className="text-2xl font-bold">{currentStreak}</div>
                        <div className="text-xs text-muted-foreground">Day Streak</div>
                    </div>
                </div>

                {longestStreak > 0 && (
                    <div className="flex flex-col gap-1">
                        <div className="text-xs text-muted-foreground">
                            Personal Best: {longestStreak}
                        </div>
                        <div className="h-2 w-24 overflow-hidden rounded-full bg-secondary">
                            <div
                                className="h-full bg-orange-500 transition-all"
                                style={{ width: `${percentage}%` }}
                            />
                        </div>
                    </div>
                )}

                {currentStreak > 0 && (
                    <Badge variant="secondary" className="ml-auto">
                        {currentStreak >= 7 ? "🔥 On Fire!" : "Keep it going!"}
                    </Badge>
                )}
            </CardContent>
        </Card>
    );
}
