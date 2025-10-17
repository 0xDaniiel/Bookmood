"use client";

import MoodSwipeDeck from "@/components/MoodSwipeDeck";
import ButterflyBackground from "@/components/ButterflyBackground";
import Header from "@/components/Header";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-between bg-[#FAE8B8] text-[#4B2E05] overflow-hidden px-4">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-[#B08B57]/20 text-4xl"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              rotate: `${Math.random() * 360}deg`,
            }}
            animate={{ opacity: [0.1, 0.2, 0.1] }}
            transition={{ repeat: Infinity, duration: 6 + Math.random() * 4 }}
          >
            📚
          </motion.div>
        ))}
      </div>

      <ButterflyBackground />

      <Header />

      <div className="flex-1 flex items-center justify-center -mt-20">
        <MoodSwipeDeck />
      </div>

      <p className="mt-6 text-center text-[#6B4E1F]/80 italic max-w-md">
        "Swipe through your mood to find the perfect book for today."
      </p>
    </main>
  );
}
