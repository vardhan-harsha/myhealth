"use client"

import { usePathname } from "next/navigation"
import React from "react"

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

const ROUTE_NAME_MAP: Record<string, string> = {
    dashboard: "Dashboard",
    wellbeing: "My Wellbeing",
    advisory: "Ask Helix",
    community: "Community",
    settings: "Settings",
}

export function DynamicBreadcrumb() {
    const pathname = usePathname()
    const segments = pathname.split("/").filter((segment) => segment !== "")

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {segments.map((segment, index) => {
                    const isLast = index === segments.length - 1
                    const href = `/${segments.slice(0, index + 1).join("/")}`
                    const name = ROUTE_NAME_MAP[segment] || segment.charAt(0).toUpperCase() + segment.slice(1)

                    return (
                        <React.Fragment key={href}>
                            <BreadcrumbItem className="hidden md:block">
                                {isLast ? (
                                    <BreadcrumbPage>{name}</BreadcrumbPage>
                                ) : (
                                    <BreadcrumbLink href={href}>{name}</BreadcrumbLink>
                                )}
                            </BreadcrumbItem>
                            {!isLast && <BreadcrumbSeparator className="hidden md:block" />}
                        </React.Fragment>
                    )
                })}
            </BreadcrumbList>
        </Breadcrumb>
    )
}
