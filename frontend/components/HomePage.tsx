"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

import SwipeMood from "@/components/SwipeMood";

const HomePage = () => {
  const [genre, setGenre] = useState("");
  const [format, setFormat] = useState("");
  const [language, setLanguage] = useState("en");
  const [length, setLength] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call — replace with real fetch later
    setTimeout(() => {
      setLoading(false);
      console.log({ genre, format, language, length });
    }, 2000);
  };

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

      <form className="bg-amber-50 shadow-lg rounded-2xl p-6 w-full max-w-md space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-[#4B2E05]">
            Preferred Genre
          </label>
          <select
            className="w-full p-2 rounded-lg border border-amber-200 bg-white text-[#4B2E05]"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          >
            <option value="">Select Genre</option>
            <option value="fiction">Fiction</option>
            <option value="nonfiction">Non-Fiction</option>
            <option value="romance">Romance</option>
            <option value="thriller">Thriller</option>
            <option value="selfhelp">Self-Help</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-[#4B2E05]">
            Format
          </label>
          <select
            className="w-full p-2 rounded-lg border border-amber-200 bg-white text-[#4B2E05]"
            value={format}
            onChange={(e) => setFormat(e.target.value)}
          >
            <option value="">Select Format</option>
            <option value="ebooks">Ebook</option>
            <option value="audiobooks">Audiobook</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-[#4B2E05]">
            Language
          </label>
          <select
            className="w-full p-2 rounded-lg border border-amber-200 bg-white text-[#4B2E05]"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
          </select>
        </div>

        <div className="w-full max-w-md mb-6">
          <SwipeMood />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-[#4B2E05]">
            Preferred Length
          </label>
          <select
            className="w-full p-2 rounded-lg border border-amber-200 bg-white text-[#4B2E05]"
            value={length}
            onChange={(e) => setLength(e.target.value)}
          >
            <option value="">Select Length</option>
            <option value="short">Short Reads</option>
            <option value="medium">Medium</option>
            <option value="long">Long</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full cursor-pointer hover:cursor-pointer bg-[#4B2E05] text-amber-50 py-2 rounded-lg font-semibold hover:bg-[#3B2404] transition flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-amber-50"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
              <span>Finding...</span>
            </>
          ) : (
            "Find My Book"
          )}
        </button>
      </form>
    </div>
  );
};

export default HomePage;
