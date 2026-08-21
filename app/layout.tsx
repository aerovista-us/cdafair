import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CDA Fair Day | Unofficial North Idaho State Fair Companion",
  description: "Today's North Idaho State Fair deal, schedule, parking, prices, directions and a quick fair-day planner.",
  openGraph: {
    title: "Going to the Fair? Check this first 🎡",
    description: "Today's deal, what's happening, parking, prices and a quick Fair Day planner.",
    type: "website",
    locale: "en_US"
  },
  twitter: {
    card: "summary_large_image",
    title: "CDA Fair Day",
    description: "Today's North Idaho State Fair info in one fast page."
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
