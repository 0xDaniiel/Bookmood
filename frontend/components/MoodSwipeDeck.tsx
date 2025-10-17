"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import MoodCard from "./MoodCard";
import { moods } from "@/data/mood";
import { useRouter } from "next/navigation";

const MoodSwipeDeck = () => {
  const [index, setIndex] = useState(0);
  const router = useRouter();

  const handleSwipe = (direction: "left" | "right") => {
    const nextIndex = index + 1;
    if (direction === "right") {
      const selectedMood = moods[index].title.toLowerCase();
      router.push(`/bookform?mood=${selectedMood}`);
    } else {
      if (nextIndex < moods.length) setIndex(nextIndex);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          className="absolute"
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
        >
          <MoodCard {...moods[index]} onSwipe={handleSwipe} />
        </motion.div>
      </AnimatePresence>

      <p className="text-sm text-[#4B2E05]/60 mt-6">
        {index + 1} / {moods.length}
      </p>
    </div>
  );
};

export default MoodSwipeDeck;
