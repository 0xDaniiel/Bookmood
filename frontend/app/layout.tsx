import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "BookMood | Find Books That Match Your Mood",
  description:
    "Swipe through moods and get personalized book suggestions that match how you feel. Built with Next.js and Express.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "BookMood",
    description: "Discover books based on your current mood.",
    // url: "https://bookmood.vercel.app",
    siteName: "BookMood",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-gradient-to-b from-rose-50 to-amber-50 text-neutral-900 font-[var(--font-inter)] antialiased">
        <main className="max-w-3xl mx-auto px-6 py-10">{children}</main>
      </body>
    </html>
  );
}
