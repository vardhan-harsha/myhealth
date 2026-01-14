import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Brain, Flame, Heart, Sparkles } from "lucide-react";

const COACHES = [
    {
        id: "scientist",
        name: "The Scientist",
        icon: Brain,
        desc: "Data-driven, factual, and optimized. Expect research-backed advice.",
        color: "from-blue-500 to-cyan-500",
        bg: "bg-blue-50 dark:bg-blue-950/20",
        border: "border-blue-500"
    },
    {
        id: "drill_sergeant",
        name: "The Motivator",
        icon: Flame,
        desc: "High energy, tough love, and accountability. Push your limits.",
        color: "from-orange-500 to-red-500",
        bg: "bg-orange-50 dark:bg-orange-950/20",
        border: "border-orange-500"
    },
    {
        id: "guide",
        name: "The Guide",
        icon: Heart,
        desc: "Empathetic, supportive, and balanced. Sustainable progress over time.",
        color: "from-green-500 to-emerald-500",
        bg: "bg-green-50 dark:bg-green-950/20",
        border: "border-green-500"
    }
];

export function Step5Coach({ onNext, onBack, data }: { onNext: (data: any) => void; onBack: () => void; data: any }) {
    const [selectedCoach, setSelectedCoach] = useState(data.aiCoach || "");

    const handleSubmit = () => {
        if (!selectedCoach) return toast.error("Please select a coach");
        onNext({ aiCoach: selectedCoach });
    };

    return (
        <motion.div
            className="w-full max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
        >
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold tracking-tight mb-2">Choose your AI Coach</h2>
                <p className="text-muted-foreground">Who should guide you on this journey?</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {COACHES.map((coach) => {
                    const isSelected = selectedCoach === coach.id;
                    const Icon = coach.icon;

                    return (
                        <motion.div
                            key={coach.id}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => setSelectedCoach(coach.id)}
                            className={cn(
                                "relative cursor-pointer rounded-2xl border-2 overflow-hidden bg-card shadow-sm transition-all",
                                isSelected ? coach.border : "border-transparent hover:border-muted-foreground/20"
                            )}
                        >
                            {isSelected && (
                                <div className={cn("absolute inset-0 opacity-10 pointer-events-none bg-gradient-to-br", coach.color)} />
                            )}

                            <div className="p-6 flex flex-col items-center text-center gap-4 h-full">
                                <div className={cn(
                                    "p-4 rounded-full bg-gradient-to-br text-white shadow-lg",
                                    coach.color
                                )}>
                                    <Icon className="h-8 w-8" />
                                </div>

                                <div>
                                    <h3 className="font-bold text-lg">{coach.name}</h3>
                                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                                        {coach.desc}
                                    </p>
                                </div>
                            </div>

                            {isSelected && (
                                <div className="absolute top-3 right-3">
                                    <div className={cn("h-4 w-4 rounded-full bg-gradient-to-r", coach.color)} />
                                </div>
                            )}
                        </motion.div>
                    );
                })}
            </div>

            <div className="flex justify-between max-w-lg mx-auto">
                <Button variant="ghost" onClick={onBack}>
                    ← Back
                </Button>
                <Button
                    className="px-8 bg-foreground text-background hover:bg-foreground/90 shadow-lg"
                    size="lg"
                    onClick={handleSubmit}
                    disabled={!selectedCoach}
                >
                    Review & Finish <Sparkles className="ml-2 h-4 w-4" />
                </Button>
            </div>

            <p className="text-center text-xs text-muted-foreground mt-8">
                5 of 6 steps
            </p>
        </motion.div>
    );
}
