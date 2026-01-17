"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { api } from "@/trpc/react";

export function QuickInsights() {
    const { data: summary } = api.dailyLog.getWeeklySummary.useQuery();

    if (!summary) {
        return null;
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Quick Insights
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Adherence Score</p>
                        <p className="text-2xl font-bold">{summary.adherenceScore}%</p>
                        <p className="text-xs text-muted-foreground">
                            {summary.daysLogged}/7 days logged
                        </p>
                    </div>

                    <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Goal Achievement</p>
                        <p className="text-2xl font-bold">{summary.goalAchievementScore}%</p>
                        <p className="text-xs text-muted-foreground">
                            {summary.daysGoalsMet}/7 days on target
                        </p>
                    </div>

                    <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Trend</p>
                        <p className="text-2xl font-bold">
                            {summary.adherenceScore >= 80 ? "↑" : summary.adherenceScore >= 50 ? "→" : "↓"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                            {summary.adherenceScore >= 80 ? "Improving" : summary.adherenceScore >= 50 ? "Stable" : "Needs attention"}
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
