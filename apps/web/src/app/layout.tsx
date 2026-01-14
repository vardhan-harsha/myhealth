import "@/styles/globals.css";

import { type Metadata } from "next";
import { Plus_Jakarta_Sans, Lora, IBM_Plex_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

import { TRPCReactProvider } from "@/trpc/react";
import { UserProvider } from "@/contexts/user-context";
import { BreadcrumbProvider } from "@/contexts/breadcrumb-context";
import { ThemeProvider } from "@/components/theme-provider";
import { OnboardingGuard } from "@/components/layout/onboarding-guard";

export const metadata: Metadata = {
  title: "Helix",
  description: "Advanced AI for your health journey",
  icons: [{ rel: "icon", url: "/helix_light.svg" }],
};

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mono",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${lora.variable} ${ibmPlexMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          async
          crossOrigin="anonymous"
          src="https://tweakcn.com/live-preview.min.js"
        />
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TRPCReactProvider>
            <UserProvider>
              <BreadcrumbProvider>
                <OnboardingGuard>{children}</OnboardingGuard>
              </BreadcrumbProvider>
            </UserProvider>
          </TRPCReactProvider>
          <Toaster richColors position="top-right" />
        </ThemeProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
