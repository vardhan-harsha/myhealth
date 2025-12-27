import { GalleryVerticalEnd } from "lucide-react";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex justify-center gap-2 md:justify-start">
                    <a href="/" className="flex items-center gap-2 font-medium">
                        <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                            <GalleryVerticalEnd className="size-4" />
                        </div>
                        SoloFounder
                    </a>
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-md">
                        {children}
                    </div>
                </div>
            </div>
            <div className="bg-muted relative hidden lg:block">
                <div className="absolute inset-0 flex items-center justify-center p-8">
                    <div className="max-w-md space-y-4 text-center">
                        <h2 className="text-3xl font-bold tracking-tight">
                            Start building your dream
                        </h2>
                        <p className="text-muted-foreground text-lg">
                            Join thousands of solo founders who are building amazing products.
                            Sign in to get started.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
