"use client";

import React, { useEffect, useState } from "react";
import BlogCard from "@/components/blog/BlogCard"; 
import SubscribeSection from "@/components/utlis/SubscribeSection";
import SubHeading from "@/components/utlis/SubHeading";

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
      <SubHeading Heading={"Blog"} bio="Get the latest news, updates and tips" />
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
