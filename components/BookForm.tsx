"use client";
import {
  genres,
  languages,
  printTypes,
  orderByOptions,
  availability,
} from "@/data/option";
import Loader from "./Loader";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface SelectOption {
  label: string;
  value: string;
}

interface BookFormProps {
  selectedMood?: string;
}

interface SelectFieldProps {
  label: string;
  options: SelectOption[];
  value: string;
  onChange: (val: string) => void;
}

const SelectField = ({ label, options, value, onChange }: SelectFieldProps) => (
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
  const [language, setLanguage] = useState("en");
  const [printType, setPrintType] = useState("");
  const [orderBy, setOrderBy] = useState("relevance");
  const [filter, setFilter] = useState("none");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const params = new URLSearchParams({
      mood: selectedMood || "",
      genre,
      language,
      printType,
      orderBy,
      filter,
    });

    router.push(`/results?${params.toString()}`);
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-amber-50 shadow-lg rounded-2xl p-6 w-full max-w-md space-y-4 text-left"
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
        label="Language"
        options={languages}
        value={language}
        onChange={setLanguage}
      />

      <SelectField
        label="Print Type"
        options={printTypes}
        value={printType}
        onChange={setPrintType}
      />

      <SelectField
        label="Order By"
        options={orderByOptions}
        value={orderBy}
        onChange={setOrderBy}
      />

      <SelectField
        label="Availability"
        options={availability}
        value={filter}
        onChange={setFilter}
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
