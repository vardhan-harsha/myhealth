"use client";

import { useUser } from "@/contexts/user-context"
import { Skeleton } from "@/components/ui/skeleton"
import { HealthActivityWidget } from "@/components/activity-heatmap"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Activity, 
  Flame, 
  Dumbbell,
  Moon,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  MessageSquare,
  Utensils,
  Plus
} from "lucide-react"

export default function Page() {
  const { user, isLoading } = useUser();

  /**
   * Dummy data for recent health logs to simulate the "Controlling the Controllables" philosophy.
   */
  const recentLogs = [
    {
      id: 1,
      type: "Nutrition",
      action: "logged lunch",
      details: "850 kcal • 45g Protein",
      time: "2 hours ago",
      icon: <Utensils className="h-4 w-4" />,
      color: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-500",
    },
    {
      id: 2,
      type: "Training",
      action: "completed workout",
      details: "Push Day • 65 mins",
      time: "4 hours ago",
      icon: <Dumbbell className="h-4 w-4" />,
      color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-500",
    },
    {
      id: 3,
      type: "Measurements",
      action: "updated weight",
      details: "178.5 lbs (down 0.5 lbs)",
      time: "1 day ago",
      icon: <TrendingDown className="h-4 w-4" />,
      color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-500",
    },
    {
      id: 4,
      type: "Sleep",
      action: "synced from Oura",
      details: "7h 45m • 85% Sleep Score",
      time: "1 day ago",
      icon: <Moon className="h-4 w-4" />,
      color: "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-500",
    },
    {
      id: 5,
      type: "AI Nudge",
      action: "received insight",
      details: "Your protein is low today. Consider a shake.",
      time: "1 day ago",
      icon: <MessageSquare className="h-4 w-4" />,
      color: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-500",
    },
  ];

  return (
    <div className="flex flex-1 flex-col gap-6 p-6 pt-4">
      {/* Dashboard Header Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-9 w-64" />
              <Skeleton className="h-5 w-48" />
            </div>
          ) : (
            <>
              <h2 className="text-3xl font-bold tracking-tight">
                Welcome back, {user?.name ?? user?.email ?? "Athlete"}!
              </h2>
              <p className="text-muted-foreground mt-1">
                Your personal command center for controlling the controllables.
              </p>
            </>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <MessageSquare className="mr-2 h-4 w-4" /> Ask AI
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Log Entry
          </Button>
        </div>
      </div>

      {/* Main Tabs for different functional modules */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="visual-intelligence">Visual Intelligence</TabsTrigger>
          <TabsTrigger value="ai-insights">Insight Finder</TabsTrigger>
          <TabsTrigger value="goals">Goals & Targets</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          {/* Key Performance Indicators (Input Adherence) */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Daily Calories
                </CardTitle>
                <Flame className="h-4 w-4 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,150 / 2,400</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-emerald-500 font-medium inline-flex items-center">
                    250 kcal remaining
                  </span>
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Protein Target
                </CardTitle>
                <Utensils className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">145g / 180g</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-orange-500 font-medium inline-flex items-center">
                    <TrendingUp className="mr-1 h-3 w-3" />
                    Behind schedule
                  </span>
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Weekly Training
                </CardTitle>
                <Dumbbell className="h-4 w-4 text-emerald-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3 / 4</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-emerald-500 font-medium inline-flex items-center">
                    <ArrowUpRight className="mr-1 h-3 w-3" />
                    On track for the week
                  </span>
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Sleep Quality
                </CardTitle>
                <Moon className="h-4 w-4 text-indigo-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">85%</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-emerald-500 font-medium inline-flex items-center">
                    <ArrowUpRight className="mr-1 h-3 w-3" />
                    +5%
                  </span>{" "}
                  from last night
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            {/* Main Data Visualizations */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              <HealthActivityWidget 
                title="Consistency Engine"
                description="Your daily adherence to health inputs over the past year."
                className="w-full" 
              />
              
              {/* Output Progress Widget */}
              <Card className="flex-1 min-h-[250px]">
                <CardHeader>
                  <CardTitle>Weight Trend vs Caloric Adherence</CardTitle>
                  <CardDescription>
                    Visualizing how your inputs (calories) affect your outputs (weight trend).
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-full flex items-center justify-center pb-10">
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <Activity className="h-8 w-8 opacity-50" />
                    <p className="text-sm">Interactive trend chart loading...</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Logs & Nudges */}
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Recent Journal Logs</CardTitle>
                <CardDescription>
                  Your latest health inputs and AI insights.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {recentLogs.map((log) => (
                    <div key={log.id} className="flex items-start gap-4">
                      {/* Icon wrapper styling */}
                      <div className={`mt-1 flex h-9 w-9 items-center justify-center rounded-full ${log.color}`}>
                        {log.icon}
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">
                          <span className="font-semibold">{log.type}</span> — {log.action}
                        </p>
                        <p className="text-sm font-medium">
                          {log.details}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {log.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Placeholder for Visual Intelligence Drill-Downs */}
        <TabsContent value="visual-intelligence" className="h-[400px] flex items-center justify-center border rounded-xl border-dashed">
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <Activity className="h-8 w-8" />
            <p>Advanced Drill-Down Capabilities coming soon</p>
          </div>
        </TabsContent>

        {/* Placeholder for Conversational Insights */}
        <TabsContent value="ai-insights" className="h-[400px] flex items-center justify-center border rounded-xl border-dashed">
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <MessageSquare className="h-8 w-8" />
            <p>"Show me my weight trend for the weeks I hit my protein goal" — Coming soon</p>
          </div>
        </TabsContent>

        {/* Placeholder for Goal Tracking */}
        <TabsContent value="goals" className="h-[400px] flex items-center justify-center border rounded-xl border-dashed">
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <TrendingUp className="h-8 w-8" />
            <p>Self-defined wellbeing objectives tracking coming soon</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
