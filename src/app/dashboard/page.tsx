"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { useUser } from "@/contexts/user-context"
import { Skeleton } from "@/components/ui/skeleton"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Page() {
  const { user, isLoading } = useUser();

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4 flex-1">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/">
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Overview</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="px-4">
          <ThemeToggle />
        </div>
      </header>
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
                Welcome back, {user?.name || user?.email || "User"}!
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

        <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min flex items-center justify-center">
          <p className="text-muted-foreground">Main content area - Add your dashboard widgets here</p>
        </div>
      </div>
    </>
  )
}
