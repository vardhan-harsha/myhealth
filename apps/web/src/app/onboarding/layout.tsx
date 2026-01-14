export default function OnboardingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen w-full bg-muted/40 text-foreground flex items-center justify-center">
            {/* Using theme variable for soft background */}
            {children}
        </div>
    );
}
