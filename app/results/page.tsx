"use client";

import { Suspense } from "react";
import ResultsPage from "@/components/ResultsPage";
import Loader from "@/components/Loader";

export const dynamic = "force-dynamic";

export default function Results() {
  return (
    <Suspense fallback={<Loader />}>
      <ResultsPage />
    </Suspense>
  );
}
