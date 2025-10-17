"use client";
import React from "react";
import { motion } from "framer-motion";
const Header = () => {
  return (
    <div>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold mb-4 py-2 text-[#4B2E05]"
      >
        BookMood 📚
      </motion.h1>
      <p className="text-base sm:text-lg md:text-xl mb-8 max-w-md sm:max-w-lg text-[#4B2E05]/90 leading-relaxed  ">
        Find the perfect book to match your mood and preferences.
        <span className="block text-sm sm:text-base md:text-lg text-[#4B2E05]/70 italic mt-2">
          "Because every mood deserves the right story."
        </span>
      </p>
    </div>
  );
};

export default Header;
