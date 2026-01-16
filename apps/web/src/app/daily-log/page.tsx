import { api } from "@/trpc/server";
import { DailyLogClient } from "./_components/daily-log-client";

export default async function DailyLogPage() {
    const today = new Date().toISOString().split("T")[0]!;

    // Fetch initial data for today
    const initialLog = await api.dailyLog.getByDate({ date: today });
    const streak = await api.dailyLog.getStreak();

    return (
        <div className="container mx-auto py-6">
            <DailyLogClient
                initialLog={initialLog}
                initialStreak={streak}
                initialDate={today}
            />
        </div>
    );
}
