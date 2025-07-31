"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import BackButton from "@/components/utlis/BackButton";

const ApplicantDetailsPage = () => {
  const { id } = useParams();
  const [applicant, setApplicant] = useState(null);

  useEffect(() => {
    const fetchApplicant = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/application/applicant/${id}`
        );
        const data = await res.json();
        console.log(" applicants ", data);
        setApplicant(data.application);
      } catch (err) {
        console.error("Failed to fetch applicant details:", err);
      }
    };

    fetchApplicant();
  }, [id]);

  const resumeURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/${applicant?.resume}`.replace(/\\/g, '/');

  if (!applicant) {
    return <div className="text-center py-10 text-gray-500">Loading...</div>;
  }

  return (
     <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <BackButton/>
      <div className="max-w-5xl mx-auto bg-white border rounded-xl overflow-hidden">
        <div className="bg-blue-100 px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-800">Application</h1>
          <span className="text-gray-500 text-sm">Applied {Math.floor((Date.now() - new Date(applicant.createdAt)) / (1000 * 60 * 60 * 24))} days ago</span>
        </div>

        <div className="p-6 space-y-8 text-gray-800 leading-relaxed text-[15px]">
          {/* Cover Letter Section */}
          <div>
            <h2 className="text-lg font-semibold mb-1">Cover letter</h2>
            <p className="font-medium">Why should you be hired for this role?</p>
            <p className="mt-2">
              {applicant.bio}
            </p>
          </div>


          {/* Contact & Resume */}
          <div className="border-t pt-6">
            <h2 className="text-lg font-semibold mb-3">Contact Information</h2>
            <p><strong>Full Name:</strong> {applicant.fullName}</p>
            <p><strong>Email:</strong> {applicant.email}</p>
            <p><strong>Phone:</strong> {applicant.mobile}</p>
            <p><strong>Experience:</strong> {applicant.experience} years</p>
            <p className="mt-2">
              <strong>Resume:</strong>{" "}
              <a
                href={resumeURL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline hover:text-blue-800"
              >
                View Resume
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicantDetailsPage;
