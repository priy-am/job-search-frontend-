"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Home } from "lucide-react";
import { useRouter } from "next/navigation";

const MyJobPosts = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [candidates, setCandidates] = useState({});

  const user = useSelector((state) => state.user.user);
  const router = useRouter();

  // Fetch recruiter's jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        console.log(user?._id);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_JOBPOST_END_POINT}/getMYJob/${user?._id}`,
          {
            method: "GET",
            credentials: "include", 
          }
        );
        const data = await res.json();
        console.log("my jobs data ", data);
        console.log("my jobs", data.jobs);
        setJobs(data.jobs || []);
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      }
    };

    if (user?._id) fetchJobs();
  }, [user?._id]);

  // Fetch applicants for a job
  const fetchCandidates = async (jobId) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/application/job/${jobId}`
      );
      const data = await res.json();
      console.log("cadidates", data);
      setCandidates((prev) => ({ ...prev, [jobId]: data.applications || [] }));
      setSelectedJobId(jobId);
    } catch (error) {
      console.error("Failed to fetch applicants:", error);
    }
  };

  return (
    <>
      <div className="border-b pb-8">
        <div className="w-full   bg-[#f0f5fc] mt-8 py-3 sm:py-5 md:py-10 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            {/* Title & Subtext */}
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-[#05264e]">
                My Job Posts
              </h1>
            </div>

            {/* Breadcrumb */}
            <div className="bg-white shadow-sm px-4 py-2 rounded-md flex items-center gap-1 text-sm text-[#6c757d]">
              <Home size={16} className="text-[#6c757d]" />
              <Link href="/" className="hover:underline text-[#6c757d]">
                JobSearch
              </Link>
              <span className="mx-1">›</span>
              <span className="text-[#3c65f5] font-medium">MyJobPosts</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 ">
        {jobs.length === 0 ? (
          <p className="text-center text-gray-500">
            You haven’t posted any jobs yet.
          </p>
        ) : (
          <div className="space-y-6">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition"
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-[#3c65f5]">
                      {job.jobTitle}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {job.company} - {job.location}
                    </p>
                    <p className="text-sm mt-1">{job.description}</p>
                    <p className="text-sm mt-1">
                      <strong>Salary:</strong> ₹{job.salary} |{" "}
                      <strong>Experience:</strong> {job.experience} yrs |{" "}
                      <strong>Duration:</strong> {job.duration}
                    </p>
                    <p className="text-sm mt-1">
                      <strong>Skills:</strong> {job.skills.join(", ")}
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      selectedJobId === job._id
                        ? setSelectedJobId(null)
                        : fetchCandidates(job._id)
                    }
                    className="bg-[#3c65f5] hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm whitespace-nowrap"
                  >
                    {selectedJobId === job._id
                      ? "Hide Applicants"
                      : "View Applicants"}
                  </button>
                </div>

                {/* Show candidates if selected */}
                {selectedJobId === job._id && candidates[job._id] && (
                  <div className="mt-4 border-t pt-4">
                    <h3 className="font-medium text-lg mb-2 text-gray-800">
                      Applicants:
                    </h3>
                    {candidates[job._id].length === 0 ? (
                      <p className="text-sm text-gray-500">
                        No applicants yet.
                      </p>
                    ) : (
                      <ul className="space-y-3">
                        {candidates[job._id].map((applicant) => (
                          <li
                            key={applicant._id}
                            className="bg-gray-50 p-3 rounded-md border"
                          >
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="text-sm font-medium">
                                  {applicant.fullName} - {applicant.email}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {applicant.mobile}
                                </p>
                              </div>
                              <button
                                onClick={() =>
                                  router.push(`/applicants/${applicant._id}`)
                                }
                                className="text-[#3c65f5] text-sm underline hover:text-blue-600"
                              >
                                View Details
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default MyJobPosts;
