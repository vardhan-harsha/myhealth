"use client";

import { useUser } from "@/contexts/user-context";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HealthActivityWidget } from "@/components/activity-heatmap";
import { 
  Flame, 
  Dumbbell, 
  Moon, 
  Utensils, 
  ArrowRight,
  TrendingUp,
  MessageSquare
} from "lucide-react";
import { format } from "date-fns";

export default function Page() {
  const { user, isLoading } = useUser();
  const today = new Date();

  const recentLogs = [
    {
      id: 1,
      type: "Nutrition",
      action: "logged lunch",
      details: "850 kcal • 45g Protein",
      time: "2 hours ago",
      icon: <Utensils className="h-4 w-4" />,
      color: "bg-[#ffc163] text-black",
    },
    {
      id: 2,
      type: "Training",
      action: "completed workout",
      details: "Push Day • 65 mins",
      time: "4 hours ago",
      icon: <Dumbbell className="h-4 w-4" />,
      color: "bg-[#abc9ff] text-black",
    },
    {
      id: 3,
      type: "Sleep",
      action: "synced from Oura",
      details: "7h 45m • 85% Sleep Score",
      time: "1 day ago",
      icon: <Moon className="h-4 w-4" />,
      color: "bg-[#b096f9] text-black",
    },
  ];

  return (
    <div className="flex flex-1 flex-col gap-8 p-6 md:p-10 w-full max-w-[1600px] mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
        <div className="space-y-1">
          <p className="text-muted-foreground font-medium flex items-center gap-2">
            <span>{format(today, "EEEE, d MMM")}</span>
          </p>
          {isLoading ? (
            <Skeleton className="h-10 w-64" />
          ) : (
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Hello, {user?.name?.split(' ')[0] ?? "Athlete"}
            </h1>
          )}
          <p className="text-muted-foreground max-w-xl text-lg pt-1">
            Welcome to your command center. Let&apos;s control the controllables today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-full h-11 px-6 font-medium">
            <MessageSquare className="mr-2 h-4 w-4" /> Ask Helix
          </Button>
          <Button className="rounded-full h-11 px-6 font-medium bg-foreground text-background hover:bg-foreground/90">
            Log Entry
          </Button>
        </div>
      </div>

      {/* Hero Banner - Inspired by the "Daily Challenge" card but adapted for web width */}
      <div className="relative overflow-hidden rounded-[32px] bg-[#b096f9] text-black p-8 md:p-12 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="relative z-10 max-w-2xl space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
            Daily Challenge
          </h2>
          <p className="text-black/80 font-medium text-lg md:text-xl max-w-lg">
            Hit 180g of protein and complete your active recovery session before 9:00 PM.
          </p>
          <div className="flex items-center gap-4 pt-4">
            <Button className="rounded-full h-12 px-8 bg-black text-white hover:bg-black/80 text-base">
              Start Session <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <div className="flex -space-x-3">
              <Avatar className="border-2 border-[#b096f9] h-10 w-10">
                <AvatarImage src="https://avatar.vercel.sh/rachel.png" />
              </Avatar>
              <Avatar className="border-2 border-[#b096f9] h-10 w-10">
                <AvatarImage src="https://avatar.vercel.sh/mike.png" />
              </Avatar>
              <Avatar className="border-2 border-[#b096f9] h-10 w-10">
                <AvatarImage src="https://avatar.vercel.sh/sarah.png" />
              </Avatar>
              <div className="ml-2 h-10 w-10 rounded-full bg-black/10 flex items-center justify-center backdrop-blur-sm border-2 border-[#b096f9]">
                <span className="text-xs font-bold">+12</span>
              </div>
            </div>
            <span className="text-sm font-medium text-black/70 hidden sm:inline-block">friends are doing this</span>
          </div>
        </div>
        
        {/* Abstract shapes adapted for a wider aspect ratio */}
        <div className="relative h-48 w-full max-w-md hidden md:block">
          <div className="absolute top-4 right-10 w-32 h-32 bg-[#ffc163] rounded-full shadow-2xl mix-blend-multiply opacity-90 animate-pulse"></div>
          <div className="absolute -bottom-4 left-10 w-40 h-40 bg-[#abc9ff] rounded-[2.5rem] shadow-2xl mix-blend-multiply transform rotate-12 opacity-90"></div>
          <div className="absolute top-12 left-1/2 w-24 h-24 bg-black rounded-full shadow-2xl mix-blend-overlay opacity-60"></div>
        </div>
      </div>

      {/* KPI Grid - Using the pastel colors as card backgrounds */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="rounded-[32px] border-none bg-[#ffc163] text-black shadow-sm overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-2xl -mr-10 -mt-10"></div>
          <CardHeader className="pb-2 relative z-10">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <div className="p-2 bg-black/10 rounded-full">
                <Flame className="h-4 w-4" />
              </div>
              Daily Calories
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold mt-2">2,150 <span className="text-lg text-black/60 font-medium">/ 2,400</span></div>
            <p className="text-sm font-medium mt-2 bg-black/10 inline-block px-3 py-1 rounded-full">
              250 kcal remaining
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-[32px] border-none bg-[#abc9ff] text-black shadow-sm overflow-hidden relative">
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/30 rounded-full blur-2xl -mr-10 -mb-10"></div>
          <CardHeader className="pb-2 relative z-10">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <div className="p-2 bg-black/10 rounded-full">
                <Utensils className="h-4 w-4" />
              </div>
              Protein Target
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold mt-2">145g <span className="text-lg text-black/60 font-medium">/ 180g</span></div>
            <p className="text-sm font-medium mt-2 bg-black/10 inline-block px-3 py-1 rounded-full flex items-center w-fit gap-1">
              <TrendingUp className="h-3 w-3" /> Behind schedule
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-[32px] border-none bg-[#fda3f8] text-black shadow-sm overflow-hidden relative">
          <div className="absolute top-1/2 right-0 w-32 h-32 bg-white/20 rounded-full blur-2xl -mr-10 -mt-16"></div>
          <CardHeader className="pb-2 relative z-10">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <div className="p-2 bg-black/10 rounded-full">
                <Dumbbell className="h-4 w-4" />
              </div>
              Weekly Training
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold mt-2">3 <span className="text-lg text-black/60 font-medium">/ 4</span></div>
            <p className="text-sm font-medium mt-2 bg-white/30 inline-block px-3 py-1 rounded-full">
              On track for the week
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-[32px] border-none bg-muted/40 shadow-none overflow-hidden relative">
          <CardHeader className="pb-2 relative z-10">
            <CardTitle className="text-sm font-semibold flex items-center gap-2 text-muted-foreground">
              <div className="p-2 bg-background rounded-full border shadow-sm">
                <Moon className="h-4 w-4 text-foreground" />
              </div>
              Sleep Quality
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold mt-2">85%</div>
            <p className="text-sm font-medium mt-2 text-emerald-500 inline-block px-3 py-1 rounded-full bg-emerald-500/10">
              +5% from last night
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Large Heatmap */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="rounded-[32px] bg-card border shadow-sm overflow-hidden">
            <HealthActivityWidget 
              title="Consistency Engine"
              description="Your daily adherence to health inputs over the past year."
              className="w-full border-none shadow-none" 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Upcoming Plan - Web adapted version of "Your plan" */}
            <div className="rounded-[32px] bg-card border shadow-sm p-8 flex flex-col">
              <h3 className="text-xl font-bold mb-6">Upcoming Plan</h3>
              <div className="space-y-4">
                <div className="flex gap-4 items-center p-4 rounded-2xl bg-muted/50 transition-colors hover:bg-muted">
                  <div className="h-14 w-14 rounded-full bg-[#ffc163] text-black flex items-center justify-center shrink-0">
                    <Dumbbell className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Hypertrophy Upper</h4>
                    <p className="text-sm text-muted-foreground">Today, 14:00 - 15:00</p>
                  </div>
                </div>
                <div className="flex gap-4 items-center p-4 rounded-2xl bg-muted/50 transition-colors hover:bg-muted">
                  <div className="h-14 w-14 rounded-full bg-[#abc9ff] text-black flex items-center justify-center shrink-0">
                    <Moon className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Active Recovery</h4>
                    <p className="text-sm text-muted-foreground">Tomorrow, 08:00 - 09:00</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Placeholder for Analytics */}
            <div className="rounded-[32px] bg-card border shadow-sm p-8 flex flex-col items-center justify-center text-center min-h-[250px]">
               <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
                  <TrendingUp className="h-8 w-8 text-muted-foreground" />
               </div>
               <h3 className="text-xl font-bold mb-2">Weight vs Caloric Trend</h3>
               <p className="text-muted-foreground text-sm">Visualizing inputs vs outputs.</p>
               <Button variant="link" className="mt-4 text-primary">View Analysis</Button>
            </div>
          </div>
        </div>

        {/* Right Column - Recent Logs */}
        <div className="lg:col-span-1">
          <div className="rounded-[32px] bg-card border shadow-sm p-8 h-full">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-bold">Recent Logs</h3>
                <p className="text-sm text-muted-foreground mt-1">Your latest health inputs</p>
              </div>
            </div>
            
            <div className="space-y-6">
              {recentLogs.map((log) => (
                <div key={log.id} className="flex gap-4 relative">
                  <div className="absolute top-10 left-5 bottom-[-24px] w-px bg-border last:hidden"></div>
                  <div className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full shadow-sm ${log.color}`}>
                    {log.icon}
                  </div>
                  <div className="flex flex-col pb-4">
                    <p className="text-sm font-semibold">
                      {log.type} <span className="font-normal text-muted-foreground">· {log.action}</span>
                    </p>
                    <p className="text-sm font-medium mt-1 p-3 rounded-2xl bg-muted/50 border">
                      {log.details}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {log.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <Button variant="outline" className="w-full mt-6 rounded-xl h-12">
              View All History
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
