"use client";

import { authClient } from "@/server/better-auth/client";

export function SignInButton() {
    const handleSignIn = async () => {
        await authClient.signIn.social({
            provider: "github",
            callbackURL: "/",
        });
    };

    return (
        <button
            onClick={handleSignIn}
            className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
        >
            Sign in with Github
        </button>
    );
}
