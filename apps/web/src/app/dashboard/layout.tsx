import { AppSidebar } from "@/components/app-sidebar";
import { getSession } from "@helix/auth/server";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator"
import { ThemeToggle } from "@/components/theme-toggle"
import { redirect } from "next/navigation";
import { DynamicBreadcrumb } from "@/components/dynamic-breadcrumb";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getSession();

    // If not logged in, redirect to login page
    if (!session) {
        redirect("/login");
    }

    const userData = {
        name: session.user?.name ?? "User",
        email: session.user?.email ?? "",
        avatar: session.user?.image ?? undefined,
    };

    return (
        <SidebarProvider>
            <AppSidebar user={userData} variant="inset" />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4 flex-1">
                        <SidebarTrigger className="-ml-1" />
                        <Separator
                            orientation="vertical"
                            className="mr-2 data-[orientation=vertical]:h-4"
                        />
                        <DynamicBreadcrumb />
                    </div>
                    <div className="px-4">
                        <ThemeToggle />
                    </div>
                </header>
                {children}
            </SidebarInset>
        </SidebarProvider>
    );
}
