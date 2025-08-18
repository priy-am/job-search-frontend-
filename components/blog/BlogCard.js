import React from "react";
import Image from "next/image";
import Link from "next/link";

const BlogCard = ({ title, writer, description, _id, imageUrl, createdAt }) => {
  return (
    <div
      className="
        w-full sm:w-[300px] md:w-[340px] lg:w-[360px]
        h-[460px] md:h-[500px]
        border border-gray-200 rounded-lg shadow-md
        flex flex-col p-3 gap-2
        bg-white
        transition-all duration-300 hover:bg-[#f6f9ff] hover:-translate-y-1 hover:scale-[1.01]
      "
    >
      {/* Image */}
      <div className="relative w-full h-[160px] md:h-[180px]">
        <Image
          src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${imageUrl}`}
          alt={title || "Blog Image"}
          fill
          className="rounded-2xl object-cover"
          sizes="(max-width: 640px) 100vw, 360px"
          priority={false}
        />
      </div>

      {/* Title */}
      <Link
        href={`/blogs/${_id}`}
        className="text-[#05264e] hover:text-[#3c65f5] font-bold text-lg mt-1 line-clamp-2 min-w-0"
      >
        {title}
      </Link>

      {/* Description */}
      <p className="text-[#4f5e64] text-sm line-clamp-3 flex-grow min-w-0 max-h-1/4 ">
        {description}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 ">
        <div className="flex items-center gap-3 min-w-0">
          <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0">
            <Image src="/grp.jpg" alt="Author Avatar" fill className="object-cover" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[#05264e] font-semibold truncate">
              {writer || "Anonymous"}
            </span>
            <span className="text-xs text-[#6c757d]">
              {new Date(createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="text-xs text-[#6c757d] shrink-0">2 mins read</div>
      </div>
    </div>
  );
};

export default BlogCard;
