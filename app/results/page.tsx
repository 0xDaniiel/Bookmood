"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Loader from "@/components/Loader";
import Image from "next/image";

interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  language: string;
  thumbnail: string;
  moodMatch?: number;
}

const ResultsPage = () => {
  const searchParams = useSearchParams();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Get parameters from query string
  const mood = searchParams.get("mood") || "";
  const genre = searchParams.get("genre") || "";
  const language = searchParams.get("language") || "en";
  const format = searchParams.get("format") || "book";
  const type = searchParams.get("type") || "any"; // free, paid, any

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/books", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            mood,
            genre,
            language,
            format,
            type,
          }),
        });

        // Handle unexpected text/HTML responses
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
  }, [mood, genre, language, format, type]);

  // 🌀 Loading State
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  // ❌ No Books Found
  if (!books.length) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-2xl font-semibold text-[#4B2E05] mb-4">
          No books found
        </h2>
        <p className="text-[#6B4E1F]/90">
          Try adjusting your mood, genre, or filters to get better matches.
        </p>
      </div>
    );
  }

  // ✅ Display Books
  return (
    <div className="min-h-screen p-6 flex flex-col items-center">
      <h2 className="text-2xl font-semibold text-[#4B2E05] mb-6">
        Recommended Books
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl">
        {books.map((book) => (
          <div
            key={book.id}
            className="bg-white rounded-2xl shadow-lg p-4 flex flex-col items-center text-center"
          >
            <Image
              src={book.thumbnail || "/placeholder-book.png"}
              alt={book.title}
              width={128}
              height={192}
              className="w-32 h-48 object-cover rounded-lg mb-4"
            />

            <h3 className="font-semibold text-[#4B2E05]">{book.title}</h3>
            <p className="text-sm text-[#6B4E1F]/90 mb-1">
              {book.author || "Unknown Author"}
            </p>
            <p className="text-xs text-[#6B4E1F]/70">
              {book.genre || "General"} | {book.language?.toUpperCase()}
            </p>

            {book.moodMatch && (
              <p className="text-xs text-[#4B2E05]/70 mt-1">
                🎯 Mood match: {Math.round(book.moodMatch * 100)}%
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultsPage;
