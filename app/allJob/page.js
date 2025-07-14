"use client";

import React, { useEffect, useState } from "react";
import SearchBar from "@/components/SearchBar";
import JobCard from "@/components/JobCard";
import { useSearchParams } from "next/navigation";
import SubscribeSection from "@/components/SubscribeSection";

const AllJobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [showAll, setShowAll] = useState(false);

  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchJobs = async () => {
      const query = searchParams.toString(); // build ?industry=...&location=...&keyword=...
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_JOBPOST_END_POINT}/searchJobs?${query}`
        );
        const data = await res.json();
        setJobs(data?.jobs || []);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, [searchParams]);

  const visibleJobs = showAll ? jobs : jobs.slice(0, 12);

  return (
    <>
      <section className="px-4 pt-6 w-full">
        <div className="max-w-7xl mb-3 bg-[#f5f8fc] rounded-4xl py-10 sm:py-14 md:py-20 mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
            <span className="text-[#3c65f5] font-extrabold">{jobs.length} Jobs</span> Available Now
          </h2>

          <p className="text-gray-500 mt-3 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
            Browse available jobs by industry, location, or keyword.
          </p>

          <div className="mt-8 sm:mt-10">
            <SearchBar />
          </div>
        </div>

        {/* Job List */}
        <div className="border-t mt-10">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {visibleJobs.length > 0 ? (
              visibleJobs.map((job, i) => <JobCard key={i} {...job} />)
            ) : (
              <p className="text-gray-500 col-span-full text-center">No jobs found.</p>
            )}
          </div>

          {jobs.length > 12 && (
            <div className="mt-6 text-center">
              <button
                onClick={() => setShowAll(!showAll)}
                className="text-[#3c65f5] hover:underline font-medium"
              >
                {showAll ? "Show Less" : "Browse All Jobs"}
              </button>
            </div>
          )}
        </div>
        </div>
      </section>
      <section className="border-t pt-10">
        <SubscribeSection/>
      </section>
    </>
  );
};

export default AllJobsPage;
