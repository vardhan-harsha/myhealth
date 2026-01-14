import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Loader2, CheckCircle, ArrowRight } from "lucide-react";

export function Step6Reveal({ onFinish, data }: { onFinish: () => void; data: any }) {
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
            className="w-full max-w-md mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            <Card className="border-none shadow-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-violet-600 h-2 w-full" />
                <CardHeader className="text-center pb-2">
                    <div className="mx-auto bg-green-100 dark:bg-green-900/30 p-3 rounded-full mb-4 w-fit">
                        <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                    </div>
                    <CardTitle className="text-3xl font-bold">You're All Set!</CardTitle>
                    <CardDescription className="text-lg">
                        Your personalized Helix plan is ready.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-center">
                    <p className="text-muted-foreground">
                        We've set up your dashboard with:
                    </p>
                    <ul className="text-sm space-y-2 text-left bg-slate-50 dark:bg-slate-950 p-4 rounded-lg border">
                        <li className="flex gap-2">
                            <span className="text-blue-500">✓</span> Custom {data.goals?.primary?.replace("_", " ")} Protocol
                        </li>
                        <li className="flex gap-2">
                            <span className="text-blue-500">✓</span> Nutrition targets ({data.nutritionPreferences?.dietType})
                        </li>
                        <li className="flex gap-2">
                            <span className="text-blue-500">✓</span> {data.trainingPreferences?.days} day/week training schedule
                        </li>
                        <li className="flex gap-2">
                            <span className="text-blue-500">✓</span> AI Coach: {data.aiCoach}
                        </li>
                    </ul>
                </CardContent>
                <CardFooter>
                    <Button
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg text-lg h-12"
                        onClick={onFinish}
                    >
                        Enter Dashboard <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                </CardFooter>
            </Card>
        </motion.div>
    );
}
