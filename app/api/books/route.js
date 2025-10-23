import { NextResponse } from "next/server";
import { moods } from "@/data/mood";

const GOOGLE_BOOKS_BASE_URL = "https://www.googleapis.com/books/v1/volumes";

export async function POST(req) {
  try {
    const data = await req.json();
    const { mood, language, format, type } = data;

    // Match mood with keywords from /data/mood.ts
    const selectedMood = moods.find((m) => m.title === mood);
    const moodKeywords = selectedMood?.keywords || mood || "books";

    // Build main query (using only mood keywords)
    let q = moodKeywords.replace(/\s+/g, "+").trim();

    // Build URL params
    const params = new URLSearchParams({
      q,
      langRestrict: language || "en",
      maxResults: "12",
    });

    if (format && format !== "any") params.set("printType", format);
    if (type === "free") params.set("filter", "free-ebooks");
    if (type === "paid") params.set("filter", "paid-ebooks");

    // Fetch from Google Books
    let res = await fetch(`${GOOGLE_BOOKS_BASE_URL}?${params.toString()}`);
    let result = await res.json();

    // Fallback — broader search if nothing found
    if (!result.items?.length && moodKeywords) {
      const fallbackParams = new URLSearchParams({
        q: mood,
        langRestrict: language || "en",
        maxResults: "12",
      });
      res = await fetch(
        `${GOOGLE_BOOKS_BASE_URL}?${fallbackParams.toString()}`
      );
      result = await res.json();
    }

    const books =
      result.items?.map((item) => ({
        id: item.id,
        title: item.volumeInfo.title || "Untitled",
        author: item.volumeInfo.authors?.join(", ") || "Unknown Author",
        genre: item.volumeInfo.categories?.[0] || "General",
        language: item.volumeInfo.language || language,
        thumbnail:
          item.volumeInfo.imageLinks?.thumbnail ||
          "https://via.placeholder.com/128x195?text=No+Cover",
        description: item.volumeInfo.description || "",
      })) || [];

    return NextResponse.json({ books });
  } catch (error) {
    console.error("Error fetching books:", error);
    return NextResponse.json(
      { books: [], error: "Failed to fetch books" },
      { status: 500 }
    );
  }
}
