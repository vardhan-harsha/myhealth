"use client";

import React, { createContext, useContext, type ReactNode } from "react";
import { useSession } from "@myhealth/auth/client";

// Define the user type based on Better Auth session
export type User = {
    id: string;
    name: string;
    email: string;
    image?: string;
    emailVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
} | null;

export type Session = {
    session: {
        userId: string;
        expiresAt: Date;
        token: string;
        ipAddress?: string;
        userAgent?: string;
    };
    user: User;
} | null;

// Create the context with proper typing
type UserContextType = {
    session: Session;
    user: User;
    isLoading: boolean;
    error: Error | null;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider component
export function UserProvider({ children }: { children: ReactNode }) {
    const { data: session, isPending, error } = useSession();

    const contextValue: UserContextType = {
        session: session as Session,
        user: session?.user as User,
        isLoading: isPending,
        error: error as Error | null,
    };

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
}

// Custom hook to use the user context
export function useUser() {
    const context = useContext(UserContext);

    if (context === undefined) {
        throw new Error("useUser must be used within a UserProvider");
    }

    return context;
}
