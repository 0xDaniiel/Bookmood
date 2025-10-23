export const GOOGLE_BOOKS_BASE_URL =
  "https://www.googleapis.com/books/v1/volumes";

// Default fallback search params
export const defaultSearchParams = {
  q: "bestsellers",
  langRestrict: "en",
  printType: "books",
  maxResults: 10,
};

// Example mock data for testing UI before live API
export const sampleBooks = [
  {
    id: "1",
    title: "The Alchemist",
    author: "Paulo Coelho",
    genre: "fiction",
    language: "en",
    thumbnail:
      "https://books.google.com/books/content?id=alchemist-cover&printsec=frontcover&img=1&zoom=1",
  },
  {
    id: "2",
    title: "Atomic Habits",
    author: "James Clear",
    genre: "selfhelp",
    language: "en",
    thumbnail:
      "https://books.google.com/books/content?id=atomichabits-cover&printsec=frontcover&img=1&zoom=1",
  },
];
