export default function WellbeingPage() {
    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <header className="flex h-16 shrink-0 items-center gap-2">
                <h1 className="text-2xl font-bold">My Wellbeing</h1>
            </header>
            <div className="flex flex-1 items-center justify-center rounded-xl bg-muted/50 border border-dashed">
                <div className="text-center">
                    <h2 className="text-xl font-semibold">Wellbeing Engine</h2>
                    <p className="text-muted-foreground">Detailed logs, daily plans, and insights coming soon.</p>
                </div>
            </div>
        </div>
    )
}
