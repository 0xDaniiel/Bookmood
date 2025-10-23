"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Loader from "@/components/Loader";
import Image from "next/image";

interface Book {
  id: string;
  title: string;
  author: string;
  //   genre: string;
  language: string;
  thumbnail: string;
  moodMatch?: number;
}

const ResultsPage = () => {
  const searchParams = useSearchParams();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  // Query params
  const mood = searchParams.get("mood") || "";
  const language = searchParams.get("language") || "en";
  const format = searchParams.get("format") || "book";
  const type = searchParams.get("type") || "any";

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/books", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            mood,
            language,
            format,
            type,
          }),
        });

        const text = await res.text();
        const data = JSON.parse(text);
        setBooks(data.books || []);
      } catch (err) {
        console.error("Failed to fetch books:", err);
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [mood, language, format, type]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!books.length) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-2xl font-semibold text-[#4B2E05] mb-4">
          No books found
        </h2>
        <p className="text-[#6B4E1F]/90">
          Try adjusting your mood, language, or filters to get better matches.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 flex flex-col items-center">
      <h2 className="text-2xl font-semibold text-[#4B2E05] mb-6">
        Recommended Books
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl">
        {books.map((book) => (
          <div
            key={book.id}
            className="bg-[#FBE4B2] rounded-2xl shadow-md hover:shadow-xl p-4 flex flex-col items-center text-center transition-all duration-200 hover:scale-[1.02]"
          >
            <Image
              src={book.thumbnail}
              alt={book.title}
              width={128}
              height={192}
              className="w-32 h-48 object-cover rounded-lg mb-4 border-2 border-amber-200"
            />

            <h3 className="font-semibold text-[#4B2E05]">{book.title}</h3>
            <p className="text-sm text-[#6B4E1F]/90 mb-1">
              {book.author || "Unknown Author"}
            </p>
            {/* <p className="text-xs text-[#6B4E1F]/70">
              {book.genre || "General"} | {book.language?.toUpperCase()}
            </p> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultsPage;
