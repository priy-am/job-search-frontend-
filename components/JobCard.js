"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const JobCard = ({
  description, skills, role, experience, image, salary, jobTitle, location, duration, company, _id
}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_AUTH_END_POINT}/me`, {
          method: "GET",
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        }
      } catch (error) {
        console.error("Error fetching user: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md flex flex-col space-y-4 bg-blue-50 cursor-pointer transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 hover:bg-white">
      {/* Logo + Company */}
      <div className="flex items-center space-x-3">
        <Image src={"/grp.jpg"} alt={company} width={50} height={55} className="rounded-md" />
        <div>
          <h4 className="font-semibold text-[#05264e]">{company}</h4>
          <p className="text-sm text-gray-500">{location}</p>
        </div>
      </div>

      {/* Job Info */}
      <div>
        <h5 className="font-semibold text-start mb-1 text-[#05264e]">{jobTitle}</h5>
        <div className="text-sm text-gray-500 flex gap-4 mt-1">
          <span>📅 {role}</span>
          <span>💼 Experience: {experience} year</span>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          {description}
        </p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {skills.slice(0, 3).map((tag, i) => (
          <span key={i} className="bg-gray-100 px-3 py-1 text-xs rounded-md">
            {tag}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <p className="text-[#3c65f5] font-semibold text-lg">
          {salary}<span className="text-sm text-gray-400">/{duration}</span>
        </p>
        
        {/* Conditionally render Apply button based on user type */}
        {!loading && (
          <>
            {/* Show Apply button only for jobseekers or non-logged-in users */}
            {(!user || user.userType === "jobseeker") && (
              <Link href={`/jobapply/${_id}`}>
                <button className="bg-[#e0e7ff] text-[#3c65f5] px-4 py-2 rounded-md text-sm font-medium hover:bg-[#3c65f5] hover:text-white transition">
                  Apply Now
                </button>
              </Link>
            )}
            
            {/* Show different button for recruiters */}
            {user && user.userType === "recruiter" && (
              <div className="text-sm text-gray-500 italic">
                Recruiter View
              </div>
            )}
          </>
        )}
        
        {/* Loading state */}
        {loading && (
          <div className="w-20 h-8 bg-gray-200 animate-pulse rounded-md"></div>
        )}
      </div>
    </div>
  );
};

export default JobCard;