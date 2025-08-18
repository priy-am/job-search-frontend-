"use client"
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import BlogCard from "../blog/BlogCard";
import { useState, useEffect } from "react";

const NewsAndBlogs = () => {

    const [blogs, setBlogs] = useState([]);
  
    useEffect(() => {
      const fetchBlogs = async () => {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs/allBlogs`);
          const data = await res.json();
          setBlogs(data?.blogs || []);
        } catch (error) {
          console.error("Failed to fetch blogs", error);
        }
      };
  
      fetchBlogs();
    }, []);

  return (
    <div className="container mx-auto px-6 py-12 space-y-4 text-center">
      <h3 className="text-[#05264e] text-4xl font-bold">News and Blog</h3>
      <p className="text-[#4f5e64]">Get the latest news, updates and tips</p>


      <div className="relative w-full max-w-7xl px-9 mx-auto overflow-hidden  ">
          <Carousel 
            className="w-full h-full "
            opts={{
              align: "start",
              loop: true,
              skipSnaps: false,
              dragFree: true,
            }}
          >
            <CarouselContent className="-ml-2 md:-ml-4 mt-8 h-full ">
              {blogs.map((blog, index) => (
                <CarouselItem 
                  key={index} 
                  className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3 min-w-0"
                >
                  <div className="h-full">
                    <BlogCard {...blog} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            {/* Navigation Buttons */}
            <CarouselPrevious className="absolute -left-9 bottom-1/2 -translate-y-1 z-10 bg-white shadow-md border border-gray-200 hover:bg-gray-100 transition  disabled:opacity-50" />
            <CarouselNext className="absolute -right-9 bottom-1/2 -translate-y-1 z-10 bg-white shadow-md border border-gray-200 hover:bg-gray-100 transition disabled:opacity-50" />
          </Carousel>
        </div>
    </div>
  );
};

export default NewsAndBlogs;
