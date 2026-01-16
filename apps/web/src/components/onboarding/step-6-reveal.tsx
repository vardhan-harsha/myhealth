import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Loader2, CheckCircle } from "lucide-react";

interface OnboardingData {
    goals?: {
        primary?: string;
    };
    nutritionPreferences?: {
        dietType?: string;
    };
    trainingPreferences?: {
        days?: number;
    };
    aiCoach?: string;
}

export function Step6Reveal({ onFinish, data }: { onFinish: () => void; data: Partial<OnboardingData> }) {
    const [isGenerating, setIsGenerating] = useState(true);

    useEffect(() => {
        // Simulate plan generation
        const timer = setTimeout(() => {
            setIsGenerating(false);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    if (isGenerating) {
        return (
            <div className="flex flex-col items-center justify-center p-12 space-y-6 text-center animate-in fade-in duration-700">
                <div className="relative">
                    <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full" />
                    <Loader2 className="h-16 w-16 text-blue-600 animate-spin relative z-10" />
                </div>
                <div className="space-y-2">
                    <h3 className="text-2xl font-bold">Designing your protocol...</h3>
                    <p className="text-muted-foreground max-w-sm mx-auto">
                        Analyzing your metrics, goals, and preferences to build the perfect plan.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <motion.div
            className="w-full max-w-4xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="text-center mb-8">
                <div className="mx-auto bg-green-100 dark:bg-green-900/30 p-3 rounded-full mb-4 w-fit">
                    <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <h2 className="text-4xl font-bold mb-3 text-foreground">You&apos;re All Set!</h2>
                <p className="text-lg text-muted-foreground">Your personalized Helix plan is ready.</p>
            </div>

            <div className="space-y-4 text-center mb-12">
                <p className="text-muted-foreground">
                    We&apos;ve set up your dashboard with:
                </p>
                <ul className="text-sm space-y-2 text-left bg-slate-50 dark:bg-slate-950 p-4 rounded-lg border max-w-md mx-auto">
                    <li className="flex gap-2">
                        <span className="text-blue-500">✓</span> Custom {data.goals?.primary?.replace("_", " ") ?? "fitness"} Protocol
                    </li>
                    <li className="flex gap-2">
                        <span className="text-blue-500">✓</span> Nutrition targets ({data.nutritionPreferences?.dietType ?? "balanced"})
                    </li>
                    <li className="flex gap-2">
                        <span className="text-blue-500">✓</span> {data.trainingPreferences?.days ?? 3} day/week training schedule
                    </li>
                    <li className="flex gap-2">
                        <span className="text-blue-500">✓</span> AI Coach: {data.aiCoach ?? "Guide"}
                    </li>
                </ul>
            </div>

            <div className="flex justify-center">
                <Button
                    className="h-12 px-8 rounded-full shadow-lg shadow-primary/20 text-base font-bold"
                    onClick={onFinish}
                    size="lg"
                >
                    Enter Dashboard
                </Button>
            </div>
        </motion.div>
    );
}
