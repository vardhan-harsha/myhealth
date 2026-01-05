export default function CommunityPage() {
    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <header className="flex h-16 shrink-0 items-center gap-2">
                <h1 className="text-2xl font-bold">Community</h1>
            </header>
            <div className="flex flex-1 items-center justify-center rounded-xl bg-muted/50 border border-dashed">
                <div className="text-center">
                    <h2 className="text-xl font-semibold">Community Hub</h2>
                    <p className="text-muted-foreground">Join groups, challenges, and view leaderboards.</p>
                </div>
            </div>
        </div>
    )
}
