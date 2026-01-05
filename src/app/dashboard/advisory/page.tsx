export default function AdvisoryPage() {
    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <header className="flex h-16 shrink-0 items-center gap-2">
                <h1 className="text-2xl font-bold">Ask Helix</h1>
            </header>
            <div className="flex flex-1 items-center justify-center rounded-xl bg-muted/50 border border-dashed">
                <div className="text-center">
                    <h2 className="text-xl font-semibold">Ask Helix</h2>
                    <p className="text-muted-foreground">Chat with The Scientist and The Motivator personas here.</p>
                </div>
            </div>
        </div>
    )
}
