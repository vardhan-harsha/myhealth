"use client"

import * as React from "react"
import Link from "next/link"
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarContext,
} from "@/components/ui/sidebar"

export function AppLogo() {
    const sidebarContext = React.useContext(SidebarContext)

    const isCollapsed = sidebarContext?.state === "collapsed"
    const isMobile = sidebarContext?.isMobile

    const logoPart = (
        <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
            <img src="/helix_light.svg" alt="Helix" className="size-8 dark:hidden" />
            <img src="/helix_dark.svg" alt="Helix" className="size-8 hidden dark:block" />
        </div>
    )

    const textPart = (!isCollapsed || isMobile) && (
        <div className="grid flex-1 text-left text-2xl leading-tight">
            <span className="truncate font-bold">
                Helix
            </span>
        </div>
    )

    if (!sidebarContext) {
        return (
            <div className="flex justify-start gap-4 items-center">
                <Link href="/" className="flex items-center gap-3">
                    {logoPart}
                    {textPart}
                </Link>
            </div>
        )
    }

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton size="lg" asChild className="h-12">
                    <Link href="/">
                        {logoPart}
                        {textPart}
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
