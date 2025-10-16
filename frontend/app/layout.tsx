import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  weight: ["100", "300", "500", "700"],
  subsets: ["latin"],
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
    siteName: "BookMood",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.className} `}>
      <body className="min-h-screen bg-amber-100 text-[#4B2E05] font-[var(--font-inter)] antialiased">
        <main className="max-w-3xl mx-auto px-6 py-10">{children}</main>
      </body>
    </html>
  );
}
