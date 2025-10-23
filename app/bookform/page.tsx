"use client";

import React, { Suspense } from "react";
import Loader from "@/components/Loader";
import BookPreferencePage from "@/components/BookPreferencePage";

export const dynamic = "force-dynamic";

const Page = () => {
  return (
    <Suspense fallback={<Loader />}>
      <BookPreferencePage />
    </Suspense>
  );
};

export default Page;
