import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
    baseURL: "http://localhost:3000",
});

export const { useSession } = authClient;

export type Session = typeof authClient.$Infer.Session;
