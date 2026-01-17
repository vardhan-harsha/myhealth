"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Apple } from "lucide-react";
import { api } from "@/trpc/react";
import { useToast } from "@/hooks/use-toast";

interface DailyLogData {
    totalCalories?: number | null;
    totalProtein?: number | null;
}

interface NutritionCardProps {
    logDate: string;
    initialData: DailyLogData | null;
}

export function NutritionCard({ logDate, initialData }: NutritionCardProps) {
    const { toast } = useToast();
    const [calories, setCalories] = useState(
        initialData?.totalCalories?.toString() ?? ""
    );
    const [protein, setProtein] = useState(
        initialData?.totalProtein?.toString() ?? ""
    );

    const upsertMutation = api.dailyLog.upsert.useMutation({
        onSuccess: () => {
            toast({
                title: "Nutrition logged",
                description: "Your nutrition has been saved successfully.",
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
            totalCalories: calories ? parseInt(calories) : undefined,
            totalProtein: protein ? parseFloat(protein) : undefined,
        });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Apple className="h-5 w-5" />
                    Nutrition & Calories
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="calories">Total Calories</Label>
                    <Input
                        id="calories"
                        type="number"
                        placeholder="e.g., 2400"
                        value={calories}
                        onChange={(e) => setCalories(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                        Total calories consumed today
                    </p>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="protein">Protein (g)</Label>
                    <Input
                        id="protein"
                        type="number"
                        placeholder="e.g., 180"
                        value={protein}
                        onChange={(e) => setProtein(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">Grams of protein</p>
                </div>

                <Button onClick={handleSave} disabled={upsertMutation.isPending} className="w-full">
                    {upsertMutation.isPending ? "Saving..." : "Save Nutrition"}
                </Button>
            </CardContent>
        </Card>
    );
}
