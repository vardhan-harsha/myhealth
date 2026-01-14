import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Rocket, Dumbbell, Heart, Zap, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const GOALS = [
    { id: "lose_weight", label: "Lose Weight", icon: Rocket, desc: "Burn fat & metabolism" },
    { id: "build_muscle", label: "Build Muscle", icon: Dumbbell, desc: "Strength & hypertrophy" },
    { id: "endurance", label: "Endurance", icon: Zap, desc: "Cardio capacity" },
    { id: "longevity", label: "Longevity", icon: Heart, desc: "Health span & vitality" },
];

const CHALLENGES = [
    "Time Management", "Motivation", "Knowledge Gap", "Injury", "Stress", "Budget", "Sleep"
];

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
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
        onNext({ goals: { primary: primaryGoal, challenges } });
    };

    return (
        <motion.div
            className="w-full max-w-4xl"
            variants={container}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, y: -20 }}
        >
            <div className="text-left mb-8">
                <h2 className="text-4xl font-bold mb-3 text-foreground">What is your main focus?</h2>
                <p className="text-lg text-muted-foreground">Select the goal that matters most to you right now.</p>
            </div>

            <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                {GOALS.map((goal) => {
                    const Icon = goal.icon;
                    const isSelected = primaryGoal === goal.id;
                    return (
                        <motion.div
                            key={goal.id}
                            whileHover={{ y: -4 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setPrimaryGoal(goal.id)}
                            className={cn(
                                "relative cursor-pointer group rounded-2xl p-6 h-64 flex flex-col items-center justify-center gap-6 transition-all duration-200 border-2",
                                isSelected
                                    ? "bg-primary border-primary shadow-xl"
                                    : "bg-card border-border hover:border-primary/30 shadow-sm"
                            )}
                        >
                            {isSelected && (
                                <div className="absolute top-4 right-4 text-primary bg-primary-foreground rounded-full p-0.5">
                                    <CheckCircle2 className="h-5 w-5 fill-primary text-primary-foreground" />
                                </div>
                            )}

                            <div className={cn(
                                "p-4 rounded-full transition-colors",
                                isSelected ? "bg-white/20 text-white" : "bg-primary/10 text-primary" // Use primary tints
                            )}>
                                <Icon className={cn("h-8 w-8", isSelected ? "text-primary-foreground" : "text-primary")} />
                            </div>

                            <div className="text-center">
                                <h3 className={cn("font-bold text-lg mb-1", isSelected ? "text-primary-foreground" : "text-foreground")}>
                                    {goal.label}
                                </h3>
                                <p className={cn("text-xs font-medium", isSelected ? "text-primary-foreground/70" : "text-muted-foreground")}>
                                    {goal.desc}
                                </p>
                            </div>
                        </motion.div>
                    );
                })}
            </motion.div>

            <motion.div variants={item} className="space-y-6 mb-12">
                <Label className="text-lg font-semibold block text-left mb-4 text-foreground">Any hurdles in your way?</Label>
                <div className="flex flex-wrap gap-3">
                    {CHALLENGES.map((challenge) => {
                        const isSelected = challenges.includes(challenge);
                        return (
                            <motion.button
                                key={challenge}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => toggleChallenge(challenge)}
                                className={cn(
                                    "px-5 py-2.5 rounded-full text-sm font-semibold transition-all border",
                                    isSelected
                                        ? "bg-primary/10 text-primary border-primary/20"
                                        : "bg-background text-muted-foreground border-border hover:border-primary/20 hover:text-primary"
                                )}
                            >
                                {challenge}
                            </motion.button>
                        );
                    })}
                </div>
            </motion.div>

            <div className="flex items-center gap-4 mt-8">
                <Button
                    variant="ghost"
                    onClick={onBack}
                    className="h-12 px-6 rounded-full text-base"
                >
                    Back
                </Button>
                <Button
                    className="h-12 px-8 rounded-full shadow-lg shadow-primary/20 text-base font-bold"
                    onClick={handleSubmit}
                    size="lg"
                >
                    Continue
                </Button>
            </div>
        </motion.div>
    );
}
