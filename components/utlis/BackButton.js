"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";

export default function BackButton() {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.back()}
      className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg shadow-sm text-gray-700 transition"
    >
      <ArrowLeft className="w-4 h-4" />
      Back
    </Button>
  );
}
