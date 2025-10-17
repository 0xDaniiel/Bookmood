"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import MoodCard from "./MoodCard";
import { moods } from "@/data/mood";

const MoodSwipeDeck = () => {
  const [index, setIndex] = useState(0);

  const handleSwipe = (_direction: "left" | "right") => {
    setIndex((prev) => (prev + 1) % moods.length); // infinite loop
  };

  const getNextCards = (start: number, count: number) => {
    const result = [];
    for (let i = 0; i < count; i++) {
      result.push(moods[(start + i) % moods.length]);
    }
    return result;
  };

  const visibleCards = getNextCards(index, 3);

  return (
    <div className="flex flex-col items-center justify-center w-full relative h-[500px]">
      <AnimatePresence initial={false}>
        {visibleCards.map((mood, i) => (
          <motion.div
            key={(index + i) % moods.length}
            className="absolute"
            style={{ zIndex: 10 - i }}
            initial={{
              scale: 0.95 - i * 0.02,
              y: 20 * i,
              rotate: i === 1 ? -5 : i === 2 ? 5 : 0,
              opacity: 1 - i * 0.1,
            }}
            animate={{
              scale: 1 - i * 0.02,
              y: 20 * i,
              rotate: i === 1 ? -5 : i === 2 ? 5 : 0,
              opacity: 1 - i * 0.1,
            }}
            exit={{ opacity: 0, scale: 0.9, y: -50 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <MoodCard {...mood} onSwipe={handleSwipe} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default MoodSwipeDeck;
