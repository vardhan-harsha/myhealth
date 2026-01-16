"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Moon } from "lucide-react";
import { api } from "@/trpc/react";
import { useToast } from "@/hooks/use-toast";

interface SleepCardProps {
    logDate: string;
    initialData: any;
}

export function SleepCard({ logDate, initialData }: SleepCardProps) {
    const { toast } = useToast();
    const [sleepHours, setSleepHours] = useState(
        initialData?.sleepHours?.toString() ?? ""
    );

    const upsertMutation = api.dailyLog.upsert.useMutation({
        onSuccess: () => {
            toast({
                title: "Sleep logged",
                description: "Your sleep has been saved successfully.",
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
            sleepHours: sleepHours ? parseFloat(sleepHours) : undefined,
        });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Moon className="h-5 w-5" />
                    Sleep & Recovery
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="sleep-hours">Hours Slept</Label>
                    <Input
                        id="sleep-hours"
                        type="number"
                        step="0.5"
                        placeholder="e.g., 7.5"
                        value={sleepHours}
                        onChange={(e) => setSleepHours(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                        Total hours of sleep
                    </p>
                </div>

                <Button onClick={handleSave} disabled={upsertMutation.isPending} className="w-full">
                    {upsertMutation.isPending ? "Saving..." : "Save Sleep"}
                </Button>
            </CardContent>
        </Card>
    );
}
