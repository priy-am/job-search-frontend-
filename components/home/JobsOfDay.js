"use client";

import React, { useState } from "react";
import CategoryFilter from "../CategoryFilter";
import JobCard from "../JobCard";
import { useSelector } from "react-redux";
import useGetAllJobs from "@/hooks/useGetAllJobs";

const JobsOfDay = () => {

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showAll, setShowAll] = useState(false);
useGetAllJobs();
  const jobs = useSelector((state) => state.job.jobs);
  // Filter jobs if a category is selected
  const filteredJobs = selectedCategory
    ? jobs.filter((job) => job.jobTitle === selectedCategory)
    : jobs;

  const visibleJobs = showAll ? filteredJobs : filteredJobs.slice(0, 8);

  return (
    <section className="container mx-auto px-6 py-12 space-y-4 text-center">
      <div className="space-y-4">
        <h3 className="text-[#05264e] text-3xl sm:text-4xl font-bold">
          Jobs of the day
        </h3>
        <p className="text-[#4f5e64] text-base sm:text-lg max-w-2xl mx-auto">
          Search and connect with the right candidates faster
        </p>
      </div>

      <div className="px-4 py-10 max-w-7xl mx-auto">
        {/* Filter Tabs */}
        <CategoryFilter
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        {/* Job Cards Grid */}
        {/* // After job cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
          {visibleJobs.length > 0 ? (
            visibleJobs.map((job, i) => <JobCard key={i} {...job} />)
          ) : (
            <p className="text-gray-500 col-span-full">
              No job posts available.
            </p>
          )}
        </div>
        {filteredJobs.length > 8 && (
          <div className="mt-6">
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-[#3c65f5] hover:underline font-medium"
            >
              {showAll ? "Show Less" : "Browse All Jobs"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default JobsOfDay;
