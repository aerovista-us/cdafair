import type { Metadata } from "next";
import AeroVistaBranding from "../components/AeroVistaBranding";
import UmamiAnalytics from "../components/UmamiAnalytics";
import "./globals.css";
import "./polish.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://cdafair.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "CDA Fair Day | Unofficial North Idaho State Fair Companion",
  description: "Today's North Idaho State Fair deal, schedule, parking, prices, directions and a quick fair-day planner.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Going to the Fair? Check this first 🎡",
    description: "Today's deal, what's happening, parking, prices and a quick Fair Day planner.",
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "CDA Fair Day"
  },
  twitter: {
    card: "summary_large_image",
    title: "CDA Fair Day",
    description: "Today's North Idaho State Fair info in one fast page."
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <AeroVistaBranding />
        <UmamiAnalytics />
      </body>
    </html>
  );
}
