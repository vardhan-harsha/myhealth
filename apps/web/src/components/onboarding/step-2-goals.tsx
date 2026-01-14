import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Dumbbell, Heart, Timer, Zap, Scale, Brain } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const GOALS = [
    { id: "lose_weight", label: "Lose Weight", icon: Scale, desc: "Shed fat & get lean" },
    { id: "build_muscle", label: "Build Muscle", icon: Dumbbell, desc: "Gain size & strength" },
    { id: "endurance", label: "Improve Endurance", icon: Zap, desc: "Run further & faster" },
    { id: "longevity", label: "Boost Longevity", icon: Heart, desc: "Health span focus" },
];

const CHALLENGES = [
    "Time Management",
    "Motivation",
    "Consistency",
    "Nutrition Knowledge",
    "Injury History",
    "Stress / Sleep",
    "Budget"
];

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

export function Step2Goals({ onNext, onBack, data }: { onNext: (data: any) => void; onBack: () => void; data: any }) {
    const [primaryGoal, setPrimaryGoal] = useState<string>(data.goals?.primary || "");
    const [challenges, setChallenges] = useState<string[]>(data.goals?.challenges || []);

    const toggleChallenge = (challenge: string) => {
        if (challenges.includes(challenge)) {
            setChallenges(challenges.filter(c => c !== challenge));
        } else {
            if (challenges.length >= 3) return toast.warning("Select top 3 challenges");
            setChallenges([...challenges, challenge]);
        }
    };

    const handleSubmit = () => {
        if (!primaryGoal) return toast.error("Please select a primary goal");

        onNext({
            goals: {
                primary: primaryGoal,
                challenges
            }
        });
    };

    return (
        <motion.div
            className="w-full max-w-2xl mx-auto"
            variants={container}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, y: -20 }}
        >
            <Card className="border-none shadow-lg bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
                        Define your mission
                    </CardTitle>
                    <CardDescription>
                        What's the main thing you want to achieve with Helix?
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">

                    <motion.div variants={item} className="space-y-3">
                        <Label className="text-base">Primary Goal (Select one)</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {GOALS.map((goal) => {
                                const Icon = goal.icon;
                                const isSelected = primaryGoal === goal.id;
                                return (
                                    <motion.div
                                        key={goal.id}
                                        onClick={() => setPrimaryGoal(goal.id)}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className={cn(
                                            "cursor-pointer rounded-xl border-2 p-4 transition-colors",
                                            isSelected
                                                ? "border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20"
                                                : "border-muted bg-popover"
                                        )}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={cn(
                                                "p-2 rounded-full",
                                                isSelected ? "bg-emerald-500 text-white" : "bg-secondary text-secondary-foreground"
                                            )}>
                                                <Icon className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <div className="font-semibold">{goal.label}</div>
                                                <div className="text-xs text-muted-foreground">{goal.desc}</div>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>

                    <motion.div variants={item} className="space-y-3">
                        <Label className="text-base">Biggest Challenges (Select up to 3)</Label>
                        <div className="flex flex-wrap gap-2">
                            {CHALLENGES.map((challenge) => {
                                const isSelected = challenges.includes(challenge);
                                return (
                                    <motion.div key={challenge} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => toggleChallenge(challenge)}
                                            className={cn(
                                                "rounded-full transition-all",
                                                isSelected
                                                    ? "border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 hover:bg-emerald-100 hover:text-emerald-800"
                                                    : "hover:border-emerald-200"
                                            )}
                                        >
                                            {challenge}
                                        </Button>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>

                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="ghost" onClick={onBack}>
                        ← Back
                    </Button>
                    <Button
                        className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-md transition-all hover:scale-[1.02]"
                        size="lg"
                        onClick={handleSubmit}
                    >
                        Next Step →
                    </Button>
                </CardFooter>
            </Card>

            <p className="text-center text-xs text-muted-foreground mt-4">
                2 of 6 steps
            </p>
        </motion.div>
    );
}
