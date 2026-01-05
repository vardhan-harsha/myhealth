export default function LimitsSettingsPage() {
    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="rounded-lg border bg-card p-6">
                <h2 className="text-2xl font-bold">Limits</h2>
                <p className="text-muted-foreground mt-1">
                    View usage limits and quotas.
                </p>
            </div>
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
        </div>
    )
}
