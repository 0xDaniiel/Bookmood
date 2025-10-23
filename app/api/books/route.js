import { NextResponse } from "next/server";
import { moods } from "@/data/mood";

const GOOGLE_BOOKS_BASE_URL = "https://www.googleapis.com/books/v1/volumes";

export async function POST(req) {
  try {
    const data = await req.json();
    const { mood, genre, language, printType, orderBy, filter } = data;

    // 1️⃣ Find mood keywords
    const selectedMood = moods.find((m) => m.title === mood);
    const moodKeywords = selectedMood?.keywords || mood;

    // 2️⃣ Build main query: mood + genre combo
    let q = `${moodKeywords}`;
    if (genre) q += `+${genre}`;
    q = q.replace(/\s+/g, "+").trim();

    // 3️⃣ Build URL parameters
    const params = new URLSearchParams({
      q,
      langRestrict: language || "en",
      maxResults: "12",
    });

    if (printType && printType !== "any") params.set("printType", printType);
    if (orderBy) params.set("orderBy", orderBy);
    if (filter && filter !== "none") params.set("filter", filter);

    // 4️⃣ Fetch books
    let res = await fetch(`${GOOGLE_BOOKS_BASE_URL}?${params.toString()}`);
    let result = await res.json();

    // 5️⃣ Retry with broader query if nothing found
    if (!result.items?.length && genre) {
      const fallbackParams = new URLSearchParams({
        q: moodKeywords,
        langRestrict: language || "en",
        maxResults: "12",
      });
      res = await fetch(
        `${GOOGLE_BOOKS_BASE_URL}?${fallbackParams.toString()}`
      );
      result = await res.json();
    }

    // 6️⃣ Map results
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
