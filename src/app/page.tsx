import { AppSidebar } from "@/components/app-sidebar";
import { getSession } from "@/server/better-auth/server";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { redirect } from "next/navigation";
import Dashboard from "./dashboard/page";
export default async function Home() {
  const session = await getSession();

  // If user is already logged in, show the dashboard with sidebar
  if (session) {
    const userData = {
      name: session.user?.name || "User",
      email: session.user?.email || "",
      avatar: session.user?.image || undefined,
    };

    return (
      <SidebarProvider>
        <AppSidebar user={userData} variant="inset" />
        <SidebarInset>
          <Dashboard></Dashboard>
        </SidebarInset>
      </SidebarProvider>
    );
  }

  // If not logged in, redirect to login page
  redirect("/login");
}
