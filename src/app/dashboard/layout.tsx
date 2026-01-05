import { AppSidebar } from "@/components/app-sidebar";
import { getSession } from "@/server/better-auth/server";
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar";
import { redirect } from "next/navigation";

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
            <SidebarInset>{children}</SidebarInset>
        </SidebarProvider>
    );
}
