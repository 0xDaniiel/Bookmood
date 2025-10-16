"use client";
import React from "react";
import { motion } from "framer-motion";
import BookForm from "./BookForm";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold mb-6 text-[#4B2E05]"
      >
        BookMood 📚
      </motion.h1>

      <p className="text-center text-base sm:text-lg md:text-xl mb-8 max-w-md sm:max-w-lg text-[#4B2E05]/90 leading-relaxed">
        Find the perfect book to match your mood and preferences.
        <span className="block text-sm sm:text-base md:text-lg text-[#4B2E05]/70 italic mt-2">
          "Because every mood deserves the right story."
        </span>
      </p>

      <BookForm />
    </div>
  );
};

export default HomePage;
