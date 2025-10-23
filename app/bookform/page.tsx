"use client";

import React, { Suspense } from "react";
import BookPreferencePage from "@/components/BookPreferencePage";

export const dynamic = "force-dynamic";

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BookPreferencePage />
    </Suspense>
  );
};

export default Page;
