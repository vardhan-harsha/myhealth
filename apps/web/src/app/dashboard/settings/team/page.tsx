export default function TeamSettingsPage() {
    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="rounded-lg border bg-card p-6">
                <h2 className="text-2xl font-bold">Team Settings</h2>
                <p className="text-muted-foreground mt-1">
                    Manage your team members and permissions.
                </p>
            </div>
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
        </div>
    )
}
