"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useUser } from "@/contexts/user-context";

export function OnboardingGuard({ children }: { children: React.ReactNode }) {
    const { user, isLoading } = useUser();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (isLoading) return;

        // Check if user is logged in
        if (user) {
            // If onboarding is NOT incomplete, and we are NOT on the onboarding page
            if (user.onboardingCompleted === false && !pathname?.startsWith("/onboarding")) {
                // Redirect to onboarding
                router.push("/onboarding");
            }
        }
    }, [user, isLoading, pathname, router]);

    return <>{children}</>;
}
