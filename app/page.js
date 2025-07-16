"use client";
import BrowseByCategory from "@/components/BrowseByCategory";
import HeroSection from "@/components/HeroSection";
import JobsOfDay from "@/components/JobsOfDay";
import NewsAndBlogs from "@/components/NewsAndBlogs";
import SubscribeSection from "@/components/SubscribeSection";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    setInterval(() => {
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/refresh`, {
        method: "GET",
        credentials: "include",
      });
    }, 10 * 1000);
  }, []);

  return (
    <div>
      <HeroSection />
      <BrowseByCategory />
      <JobsOfDay />
      <NewsAndBlogs />
      <SubscribeSection />
    </div>
  );
}
