"use client";
import { useSearchParams } from "next/navigation";
import { moods } from "@/data/mood";

const BookPreferencePage = () => {
  const searchParams = useSearchParams();
  const selectedMood = searchParams.get("mood");

  const mood = moods.find(
    (m) => m.title.toLowerCase() === selectedMood?.toLowerCase()
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 text-center">
      {mood && (
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-[#4B2E05]">
            {mood.emoji} {mood.title}
          </h2>
          <p className="text-[#6B4E1F]/90 mt-2">{mood.message}</p>
        </div>
      )}

      <BookForm selectedMood={selectedMood ?? ""} />
    </div>
  );
};
