"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Loader({ children }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const start = () => setLoading(true);
    const end = () => setLoading(false);

    // For Next.js App Router navigation
    router.events?.on("routeChangeStart", start);
    router.events?.on("routeChangeComplete", end);
    router.events?.on("routeChangeError", end);

    return () => {
      router.events?.off("routeChangeStart", start);
      router.events?.off("routeChangeComplete", end);
      router.events?.off("routeChangeError", end);
    };
  }, [router]);

  return (
    <>
      {loading && (
        <div className="bg-red-700">
        <div className=" inset-0 flex items-center justify-center bg-white/70 z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500"></div>
        </div>
        </div>
      )}
      {children}
    </>
  );
}
