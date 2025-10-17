"use client";
import React from "react";
import { motion } from "framer-motion";

const Header = () => {
  return (
    <div className="text-center">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold py-3 text-[#4B2E05]"
      >
        BookMood 📚
      </motion.h1>
      <p className="text-base sm:text-lg md:text-xl mb-8 max-w-md sm:max-w-lg mx-auto text-[#4B2E05]/90 leading-relaxed">
        Discover books that feel just like you.
        <span className="block text-sm sm:text-base md:text-lg text-[#4B2E05]/70 italic">
          Every mood has a story.
        </span>
      </p>
    </div>
  );
};

export default Header;
