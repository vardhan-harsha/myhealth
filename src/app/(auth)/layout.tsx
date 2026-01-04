export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex justify-center gap-2 md:justify-start">
                    <a href="/" className="flex items-center gap-3 font-semibold text-2xl">
                        <div className="flex size-12 items-center justify-center">
                            <img src="/helix_dark.svg" alt="Helix" className="size-10 dark:hidden" />
                            <img src="/helix_light.svg" alt="Helix" className="size-10 hidden dark:block" />
                        </div>

                        <span className="hidden md:block">Helix</span>
                    </a>
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-md">
                        {children}
                    </div>
                </div>
            </div>
            <div className="bg-muted relative hidden lg:block">
                <div className="absolute inset-0 flex items-center justify-center p-8">
                    <div className="max-w-md space-y-4 text-center">
                        <h2 className="text-3xl font-bold tracking-tight">
                            Transform Your Health Journey
                        </h2>
                        <p className="text-muted-foreground text-lg">
                            Track your vitals, monitor your progress, and unlock insights that empower you to make better health decisions every day.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
