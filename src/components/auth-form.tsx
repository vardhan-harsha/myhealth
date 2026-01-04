"use client";

import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/server/better-auth/client";

export function AuthForm({
    className,
    view = "login",
    ...props
}: React.ComponentProps<"div"> & { view?: "login" | "signup" | "forgot-password" }) {
    const [isLoading, setIsLoading] = useState(false);

    // Derived state from props instead of internal state
    const isLogin = view === "login";
    const isForgotPassword = view === "forgot-password";

    const handleEmailAuth = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const name = formData.get("name") as string;

        try {
            if (isForgotPassword) {
                const { error } = await authClient.requestPasswordReset({
                    email,
                    redirectTo: "/reset-password",
                });

                if (error) {
                    toast.error("Error", {
                        description: error.message || "Something went wrong. Please try again.",
                    });
                } else {
                    toast.success("Check your email", {
                        description: "If an account exists with that email, we've sent a reset link.",
                    });
                }
                setIsLoading(false);
                return;
            }

            let result;
            if (isLogin) {
                result = await authClient.signIn.email({
                    email,
                    password,
                });
            } else {
                result = await authClient.signUp.email({
                    email,
                    password,
                    name,
                });
            }

            // Check if the result indicates an error
            if (result?.error) {
                toast.error(isLogin ? "Sign in failed" : "Sign up failed", {
                    description: result.error.message || "Please check your credentials and try again.",
                });
                setIsLoading(false);
                return;
            }

            // Success case
            toast.success(isLogin ? "Welcome back!" : "Account created!", {
                description: isLogin ? "You've successfully signed in." : "Welcome to Helix!",
            });

            // Small delay to show the toast before reload/redirect
            setTimeout(() => {
                window.location.href = "/";
            }, 500);
        } catch (err: any) {
            console.error("Auth error:", err);

            // Better Auth errors might be in err.error or err.message
            const errorMessage = err?.error?.message || err?.message || "Please check your credentials and try again.";

            toast.error(isLogin ? "Sign in failed" : "Sign up failed", {
                description: errorMessage,
            });
            setIsLoading(false);
        }
    };

    const handleOAuthSignIn = async (provider: "github" | "google" | "microsoft") => {
        setIsLoading(true);

        try {
            await authClient.signIn.social({
                provider,
                callbackURL: "/",
            });
        } catch (err) {
            toast.error("OAuth sign-in failed", {
                description: err instanceof Error ? err.message : "Please try again.",
            });
            setIsLoading(false);
        }
    };

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <form onSubmit={handleEmailAuth} className="flex flex-col gap-6">
                <FieldGroup>
                    <div className="flex flex-col items-center gap-1 text-center">
                        <h1 className="text-2xl font-bold">
                            {isForgotPassword ? "Reset Password" : isLogin ? "Welcome back" : "Create your account"}
                        </h1>
                        <p className="text-muted-foreground text-sm text-balance">
                            {isForgotPassword
                                ? "Enter your email to receive a reset link"
                                : isLogin
                                    ? "Enter your credentials to sign in"
                                    : "Fill in the form below to create your account"}
                        </p>
                    </div>

                    {!isLogin && (
                        <Field>
                            <FieldLabel htmlFor="name">Full Name</FieldLabel>
                            <Input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="John Doe"
                                required
                                disabled={isLoading}
                            />
                        </Field>
                    )}

                    <Field>
                        <FieldLabel htmlFor="email">Email</FieldLabel>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="m@example.com"
                            required
                            disabled={isLoading}
                        />
                    </Field>

                    {!isForgotPassword && (
                        <Field>
                            <div className="flex items-center">
                                <FieldLabel htmlFor="password">Password</FieldLabel>
                                {isLogin && (
                                    <a
                                        href="/forgot-password"
                                        className="ml-auto text-sm underline-offset-4 hover:underline"
                                    >
                                        Forgot password?
                                    </a>
                                )}
                            </div>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                required
                                disabled={isLoading}
                            />
                            {!isLogin && !isForgotPassword && (
                                <FieldDescription>
                                    Must be at least 8 characters long.
                                </FieldDescription>
                            )}
                        </Field>
                    )}

                    <Field>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? "Loading..." : isForgotPassword ? "Send Reset Link" : isLogin ? "Sign In" : "Create Account"}
                        </Button>
                    </Field>

                    <FieldSeparator>Or continue with</FieldSeparator>

                    <div className="grid grid-cols-3 gap-3">
                        <Button
                            variant="outline"
                            type="button"
                            onClick={() => handleOAuthSignIn("github")}
                            disabled={isLoading}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="size-5">
                                <path
                                    d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                                    fill="currentColor"
                                />
                            </svg>
                        </Button>

                        <Button
                            variant="outline"
                            type="button"
                            onClick={() => handleOAuthSignIn("google")}
                            disabled={isLoading}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="size-5">
                                <path
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    fill="#4285F4"
                                />
                                <path
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    fill="#34A853"
                                />
                                <path
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    fill="#FBBC05"
                                />
                                <path
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    fill="#EA4335"
                                />
                            </svg>
                        </Button>

                        <Button
                            variant="outline"
                            type="button"
                            onClick={() => handleOAuthSignIn("microsoft")}
                            disabled={isLoading}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23 23" className="size-5">
                                <path fill="#f3f3f3" d="M0 0h23v23H0z" />
                                <path fill="#f35325" d="M1 1h10v10H1z" />
                                <path fill="#81bc06" d="M12 1h10v10H12z" />
                                <path fill="#05a6f0" d="M1 12h10v10H1z" />
                                <path fill="#ffba08" d="M12 12h10v10H12z" />
                            </svg>
                        </Button>
                    </div>

                    <FieldDescription className="text-center">
                        {isForgotPassword ? (
                            <a
                                href="/login"
                                className="underline underline-offset-4 hover:text-primary"
                            >
                                Back to sign in
                            </a>
                        ) : isLogin ? (
                            <>
                                Don&apos;t have an account?{" "}
                                <a
                                    href="/signup"
                                    className="underline underline-offset-4 hover:text-primary"
                                >
                                    Sign up
                                </a>
                            </>
                        ) : (
                            <>
                                Already have an account?{" "}
                                <a
                                    href="/login"
                                    className="underline underline-offset-4 hover:text-primary"
                                >
                                    Sign in
                                </a>
                            </>
                        )}
                    </FieldDescription>
                </FieldGroup>
            </form>
        </div>
    );
}
