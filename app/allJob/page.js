import React, { Suspense } from "react";
import AllJobsClient from "@/components/alljobs/AllJobsClient";

export default function Page() {
  return (
    <Suspense fallback={<div className="py-20 text-center">Loading jobs...</div>}>
      <AllJobsClient />
    </Suspense>
  );
}
