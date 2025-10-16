"use client";
import { useState } from "react";
import SwipeMood from "./SwipeMood";
import Loader from "./Loader";

const BookForm = () => {
  const [genre, setGenre] = useState("");
  const [format, setFormat] = useState("");
  const [language, setLanguage] = useState("en");
  const [length, setLength] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      console.log({ genre, format, language, length });
    }, 2000);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-amber-50 shadow-lg rounded-2xl p-6 w-full max-w-md space-y-4"
    >
      {/* Genre */}
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

      {/* Format */}
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

      {/* Language */}
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

      {/* SwipeMood */}
      <div className="w-full max-w-md mb-6">
        <SwipeMood />
      </div>

      {/* Length */}
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

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#4B2E05] text-amber-50 py-2 rounded-lg font-semibold hover:bg-[#3B2404] transition flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader />
            <span>Finding...</span>
          </>
        ) : (
          "Find My Book"
        )}
      </button>
    </form>
  );
};

export default BookForm;
