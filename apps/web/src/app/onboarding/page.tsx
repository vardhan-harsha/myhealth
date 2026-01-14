"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/trpc/react";
import { toast } from "sonner";

import { Step1Identity } from "@/components/onboarding/step-1-identity";
import { Step2Goals } from "@/components/onboarding/step-2-goals";
import { Step3Metrics } from "@/components/onboarding/step-3-metrics";
import { Step4Preferences } from "@/components/onboarding/step-4-preferences";
import { Step5Coach } from "@/components/onboarding/step-5-coach";
import { Step6Reveal } from "@/components/onboarding/step-6-reveal";

export default function OnboardingPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [data, setData] = useState<any>({});
    const [isLoaded, setIsLoaded] = useState(false);

    // Fetch existing state
    const { data: existingProfile, isLoading } = api.onboarding.getOnboardingState.useQuery(undefined, {
        refetchOnWindowFocus: false,
    });

    const saveMutation = api.onboarding.saveStep.useMutation({
        onError: (err) => {
            toast.error("Failed to save progress: " + err.message);
        },
    });

    const completeMutation = api.onboarding.completeOnboarding.useMutation({
        onSuccess: () => {
            toast.success("Onboarding complete! Welcome to Helix.");
            router.push("/dashboard");
        },
        onError: (err) => {
            toast.error("Failed to complete onboarding: " + err.message);
        },
    });

    // Hydrate state from DB
    useEffect(() => {
        if (existingProfile && !isLoaded) {
            const mergedData = {
                goals: existingProfile.goals,
                metrics: existingProfile.metrics,
                trainingPreferences: existingProfile.trainingPreferences,
                nutritionPreferences: existingProfile.nutritionPreferences,
                aiCoach: existingProfile.aiCoach,
            };
            setData(mergedData);

            // Logic to determine which step to resume could be added here
            // For now, start at 1 or maybe check which fields are empty

            setIsLoaded(true);
        }
    }, [existingProfile, isLoaded]);

    const handleNext = async (stepData: any) => {
        // Merge local data
        const newData = { ...data, ...stepData };
        setData(newData);

        // Save to DB
        await saveMutation.mutateAsync({
            step,
            goals: step === 2 ? stepData.goals : undefined,
            metrics: step === 3 ? stepData.metrics : undefined,
            trainingPreferences: step === 4 ? stepData.trainingPreferences : undefined,
            nutritionPreferences: step === 4 ? stepData.nutritionPreferences : undefined,
            aiCoach: step === 5 ? stepData.aiCoach : undefined,
        });

        if (step < 6) {
            setStep(step + 1);
        }
    };

    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };

    const handleFinish = async () => {
        await completeMutation.mutateAsync();
    };

    if (isLoading) {
        return <div className="flex h-screen items-center justify-center">Loading...</div>;
    }

    return (
        <div className="flex flex-col gap-6">
            {/* Progress Bar */}
            <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                    className="bg-primary h-full transition-all duration-500 ease-out"
                    style={{ width: `${(step / 6) * 100}%` }}
                />
            </div>

            <div className="w-full">
                {step === 1 && <Step1Identity onNext={handleNext} data={data} />}
                {step === 2 && <Step2Goals onNext={handleNext} onBack={handleBack} data={data} />}
                {step === 3 && <Step3Metrics onNext={handleNext} onBack={handleBack} data={data} />}
                {step === 4 && <Step4Preferences onNext={handleNext} onBack={handleBack} data={data} />}
                {step === 5 && <Step5Coach onNext={handleNext} onBack={handleBack} data={data} />}
                {step === 6 && <Step6Reveal onFinish={handleFinish} data={data} />}
            </div>
        </div>
    );
}
