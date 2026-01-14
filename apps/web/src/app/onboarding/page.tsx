"use client";

import { useState, useEffect } from "react";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

import { Step1Identity } from "@/components/onboarding/step-1-identity";
import { Step2Goals } from "@/components/onboarding/step-2-goals";
import { Step3Metrics } from "@/components/onboarding/step-3-metrics";
import { Step4Preferences } from "@/components/onboarding/step-4-preferences";
import { Step5Coach } from "@/components/onboarding/step-5-coach";
import { Step6Reveal } from "@/components/onboarding/step-6-reveal";
import { Loader2 } from "lucide-react";

const TOTAL_STEPS = 6;

// Sidebar content config - using muted theme colors
const SIDEBAR_CONTENT = {
    1: {
        title: "Welcome to Helix",
        desc: "Let's get to know the real you. Your physiological profile is the foundation of your plan.",
        image: "/assets/onboarding/coach-guide.webp",
        color: "bg-muted/50"
    },
    2: {
        title: "Define Your Mission",
        desc: "Whether it's performance, longevity, or aesthetics — we'll engineer the path to get you there.",
        image: "/assets/onboarding/coach-motivator.webp",
        color: "bg-orange-50 dark:bg-orange-950/20"
    },
    3: {
        title: "Data foundation",
        desc: "Sync your health metrics to build a protocol that adapts to your body's needs.",
        image: "/assets/onboarding/coach-scientist.webp",
        color: "bg-blue-50 dark:bg-blue-950/20"
    },
    4: {
        title: "Tailored to You",
        desc: "Your lifestyle, your rules. We fit the plan into your life, not the other way around.",
        image: "/assets/onboarding/coach-guide.webp",
        color: "bg-green-50 dark:bg-green-950/20"
    },
    5: {
        title: "Meet Your Coach",
        desc: "Select the AI persona that resonates with your style. They'll be with you every step.",
        image: "/assets/onboarding/coach-scientist.webp",
        color: "bg-primary/5"
    },
    6: {
        title: "Your Blueprint",
        desc: "Generating your personalized health protocol...",
        image: "/assets/onboarding/coach-guide.webp",
        color: "bg-violet-50 dark:bg-violet-950/20"
    }
} as Record<number, any>;

export default function OnboardingPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);

    // State for all steps
    const [identity, setIdentity] = useState<any>({});
    const [goals, setGoals] = useState<any>({});
    const [metrics, setMetrics] = useState<any>({});
    const [prefs, setPrefs] = useState<any>({});
    const [coach, setCoach] = useState<string>("");

    // Fetch existing state
    const { data: existingData, isLoading } = api.onboarding.getOnboardingState.useQuery(undefined, {
        refetchOnWindowFocus: false
    });

    const saveMutation = api.onboarding.saveStep.useMutation();
    const completeMutation = api.onboarding.completeOnboarding.useMutation({
        onSuccess: () => {
            toast.success("Welcome aboard! Redirecting...");
            router.push("/dashboard");
        },
        onError: (err) => toast.error(err.message)
    });

    // Hydrate state
    useEffect(() => {
        if (existingData) {
            // FIX: Access properties directly from existingData, not .userProfile
            if (existingData.goals) setGoals(existingData.goals);
            if (existingData.metrics) setMetrics(existingData.metrics);
            if (existingData.trainingPreferences) {
                setPrefs({
                    trainingPreferences: existingData.trainingPreferences,
                    nutritionPreferences: existingData.nutritionPreferences
                });
            }
            if (existingData.aiCoach) setCoach(existingData.aiCoach);
            // Identity hydration if needed (name, gender, units) handled via component props merging below?
            // Since User table has name, and Profile has gender/units (newly added), we might need to fetch them.
            // But for now assuming existingData covers profile parts.
        }
    }, [existingData]);

    const handleNext = async (stepData: any) => {
        try {
            if (step === 1) setIdentity(stepData);
            if (step === 2) setGoals(stepData);
            if (step === 3) setMetrics(stepData);
            if (step === 4) setPrefs(stepData);
            if (step === 5) setCoach(stepData.aiCoach);

            // FIX: Spread stepData to flattened object expected by backend
            await saveMutation.mutateAsync({
                step,
                ...stepData
            });

            if (step < TOTAL_STEPS) {
                setStep(s => s + 1);
            } else {
                await completeMutation.mutateAsync();
            }
        } catch (error) {
            toast.error("Failed to save progress");
            console.error(error);
        }
    };

    const handleBack = () => {
        if (step > 1) setStep(s => s - 1);
    };

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center bg-transparent">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    const combinedData = {
        ...identity,
        goals,
        metrics,
        ...prefs,
        aiCoach: coach,
        ...existingData // FIX: Fallback to existingData directly
    };

    const sidebarInfo = SIDEBAR_CONTENT[step] || SIDEBAR_CONTENT[1];

    return (
        // Main Card Container - Unified Surface
        <div className="relative flex w-full overflow-hidden bg-card">

            {/* LEFT SIDE - FORM */}
            <div className="w-full lg:w-[60%] flex flex-col px-8 py-10 lg:px-16 lg:py-14 xl:px-24 relative overflow-y-auto">

                {/* Header Group */}
                <div className="mb-12 space-y-6">
                    {/* Logo */}
                    <div className="flex items-center gap-2 font-bold text-lg tracking-tight text-foreground">
                        <div className="h-6 w-6 bg-primary text-primary-foreground rounded-md flex items-center justify-center">
                            <div className="w-2 h-2 bg-background rounded-full" />
                        </div>
                        Helix
                    </div>

                    {/* Simple Segmented Progress */}
                    <div className="space-y-2">
                        <div className="flex gap-2 w-48">
                            {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
                                <div
                                    key={i}
                                    className={cn(
                                        "h-1.5 flex-1 rounded-full transition-all duration-300",
                                        i + 1 <= step ? "bg-primary" : "bg-muted"
                                    )}
                                />
                            ))}
                        </div>
                        <p className="text-xs font-semibold text-muted-foreground pl-1">{step} of {TOTAL_STEPS}</p>
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="w-full max-w-2xl flex-1 flex flex-col justify-center"
                    >
                        {step === 1 && <Step1Identity onNext={handleNext} data={combinedData} />}
                        {step === 2 && <Step2Goals onNext={handleNext} onBack={handleBack} data={combinedData} />}
                        {step === 3 && <Step3Metrics onNext={handleNext} onBack={handleBack} data={combinedData} />}
                        {step === 4 && <Step4Preferences onNext={handleNext} onBack={handleBack} data={combinedData} />}
                        {step === 5 && <Step5Coach onNext={handleNext} onBack={handleBack} data={combinedData} />}
                        {step === 6 && <Step6Reveal onFinish={() => completeMutation.mutate()} data={combinedData} />}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* RIGHT SIDE - VISUAL PANEL (Flush with Card) */}
            <motion.div
                className={cn(
                    "hidden lg:flex flex-col justify-end p-0 lg:w-[40%] relative overflow-hidden transition-colors duration-700",
                    sidebarInfo.color
                )}
                key={step}
                initial={{ opacity: 0.95 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
            >
                <div className="absolute top-16 left-12 right-12 z-10">
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-3xl font-bold tracking-tight mb-2 text-foreground/80 mix-blend-multiply dark:mix-blend-screen"
                    >
                        {sidebarInfo.title}
                    </motion.h2>
                    <motion.p className="text-muted-foreground/80 font-medium leading-relaxed">
                        {sidebarInfo.desc}
                    </motion.p>
                </div>

                <motion.div
                    className="relative h-[80%] w-full mt-auto"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <Image
                        src={sidebarInfo.image}
                        alt="Onboarding Partner"
                        fill
                        className="object-contain object-bottom drop-shadow-2xl scale-110"
                        priority
                    />
                </motion.div>
            </motion.div>

        </div>
    );
}
