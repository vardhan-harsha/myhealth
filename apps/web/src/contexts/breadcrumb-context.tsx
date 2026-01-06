"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { usePathname } from "next/navigation";

// Map of absolute path -> title
type BreadcrumbMap = Record<string, string>;

interface BreadcrumbContextType {
    breadcrumbs: BreadcrumbMap;
    setBreadcrumb: (path: string, title: string) => void;
}

const BreadcrumbContext = createContext<BreadcrumbContextType | undefined>(undefined);

export function BreadcrumbProvider({ children }: { children: React.ReactNode }) {
    const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbMap>({});

    const setBreadcrumb = useCallback((path: string, title: string) => {
        setBreadcrumbs((prev) => {
            // Prevent unnecessary state updates
            if (prev[path] === title) return prev;
            return { ...prev, [path]: title };
        });
    }, []);

    return (
        <BreadcrumbContext.Provider value={{ breadcrumbs, setBreadcrumb }}>
            {children}
        </BreadcrumbContext.Provider>
    );
}

export function useBreadcrumb() {
    const context = useContext(BreadcrumbContext);
    if (!context) {
        throw new Error("useBreadcrumb must be used within a BreadcrumbProvider");
    }
    return context;
}

/**
 * Component to register a breadcrumb title for a specific path.
 * If path is not provided, it registers the title for the current pathname.
 */
export function BreadcrumbMeta({ title, path }: { title: string; path?: string }) {
    const pathname = usePathname();
    const { setBreadcrumb } = useBreadcrumb();

    // If path is explicitly provided, use it. Otherwise use current pathname.
    // Note: For Layouts, you usually want to provide the specific path they own (e.g. "/dashboard").
    // For Pages, omitting path works fine as they render at the target URL.
    const targetPath = path ?? pathname;

    React.useEffect(() => {
        setBreadcrumb(targetPath, title);
    }, [targetPath, title, setBreadcrumb]);

    return null;
}
