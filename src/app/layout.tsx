import type { Metadata } from "next";
import "./globals.css";

import { Modals } from "@/components/modals";
import { JotaiProvider } from "@/components/jotai-provider";
import { Providers } from "./Provider";

import { Toaster } from "@/components/ui/sonner";
import { SheetProvider } from "@/providers/sheet-provider";

import { FontProvider } from "@/context/font-context";
import { RouteGuard } from "@/components/RouteGuard";
import { ThemeProvider } from "@/components/providers/theme-provider";

import { fontConfig } from "@/lib/fonts"
import type { Viewport } from 'next';

export const viewport: Viewport = {
  themeColor: "#0056b3",
}

export const metadata: Metadata = {
  title: {
    default: "Global Transport Logistics | Freight & Supply Chain Solutions",
    template: "%s | Global Transport Logistics"
  },
  description: "End-to-end logistics solutions, freight management, and real-time cargo tracking for your supply chain needs.",
  keywords: [
    "logistics", "freight", "transport", "shipping",
    "cargo", "supply chain", "fleet management",
    "warehousing", "distribution", "3PL"
  ],
  metadataBase: new URL("https://kanalogistics.co"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Global Transport Logistics | Freight & Supply Chain Solutions",
    description: "Professional logistics services with real-time tracking and analytics",
    url: "https://kanalogistics.co",
    siteName: "Global Transport Logistics",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Global Transport Logistics Network",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: "/apple-touch-icon.png" },
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const fontVariables = Object.values(fontConfig)
    .map((config) => config.font.variable)
    .join(" ");

  return (
    <html lang="en" suppressHydrationWarning={true} className={`${fontVariables} font-inter`}>
      <body suppressHydrationWarning={true}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <FontProvider>
            <JotaiProvider>
              <Providers>
                <SheetProvider />
                <Toaster />
                <Modals />
                <RouteGuard>
                  {children}
                </RouteGuard>
              </Providers>
            </JotaiProvider>
          </FontProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
