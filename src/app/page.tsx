import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { GalleryVerticalEnd } from "lucide-react";

import { AuthForm } from "@/components/auth-form";
import { AppSidebar } from "@/components/app-sidebar";
import { auth } from "@/server/better-auth";
import { getSession } from "@/server/better-auth/server";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
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

  // If not logged in, show the authentication form
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="/" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            SoloFounder
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md">
            <AuthForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <div className="max-w-md space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              Start building your dream
            </h2>
            <p className="text-muted-foreground text-lg">
              Join thousands of solo founders who are building amazing products.
              Sign in to get started.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
