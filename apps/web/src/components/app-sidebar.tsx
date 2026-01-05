"use client"

import * as React from "react"
import {
  Bot,
  HeartPulse,
  LayoutDashboard,
  MessageSquare,
  Settings2,
  Users,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { AppLogo } from "./app-logo"

// Menu items.
const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "My Wellbeing",
      url: "/dashboard/wellbeing",
      icon: HeartPulse,
    },
    {
      title: "Ask Helix",
      url: "/dashboard/advisory",
      icon: Bot,
    },
    {
      title: "Community",
      url: "/dashboard/community",
      icon: Users,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "/dashboard/settings/general",
        },
        {
          title: "Team",
          url: "/dashboard/settings/team",
        },
        {
          title: "Billing",
          url: "/dashboard/settings/billing",
        },
        {
          title: "Limits",
          url: "/dashboard/settings/limits",
        },
      ],
    },
  ],
  recentChats: [
    {
      name: "Morning Check-in",
      url: "#",
      icon: MessageSquare,
    },
    {
      name: "Workout Advice",
      url: "#",
      icon: MessageSquare,
    },
    {
      name: "Sleep Analysis",
      url: "#",
      icon: MessageSquare,
    },
  ]
}

export function AppSidebar({
  user,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
}) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <AppLogo />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.recentChats} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user ?? { name: "User", email: "user@example.com" }} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
