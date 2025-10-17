"use client";

import { genres, formats, languages, lengths } from "@/data/option";
import Loader from "./Loader";
import { useState } from "react";

interface BookFormProps {
  selectedMood?: string;
}

const SelectField = ({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { label: string; value: string }[];
  value: string;
  onChange: (val: string) => void;
}) => (
  <div>
    <label className="block text-sm font-medium mb-1 text-[#4B2E05]">
      {label}
    </label>
    <select
      className="w-full p-2 rounded-lg border border-amber-200 bg-white text-[#4B2E05]"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">{`Select ${label}`}</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

const BookForm = ({ selectedMood }: BookFormProps) => {
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
      console.log({
        mood: selectedMood,
        genre,
        format,
        language,
        length,
      });
      // You can trigger real API fetch here
    }, 2000);
  };

  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-amber-50 shadow-lg rounded-2xl p-6 w-full max-w-md space-y-4"
    >
      {selectedMood && (
        <div className="text-center mb-4">
          <p className="text-[#4B2E05]/70 text-sm">
            Mood selected:{" "}
            <span className="font-semibold">{capitalize(selectedMood)}</span>
          </p>
        </div>
      )}

      <SelectField
        label="Preferred Genre"
        options={genres}
        value={genre}
        onChange={setGenre}
      />
      <SelectField
        label="Format"
        options={formats}
        value={format}
        onChange={setFormat}
      />
      <SelectField
        label="Language"
        options={languages}
        value={language}
        onChange={setLanguage}
      />
      <SelectField
        label="Preferred Length"
        options={lengths}
        value={length}
        onChange={setLength}
      />

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
