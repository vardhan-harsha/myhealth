export default function GeneralSettingsPage() {
    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="rounded-lg border bg-card p-6">
                <h2 className="text-2xl font-bold">General Settings</h2>
                <p className="text-muted-foreground mt-1">
                    Manage your general account settings here.
                </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="aspect-video rounded-xl bg-muted/50" />
                <div className="aspect-video rounded-xl bg-muted/50" />
                <div className="aspect-video rounded-xl bg-muted/50" />
            </div>
        </div>
    )
}
