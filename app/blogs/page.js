"use client";
import { Home } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import BlogCard from "@/components/BlogCard"; // adjust path if needed
import SubscribeSection from "@/components/SubscribeSection";

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs/allBlogs`
        );
        const data = await res.json();
        setBlogs(data?.blogs || []);
      } catch (error) {
        console.error("Failed to fetch blogs", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <>
      <div className="w-full bg-[#f0f5fc] mt-8 py-3 sm:py-5 md:py-10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          {/* Title & Subtext */}
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-[#05264e]">
              Blog
            </h1>
            <p className="text-[#6c757d] text-base sm:text-lg mt-1">
              Get the latest news, updates and tips
            </p>
          </div>

          {/* Breadcrumb */}
          <div className="bg-white shadow-sm px-4 py-2 rounded-md flex items-center gap-1 text-sm text-[#6c757d]">
            <Home size={16} className="text-[#6c757d]" />
            <Link href="/" className="hover:underline text-[#6c757d]">
              JobSearch
            </Link>
            <span className="mx-1">›</span>
            <span className="text-[#3c65f5] font-medium">Blog</span>
          </div>
        </div>
      </div>
      <section className="py-12 px-4 max-w-7xl mx-auto">
        {blogs.length === 0 ? (
          <p className="text-center text-gray-500">No blogs available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <BlogCard key={blog._id} {...blog} />
            ))}
          </div>
        )}
      </section>

      <div>
        <SubscribeSection/>
      </div>
    </>
  );
};

export default BlogPage;
