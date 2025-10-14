"use client";

import React from "react";
import TinderCard from "react-tinder-card";
import { motion } from "framer-motion";

interface MoodCardProps {
  mood: {
    name: string;
    emoji: string;
    desc: string;
  };
  onSwipe: (direction: string, mood: string) => void;
}

export default function MoodCard({ mood, onSwipe }: MoodCardProps) {
  return (
    <TinderCard
      className="absolute"
      key={mood.name}
      onSwipe={(dir) => onSwipe(dir, mood.name)}
      preventSwipe={["up", "down"]}
    >
      <motion.div
        className="bg-white rounded-2xl shadow-lg w-80 h-96 flex flex-col items-center justify-center text-center p-6"
        whileHover={{ scale: 1.03 }}
      >
        <div className="text-6xl mb-4">{mood.emoji}</div>
        <h2 className="text-2xl font-semibold">{mood.name}</h2>
        <p className="text-gray-600 mt-2">{mood.desc}</p>
      </motion.div>
    </TinderCard>
  );
}
