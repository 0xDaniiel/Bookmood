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
      // Send the selected mood to /bookform (next page)
      const selectedMood = moods[index].title.toLowerCase();
      router.push(`/bookform?mood=${selectedMood}`);
    } else {
      if (nextIndex < moods.length) setIndex(nextIndex);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          className="absolute"
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
        >
          <MoodCard {...moods[index]} onSwipe={handleSwipe} />
        </motion.div>
      </AnimatePresence>

      <p className="text-sm text-amber-100 mt-64">
        {index + 1} / {moods.length}
      </p>
    </div>
  );
};

export default MoodSwipeDeck;
