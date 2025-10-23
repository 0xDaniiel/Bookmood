"use client";

import { useSearchParams } from "next/navigation";
import { moods } from "@/data/mood";
import BookForm from "./BookForm";
import { useState, useEffect } from "react";

const BookPreferencePage = () => {
  const searchParams = useSearchParams();
  const [selectedMood, setSelectedMood] = useState<string>("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Mark component as mounted
    setMounted(true);
    // Get mood from query param
    const moodParam = searchParams.get("mood") ?? "";
    setSelectedMood(moodParam);
  }, [searchParams]);

  if (!mounted) return null; // prevent hydration mismatch

  const moodData = moods.find(
    (m) => m.title.toLowerCase() === selectedMood.toLowerCase()
  );

  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 text-center">
      {selectedMood && moodData && (
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-[#4B2E05]">
            {moodData.emoji} {moodData.title}
          </h2>
          <p className="text-[#6B4E1F]/90 mt-2">{moodData.message}</p>
        </div>
      )}

      <BookForm selectedMood={capitalize(selectedMood)} />
    </div>
  );
};

export default BookPreferencePage;
