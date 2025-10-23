import { NextResponse } from "next/server";

export const GOOGLE_BOOKS_BASE_URL =
  "https://www.googleapis.com/books/v1/volumes";

export async function POST(req) {
  try {
    const data = await req.json();
    const { mood, genre, author, language } = data;

    // Build Google Books query
    let q = "";
    if (genre) q += `+subject:${genre}`;
    if (author) q += `+inauthor:${author}`;
    if (mood) q += `+intitle:${mood}`; // optionally include mood in title search

    const params = new URLSearchParams({
      q: q || "bestsellers",
      langRestrict: language || "en",
      maxResults: "10",
      printType: "books",
    });

    const res = await fetch(`${GOOGLE_BOOKS_BASE_URL}?${params.toString()}`);
    const result = await res.json();

    // Transform the data for frontend
    const books =
      result.items?.map((item) => ({
        id: item.id,
        title: item.volumeInfo.title,
        author: item.volumeInfo.authors?.join(", ") || "Unknown",
        genre: item.volumeInfo.categories?.[0] || "General",
        language: item.volumeInfo.language,
        thumbnail:
          item.volumeInfo.imageLinks?.thumbnail ||
          "https://via.placeholder.com/128x195?text=No+Cover",
      })) || [];

    return NextResponse.json({ books });
  } catch (error) {
    return NextResponse.json(
      { books: [], error: "Failed to fetch books" },
      { status: 500 }
    );
  }
}
