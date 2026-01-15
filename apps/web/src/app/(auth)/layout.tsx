import { AppLogo } from "@/components/app-logo";
import { AuthCarousel } from "@/components/auth/auth-carousel";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <AppLogo />
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-md">
                        {children}
                    </div>
                </div>
            </div>
            <div className="relative hidden lg:block">
                <AuthCarousel />
            </div>
        </div>
    );
}
