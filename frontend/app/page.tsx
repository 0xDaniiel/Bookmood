"use client";

import MoodSwipeDeck from "@/components/MoodSwipeDeck";
import ButterflyBackground from "@/components/ButterflyBackground";
import Header from "@/components/Header";

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-between bg-gradient-to-b from-amber-100 via-[#FAE8B8] to-[#EED9B2] text-[#4B2E05] overflow-hidden px-4">
      <ButterflyBackground />
      <Header />
      <div className="flex-1 flex items-center justify-center -mt-20">
        <MoodSwipeDeck />
      </div>
    </main>
  );
}
