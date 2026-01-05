"use client";

import { useUser } from "@/contexts/user-context"
import { Skeleton } from "@/components/ui/skeleton"
import { HealthActivityWidget } from "@/components/activity-heatmap"

export default function Page() {
  const { user, isLoading } = useUser();

  return (
    <>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        {/* Welcome Section */}
        <div className="rounded-lg border bg-card p-6">
          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-8 w-64" />
              <Skeleton className="h-4 w-48" />
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-bold">
                Welcome back, {user?.name ?? user?.email ?? "User"}!
              </h2>
              <p className="text-muted-foreground mt-1">
                Here&apos;s what&apos;s happening with your projects today.
              </p>
            </div>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="bg-muted/50 aspect-video rounded-xl flex items-center justify-center">
            <div className="text-center">
              <p className="text-2xl font-bold">12</p>
              <p className="text-muted-foreground text-sm">Active Projects</p>
            </div>
          </div>
          <div className="bg-muted/50 aspect-video rounded-xl flex items-center justify-center">
            <div className="text-center">
              <p className="text-2xl font-bold">8</p>
              <p className="text-muted-foreground text-sm">Tasks Completed</p>
            </div>
          </div>
          <div className="bg-muted/50 aspect-video rounded-xl flex items-center justify-center">
            <div className="text-center">
              <p className="text-2xl font-bold">24h</p>
              <p className="text-muted-foreground text-sm">Time Saved</p>
            </div>
          </div>
        </div>

        <HealthActivityWidget className="w-full" />
      </div>
    </>
  )
}
