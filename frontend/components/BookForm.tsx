import { genres, formats, languages, lengths } from "@/data/option";
import SwipeMood from "./SwipeMood";
import Loader from "./Loader";
import { useState } from "react";

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
          {genres.map((g) => (
            <option key={g.value} value={g.value}>
              {g.label}
            </option>
          ))}
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
          {formats.map((f) => (
            <option key={f.value} value={f.value}>
              {f.label}
            </option>
          ))}
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
          {languages.map((l) => (
            <option key={l.value} value={l.value}>
              {l.label}
            </option>
          ))}
        </select>
      </div>

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
          {lengths.map((l) => (
            <option key={l.value} value={l.value}>
              {l.label}
            </option>
          ))}
        </select>
      </div>

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
