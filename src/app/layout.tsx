import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Arena Targeting Lab",
  description:
    "Interactive sandbox for testing mobile arena audience targeting, intent signals, and launch strategy scenarios.",
  openGraph: {
    title: "Arena Targeting Lab",
    description:
      "Plan mobile arena launches with personas, demand curves, and intent signal testing in an interactive lab.",
    url: "https://agentic-84bf390a.vercel.app",
    siteName: "Arena Targeting Lab",
    images: [
      {
        url: "https://agentic-84bf390a.vercel.app/og-card.svg",
        width: 1200,
        height: 630,
        alt: "Arena Targeting Lab preview"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Arena Targeting Lab",
    description: "Model and validate mobile arena targeting scenarios in minutes.",
    creator: "@design_arena",
    images: ["https://agentic-84bf390a.vercel.app/og-card.svg"]
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
