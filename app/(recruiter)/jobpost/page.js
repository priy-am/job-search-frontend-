"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";

export default function JobPostForm() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [categories, setCategories] = useState([]);
    const user = useSelector((state) => state.user.user);

  const categoryId = watch("categoryId");
  const selectedCategory = categories.find((cat) => cat._id === categoryId);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_CATEGORIES_END_POINT}/getCategory`
        );
        const data = await res.json();
        setCategories(data || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    getCategories();
  }, []);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const skillArray = data.skills.split(",").map((skill) => skill.trim());

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_JOBPOST_END_POINT}/createPost`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ ...data, skills: skillArray, recruiterId: user._id }),
        }
      );

      const result = await res.json();
      if (!res.ok) {
        toast.error(result.message || "Failed to create job post");
        return;
      }

      toast.success("Job posted successfully!");
      router.push("/");
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 mt-8 bg-white shadow rounded-lg">
      <ToastContainer />
      <h2 className="text-2xl font-bold text-center mb-6 text-[#05264e]">
        Create a Job Post
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="space-y-2 w-full md:w-1/2">
            <Label>Role</Label>
            <Input
              type="text"
              {...register("role", {
                required: "Role is required",
                validate: (value) => {
                  const trimmed = value.trim();
                  if (trimmed.length < 3) {
                    return "Role must be at least 3 characters";
                  }
                },
              })}
            />
            {errors.role && (
              <p className="text-red-500 text-sm">{errors.role.message}</p>
            )}
          </div>

          <div className="space-y-2 w-full md:w-1/2">
            <Label>Company</Label>
            <Input
              type="text"
              {...register("company", {
                required: "Company is required",
                validate: (value) => {
                  const trimmed = value.trim();
                  if (trimmed.length < 3) {
                    return "Full name must be at least 3 characters";
                  }
                },
              })}
            />
            {errors.company && (
              <p className="text-red-500 text-sm">{errors.company.message}</p>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="space-y-2 w-full md:w-1/2">
            <Label>Location</Label>
            <Input
              type="text"
              {...register("location", {
                required: "Location is required",
                validate: (value) => {
                  const trimmed = value.trim();
                  if (trimmed.length < 3) {
                    return "Full name must be at least 3 characters";
                  }
                  return true;
                },
              })}
            />
            {errors.location && (
              <p className="text-red-500 text-sm">{errors.location.message}</p>
            )}
          </div>

          <div className="space-y-2 w-full md:w-1/2">
            <Label>Salary</Label>
            <Input
              type="number"
              {...register("salary", {
                required: "Salary is required",
                min: 0,
                maxLength: 10,
              })}
            />
            {errors.salary && (
              <p className="text-red-500 text-sm">{errors.salary.message}</p>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="space-y-2 w-full md:w-1/2">
            <Label>Duration</Label>
            <Select
              onValueChange={(value) => setValue("duration", value)} // optional: for useForm context
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Day">Day</SelectItem>
                <SelectItem value="Week">Week</SelectItem>
                <SelectItem value="Month">Month</SelectItem>
                <SelectItem value="Annually">Annually</SelectItem>
              </SelectContent>
            </Select>
            {errors.duration && (
              <p className="text-red-500 text-sm">{errors.duration.message}</p>
            )}

          </div>

          <div className="space-y-2 w-full md:w-1/2">
            <Label>Experience (in years)</Label>
            <Input
              type="number"
              {...register("experience", {
                required: "Experience is required",

                max: 50,
                validate: (value) => {
                  if (value < 0) {
                    return "Experience cannot be negative";
                  }
                  if (value > 50) {
                    return "Experience cannot exceed 50 years";
                  }
                  return true;
                },
              })}
            />
            {errors.experience && (
              <p className="text-red-500 text-sm">
                {errors.experience.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="space-y-2 w-full md:w-1/2">
            <Label>Skills (comma separated)</Label>
            <Input
              type="text"
              {...register("skills", {
                required: "Skills are required",
                validate: (value) => {
                  const trimmed = value.trim();
                  if (trimmed.length < 3) {
                    return "Skills must be at least 3 characters";
                  }
                  const skillsArray = trimmed.split(",");
                  if (skillsArray.length < 1) {
                    return "Please enter at least one skill";
                  }
                  return true;
                },
              })}
              placeholder="e.g. React, Tailwind"
            />
            {errors.skills && (
              <p className="text-red-500 text-sm">{errors.skills.message}</p>
            )}
          </div>

          <div className="space-y-2 w-full md:w-1/2">
            <Label>Image URL</Label>
            <Input
              type="url"
              {...register("image", { required: "Image URL is required" })}
              placeholder="https://example.com/logo.png"
            />
            {errors.image && (
              <p className="text-red-500 text-sm">{errors.image.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-2 w-full ">
          <Label>Description</Label>
          <Textarea
            rows={4}
            {...register("description", {
              required: "Description is required",
              validate: (value) => {
                const trimmed = value.trim();
                if (trimmed.length < 10) {
                  return "Description must be at least 10 characters";
                }
                if (trimmed.length > 500) {
                  return "Description must not exceed 500 characters";
                }
                return true;
              },
            })}
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="space-y-2 w-full md:w-1/2">
            <Label>Category</Label>
            <Select
              onValueChange={(val) => setValue("categoryId", val)}
              defaultValue=""
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat._id} value={cat._id}>
                    {cat.image} {cat.category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.categoryId && (
              <p className="text-sm text-red-500">
                {errors.categoryId.message}
              </p>
            )}
          </div>

          {selectedCategory && (
            <div className="space-y-2 w-full">
              <Label>Job Title (auto-filled)</Label>
              <Input value={selectedCategory.category} readOnly />
            </div>
          )}
        </div>

        <Button
          type="submit"
          className="w-full bg-[#3c65f5] hover:bg-[#05264e] text-white"
          disabled={loading}
        >
          {loading ? "Posting..." : "Post Job"}
        </Button>
      </form>
    </div>
  );
}
