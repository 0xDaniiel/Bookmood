"use client";
import { motion, useAnimation, PanInfo } from "framer-motion";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

interface MoodCardProps {
  emoji: string;
  title: string;
  desc: string;
  color: string;
  onSwipe: (direction: "left" | "right") => void;
}

const MoodCard: React.FC<MoodCardProps> = ({
  emoji,
  title,
  desc,
  color,
  onSwipe,
}) => {
  const router = useRouter();
  const controls = useAnimation();

  const handleSelectMood = () => {
    router.push(`/bookform?mood=${title.toLowerCase()}`);
  };

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x > 100) {
      controls
        .start({
          x: 500,
          rotate: 20,
          opacity: 0,
          transition: { type: "spring", stiffness: 300, damping: 20 },
        })
        .then(() => onSwipe("right"));
    } else if (info.offset.x < -100) {
      controls
        .start({
          x: -500,
          rotate: -20,
          opacity: 0,
          transition: { type: "spring", stiffness: 300, damping: 20 },
        })
        .then(() => onSwipe("left"));
    } else {
      controls.start({
        x: 0,
        rotate: 0,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      });
    }
  };

  useEffect(() => {
    controls.start({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", stiffness: 200, damping: 20 },
    });
  }, [controls]);

  return (
    <motion.div
      className="backdrop-blur-md shadow-xl rounded-2xl p-6 w-80 text-center cursor-grab border border-amber-200"
      style={{ backgroundColor: color }}
      drag="x"
      dragElastic={0.8}
      onDragEnd={handleDragEnd}
      animate={controls}
      initial={{ opacity: 0, scale: 0.95, y: 50 }}
      exit={{ opacity: 0, scale: 0.9, y: -50 }}
      whileTap={{ scale: 0.97, cursor: "grabbing" }}
    >
      <div className="text-5xl mb-2">{emoji}</div>
      <h3 className="text-xl font-semibold text-[#4B2E05]">{title}</h3>
      <p className="text-sm text-[#6B4E1F] mt-2">{desc}</p>
      <p className="text-xs text-[#A67C52] mt-4 italic">Swipe left or right</p>

      <button
        onClick={handleSelectMood}
        className="mt-6 px-5 py-2 bg-[#4B2E05] text-amber-50 rounded-lg font-semibold shadow-md hover:bg-[#3B2404] cursor-pointer transition"
      >
        Select Mood
      </button>
    </motion.div>
  );
};

export default MoodCard;
