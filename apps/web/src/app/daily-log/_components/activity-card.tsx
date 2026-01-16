"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Dumbbell } from "lucide-react";
import { api } from "@/trpc/react";
import { useToast } from "@/hooks/use-toast";

interface DailyLogData {
    activityMinutes?: number | null;
    activityIntensity?: "light" | "moderate" | "intense" | null;
}

interface ActivityCardProps {
    logDate: string;
    initialData: DailyLogData | null;
}

export function ActivityCard({ logDate, initialData }: ActivityCardProps) {
    const { toast } = useToast();
    const [activityMinutes, setActivityMinutes] = useState(
        initialData?.activityMinutes?.toString() ?? ""
    );
    const [intensity, setIntensity] = useState<"light" | "moderate" | "intense">(
        initialData?.activityIntensity ?? "moderate"
    );

    const upsertMutation = api.dailyLog.upsert.useMutation({
        onSuccess: () => {
            toast({
                title: "Activity logged",
                description: "Your activity has been saved successfully.",
            });
        },
        onError: (error) => {
            toast({
                title: "Error",
                description: error.message,
                variant: "destructive",
            });
        },
    });

    const handleSave = () => {
        upsertMutation.mutate({
            logDate,
            activityMinutes: activityMinutes ? parseInt(activityMinutes) : undefined,
            activityIntensity: activityMinutes ? intensity : undefined,
        });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Dumbbell className="h-5 w-5" />
                    Activity & Training
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="activity-minutes">Activity Minutes</Label>
                    <Input
                        id="activity-minutes"
                        type="number"
                        placeholder="e.g., 45"
                        value={activityMinutes}
                        onChange={(e) => setActivityMinutes(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                        Total active minutes today
                    </p>
                </div>

                <div className="space-y-2">
                    <Label>Intensity</Label>
                    <div className="flex gap-2">
                        {(["light", "moderate", "intense"] as const).map((level) => (
                            <Button
                                key={level}
                                variant={intensity === level ? "default" : "outline"}
                                onClick={() => setIntensity(level)}
                                className="flex-1 capitalize"
                            >
                                {level}
                            </Button>
                        ))}
                    </div>
                </div>

                <Button onClick={handleSave} disabled={upsertMutation.isPending} className="w-full">
                    {upsertMutation.isPending ? "Saving..." : "Save Activity"}
                </Button>
            </CardContent>
        </Card>
    );
}
