"use client";

import { useForm } from "react-hook-form";
import { useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
// import { setValue } from "react-hook-form";

export default function ApplyJobPage() {
  const { id } = useParams(); // job ID from the route

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [submitted, setSubmitted] = useState(false);

  const onSubmit = async (data) => {
    console.log("Form Submitted: ", data);
    setSubmitted(true);
    reset();
  };

  return (
    <>
      <ToastContainer />
      <div className="max-w-2xl mx-auto mt-10 px-4">
        <h2 className="text-3xl font-bold text-[#05264e] mb-6 text-center">
          Apply for Job
        </h2>

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
            <Select onValueChange={(value) => setValue("experience", value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select experience" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 21 }, (_, i) => (
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
                    return "Minimum 500 characters required";
                  }
                  return true;
                },
              })}
            />
            {errors.bio && (
              <p className="text-red-500 text-sm mt-1">{errors.bio.message}</p>
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

          {submitted && (
            <>
              {/* {toast("✅ Your application has been submitted!")} */}
              <p className="text-green-600 text-center mt-3">
                ✅ Your application has been submitted!
              </p>
            </>
          )}
        </form>
      </div>
    </>
  );
}
