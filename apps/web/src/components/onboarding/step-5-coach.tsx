import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Sparkles, CheckCircle2 } from "lucide-react";
import Image from "next/image";

const COACHES = [
    {
        id: "scientist",
        name: "The Scientist",
        image: "/assets/onboarding/coach-scientist.webp",
        desc: "Data-driven optimization. I'll analyze every metric to engineer your perfect physiological state.",
        color: "bg-blue-500",
        bg: "bg-blue-50 dark:bg-blue-950/20",
        border: "border-blue-500"
    },
    {
        id: "drill_sergeant",
        name: "The Motivator",
        image: "/assets/onboarding/coach-motivator.webp",
        desc: "Energy and accountability. I won't let you quit when it gets tough. We crush goals together!",
        color: "bg-orange-500",
        bg: "bg-orange-50 dark:bg-orange-950/20",
        border: "border-orange-500"
    },
    {
        id: "guide",
        name: "The Guide",
        image: "/assets/onboarding/coach-guide.webp",
        desc: "Holistic balance. I help you build sustainable habits that nurture both body and mind.",
        color: "bg-green-500",
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
            className="w-full max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
        >
            <div className="text-center mb-10">
                <h2 className="text-4xl font-extrabold tracking-tight mb-3">Choose your Partner</h2>
                <p className="text-xl text-muted-foreground">Select the AI persona that resonates with your style.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {COACHES.map((coach) => {
                    const isSelected = selectedCoach === coach.id;

                    return (
                        <motion.div
                            key={coach.id}
                            whileHover={{ y: -8, scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setSelectedCoach(coach.id)}
                            className={cn(
                                "relative cursor-pointer rounded-3xl border-2 overflow-hidden bg-white dark:bg-slate-900 shadow-xl transition-all duration-300",
                                isSelected ? `ring-4 ring-offset-4 ring-offset-background ${coach.border}` : "border-transparent hover:border-muted/50"
                            )}
                        >
                            {/* Selection Indicator */}
                            {isSelected && (
                                <div className="absolute top-4 right-4 z-20 bg-white rounded-full p-1 shadow-sm">
                                    <CheckCircle2 className={cn("h-6 w-6", coach.color.replace('bg-', 'text-'))} />
                                </div>
                            )}

                            <div className={cn("aspect-square relative overflow-hidden bg-gradient-to-b from-transparent to-black/5", coach.bg)}>
                                <Image
                                    src={coach.image}
                                    alt={coach.name}
                                    fill
                                    className="object-cover object-top transition-transform duration-700 hover:scale-110"
                                />
                            </div>

                            <div className="p-6 text-center space-y-3 relative z-10">
                                <h3 className="font-bold text-2xl">{coach.name}</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {coach.desc}
                                </p>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            <div className="flex justify-between items-center max-w-2xl mx-auto px-4">
                <Button variant="ghost" onClick={onBack} className="text-lg">
                    ← Back
                </Button>
                <Button
                    className="px-10 py-6 text-lg rounded-full bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1"
                    size="lg"
                    onClick={handleSubmit}
                    disabled={!selectedCoach}
                >
                    Review Plan <Sparkles className="ml-2 h-5 w-5" />
                </Button>
            </div>

            <p className="text-center text-xs text-muted-foreground mt-8 opacity-50">
                Step 5 of 6
            </p>
        </motion.div>
    );
}
