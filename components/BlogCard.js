import React from "react";
import Image from "next/image";
import Link from "next/link";

const BlogCard = () => {
  return (
    <div className="  border border-gray-200 rounded-lg shadow-md flex flex-col items-center justify-between gap-2 p-3 hover:bg-[#f6f9ff] transition-all duration-300 transform hover:-translate-y-1 hover:scale-105">
      <Image
        src={"/grp.jpg"}
        alt="Blog Image"
        width={600}
        height={600}
        className="rounded-2xl w-full h-auto"
      />
      <Link
        href={"#"}
        className={
          "text-[#05264e] mt-3 hover:text-[#3c65f5] font-bold text-lg text-start "
        }
      >
        How to write different Application Letter with Examples
      </Link>

      <p className="hover:text-[#3c65f5] text-[#4f5e64] pb-4 text-start">
        {" "}
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere
        perferendis laborum consequuntur delectus! Molestiae odit error velit
        voluptatum et debitis harum officiis. Ea aliquam consequatur nisi cum
        accusantium architecto cupiditate?{" "}
      </p>
      <div className="flex items-center justify-between w-full px-2 pb-5 text-sm text-[#6c757d]">
        {/* Left Side - Avatar and Text */}
        <div className="flex items-center justify-around  w-full  space-x-3">
          <div className="w-8 h-8 relative rounded-full overflow-hidden">
            <Image
              src="/grp.jpg"
              alt="Author Avatar"
              fill
              className="object-cover cursor-pointer"
            />
          </div>
          <div className="flex flex-col justify-center items-center">
            <span className="text-[#05264e] font-semibold">jobbox</span>
            <span className="text-xs text-[#6c757d]">June 4, 2022</span>
          </div>
        </div>

        {/* Right Side - Reading Time */}
        <div className="text-xs text-[#6c757d]">2 mins to read</div>
      </div>
    </div>
  );
};

export default BlogCard;
