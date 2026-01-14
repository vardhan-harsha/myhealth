import { type Metadata } from "next";

export const metadata: Metadata = {
    title: "Onboarding - Helix",
    description: "Set up your personalized health journey",
};

export default function OnboardingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen w-full bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4 md:p-8">
            <div className="w-full max-w-5xl mx-auto">
                {/* Simple Brand Header could go here if needed, but keeping it clean */}
                {children}
            </div>
        </div>
    );
}
