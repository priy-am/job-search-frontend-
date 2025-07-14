"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { CalendarDays, Clock } from "lucide-react";
import SubscribeSection from "@/components/SubscribeSection";

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

  const { imageUrl, description,tags,  title, writer, createdAt, content } = blog;

  // const tags = ["HelpCircle", "priyam" ]
  return (
    <div>
      {/* Blog Banner Section */}
      <section className="relative w-full h-auto">
        <div className="w-full h-[250px] sm:h-[300px] md:h-[400px] lg:h-[450px] relative">
          <Image
            src={"/blog-back-image.png"}
            alt={title}
            fill
            priority
            className="object-cover rounded-b-xl"
          />
        </div>

        <div className="max-w-6xl mx-auto px-4 -mt-20 relative z-10">
          <div className="bg-white rounded-xl  p-6 text-center">
            {/* Tags */}
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {tags?.split(",").map((tag, i) => (
                <span
                  key={i}
                  className="bg-blue-100 text-blue-600 text-xs font-medium px-3 py-1 rounded-full"
                >
                  {tag.trim()}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#05264e] leading-snug mb-2">
              {title}
            </h1>

            {/* Meta Info */}
            <div className="flex w-2/3 mx-auto flex-wrap justify-around items-center text-sm text-gray-500 gap-3 mt-3">
              <div className="flex items-center gap-1">
                <span>👤</span>
                <span>{writer}</span>
              </div>
              <div className="flex items-center gap-1">
                <CalendarDays size={14} />
                <span>{new Date(createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock size={14} />
                <span>2 mins read</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="text-2xl max-w-3xl mt-3 break-after-all text-start text-gray-600 mx-auto">
        {description}
      </section>

      {/* Blog Content */}
      <section className="max-w-5xl mx-auto px-4 py-12 prose prose-lg prose-blue">
        <div className="prose prose-sm sm:prose lg:prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
      </section>

      {/* Subscribe Section */}
      <SubscribeSection />
    </div>
  );
};

export default BlogDetailPage;
