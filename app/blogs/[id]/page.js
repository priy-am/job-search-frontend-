"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import SubscribeSection from "@/components/utlis/SubscribeSection";
import SingleBlog from "@/components/blog/SingleBlog";

const BlogDetailPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs/blogBy/${id}`);
        const data = await res.json();
        setBlog(data.blog);
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchBlog();
  }, [id]);

  if (loading) return <p className="text-center py-20 text-gray-500">Loading...</p>;
  if (!blog) return <p className="text-center py-20 text-red-500">Blog not found.</p>;

  // const { imageUrl, description,tags,  title, writer, createdAt, content } = blog;

  return (
    <div>
      <SingleBlog {...blog} />

      {/* Subscribe Section */}
      <SubscribeSection />
    </div>
  );
};

export default BlogDetailPage;
