"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@helix/auth/client";

function ResetPasswordForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const [isLoading, setIsLoading] = useState(false);

    if (!token) {
        return (
            <div className="flex flex-col items-center gap-4 text-center">
                <h1 className="text-2xl font-bold text-destructive">Invalid Link</h1>
                <p className="text-muted-foreground">The password reset link is invalid or has expired.</p>
                <Button onClick={() => router.push("/login")}>Back to Login</Button>
            </div>
        );
    }

    const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const password = formData.get("password") as string;
        const confirmPassword = formData.get("confirmPassword") as string;

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            setIsLoading(false);
            return;
        }

        try {
            const { error } = await authClient.resetPassword({
                newPassword: password,
                token,
            });

            if (error) {
                toast.error("Error", {
                    description: error.message ?? "Failed to reset password. Please try again.",
                });
            } else {
                toast.success("Password reset successful", {
                    description: "You can now sign in with your new password.",
                });
                router.push("/login");
            }
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : "Something went wrong.";
            toast.error("Error", {
                description: errorMessage,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center gap-1 text-center">
                <h1 className="text-2xl font-bold">New Password</h1>
                <p className="text-muted-foreground text-sm text-balance">
                    Please enter your new password below.
                </p>
            </div>
            <form onSubmit={handleResetPassword} className="flex flex-col gap-6">
                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor="password">New Password</FieldLabel>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            required
                            disabled={isLoading}
                        />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
                        <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            required
                            disabled={isLoading}
                        />
                        <FieldDescription>
                            Must be at least 8 characters long.
                        </FieldDescription>
                    </Field>
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Resetting..." : "Reset Password"}
                    </Button>
                </FieldGroup>
            </form>
        </div>
    );
}

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ResetPasswordForm />
        </Suspense>
    );
}
