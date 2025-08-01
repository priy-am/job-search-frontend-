"use client";

import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function ApplyJobPage() {
  const { id } = useParams(); // job ID from the route
  const router = useRouter()

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const [submitted, setSubmitted] = useState(false);
  const [jobDetails, setJobDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch job details when component mounts
  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_JOBPOST_END_POINT}/getJobById/${id}`,
          {
            credentials: "include",
          }
        );

        if (response.ok) {
          const jobData = await response.json();
          setJobDetails(jobData);
        } else {
          toast.error("Failed to fetch job details");
        }
      } catch (error) {
        console.error("Error fetching job details:", error);
        toast.error("Error loading job details");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchJobDetails();
    }
  }, [id]);

  const onSubmit = async (data) => {
    console.log("Form Submitted: ", data);
    const formdata = new FormData();
    formdata.append("fullName", data.fullName);
    formdata.append("mobile", data.mobile);
    formdata.append("email", data.email);
    formdata.append("experience", data.experience);
    formdata.append("bio", data.bio);
    formdata.append("jobId", id);
    formdata.append("resume", data.resume[0]);

    console.log(data.resume[0]);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/application/submit`, {
        method: "POST",
        // Remove Content-Type header - let browser set it automatically for FormData
        credentials: "include",
        body: formdata, // Send FormData instead of JSON
      });

      if (res.ok) {
        setSubmitted(true);
        toast.success("✅ Your application has been submitted!");
        router.push("/")
      } else {
        toast.error("❌ Failed to submit application. Please try again.");
      }
    } catch (error) {
      console.error("Server error:", error);
      toast.error("❌ Server error. Please try again.");
    }
    reset();
  };

  return (
    <>
      <ToastContainer />
      <div className="max-w-2xl mx-auto my-10  px-4">
        {loading ? (
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto mb-6"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
            </div>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-[#05264e] mb-2">
                Apply for: {jobDetails?.jobTitle || "Job Position"}
              </h2>
              <div className="flex gap-3 justify-center items-center text-center ">
                {jobDetails?.company && (
                  <p className="text-lg text-gray-600 ">
                    at {jobDetails.company}
                  </p>
                )}
                <div className="flex items-center justify-center gap-3">
                  {jobDetails?.location && (
                    <p className="text-sm text-gray-500">
                      📍 {jobDetails.location}
                    </p>
                  )}
                  {jobDetails?.salary && (
                    <p className="text-sm text-gray-500">
                      💰 ₹ {jobDetails.salary}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-5 bg-white shadow-sm border border-gray-100 p-6 rounded-lg"
            >
              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-[#05264e]">
                  Full Name
                </Label>
                <Input
                  id="fullName"
                  placeholder="John Doe"
                  {...register("fullName", {
                    required: "Full name is required",
                    validate: (value) => {
                      const trimmed = value.trim();
                      if (trimmed.length < 3) {
                        return "Full name must be at least 3 characters";
                      }
                      if (trimmed.length > 50) {
                        return "Full name must be less than 50 characters";
                      }
                      return true;
                    },
                  })}
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              {/* Mobile Number */}
              <div className="space-y-2">
                <Label htmlFor="mobile" className="text-[#05264e]">
                  Mobile Number
                </Label>
                <Input
                  id="mobile"
                  type="tel"
                  placeholder="e.g. 9876543210"
                  {...register("mobile", {
                    required: "Mobile number is required",
                    pattern: {
                      value: /^[6-9]\d{9}$/,
                      message: "Enter a valid 10-digit mobile number",
                    },
                    validate: (value) => {
                      if (value.length !== 10) {
                        return "Mobile number must be exactly 10 digits";
                      }
                      return true;
                    },
                  })}
                />
                {errors.mobile && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.mobile.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#05264e]">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Enter a valid email address",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Experience */}
              <div className="space-y-2">
                <Label className="text-[#05264e]">Experience (in years)</Label>
                <Select
                  onValueChange={(value) => setValue("experience", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select experience" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 51 }, (_, i) => (
                      <SelectItem key={i} value={String(i)}>
                        {i} {i === 1 ? "year" : "years"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.experience && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.experience.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio" className="text-[#05264e]">
                  why should we hire you?
                </Label>
                <Textarea
                  id="bio"
                  placeholder="Why should we hire you?"
                  {...register("bio", {
                    required: "Experience is required",
                    validate: (value) => {
                      const trimmed = value.trim();
                      if (trimmed.length < 10) {
                        return "Minimum 10 characters required";
                      }
                      if (trimmed.length > 500) {
                        return "Maximum 500 characters allowed";
                      }
                      return true;
                    },
                  })}
                />
                {errors.bio && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.bio.message}
                  </p>
                )}
              </div>

              {/* Resume Upload */}
              <div className="space-y-2">
                <Label htmlFor="resume" className="text-[#05264e]">
                  Upload Resume
                </Label>
                <Input
                  id="resume"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  {...register("resume", {
                    required: "Resume is required",
                    validate: {
                      acceptedFormats: (fileList) => {
                        const file = fileList?.[0];
                        console.log(fileList);
                        console.log(file);
                        if (!file) return "File is required";

                        const allowedTypes = [
                          "application/pdf", // for .pdf
                          "application/msword", // for .doc
                          "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // for .docx
                        ];

                        if (!allowedTypes.includes(file.type)) {
                          return "Only PDF or DOC/DOCX allowed";
                        }

                        const MAX_SIZE = 2147483648; // 2GB
                        if (file.size > MAX_SIZE) {
                          return "File size must be less than 2GB";
                        }

                        return true;
                      },
                    },
                  })}
                />
                {errors.resume && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.resume.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="w-full bg-[#3c65f5] text-white hover:bg-[#05264e]"
              >
                Submit Application
              </Button>
            </form>
          </>
        )}
      </div>
    </>
  );
}
