"use client";
import React, { useEffect, useState } from "react";
import BrowseCard from "../BrowseCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useSelector } from "react-redux";
import useGetAllJobs from "@/hooks/useGetAllJobs";

const BrowseByCategory = () => {
  const [categories, setCategories] = useState([]);
  useGetAllJobs();
  const jobs = useSelector((state) => state.job.jobs);
    const jobsCount = jobs.length > 999 ? "999++" : `${jobs.length}`;
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_JOBPOST_END_POINT}/getJobPosts`
        );
        const data = await  res.json();
        console.log("Response from API:", data?.grouped);
        await setCategories(data?.grouped || []);
        console.log("Categories fetched:", categories);
      } catch (error) {
        console.error("Error in BrowseByCategory component:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="w-full overflow-hidden bg-white py-12 ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-center">
        <div className="space-y-4">
          <h3 className="text-[#05264e] text-3xl sm:text-4xl font-bold">
            Browse by category
          </h3>
          <p className="text-[#4f5e64] text-base sm:text-lg max-w-2xl mx-auto">
            Find the job that's perfect for you. about {jobsCount} new jobs everyday
          </p>
        </div>

        {/* Carousel Container with Overflow Control */}
        <div className="relative w-full max-w-7xl px-11 mx-auto overflow-hidden  ">
          <Carousel
            className="w-full h-full "
            opts={{
              align: "start",
              loop: true,
              skipSnaps: false,
              dragFree: true,
            }}
          >
            <CarouselContent className="-ml-2 md:-ml-4 mt-8  h-full ">
              {categories.map((category, index) => (
                <CarouselItem
                  key={index}
                  className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 min-w-0"
                >
                  <div className="h-full">
                    <BrowseCard
                      title={category?.category}
                      available={category?.count + " jobs available"}
                      icon={category?.image }
                      colorClass={category?.color}
                    />
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
    </div>
  );
};

export default BrowseByCategory;
