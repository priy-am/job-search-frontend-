"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
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
import SubHeading from "@/components/utlis/SubHeading";
import ImageUploadInput from "@/components/utlis/inputFeild/ImageUploadInput";
import TextInput from "@/components/utlis/inputFeild/TextInput";
import TextAreaInput from "@/components/utlis/inputFeild/TextAreaInput";
import useGetAllCategories from "@/hooks/useGetAllCategories";

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

  useGetAllCategories();
  const user = useSelector((state) => state.user.user);
  const { categories = [] } = useSelector((state) => state.category);

  const categoryId = watch("categoryId");
  const selectedCategory = categories.find((cat) => cat._id === categoryId);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const skillArray = data.skills.split(",").map((skill) => skill.trim());
      const Form = new FormData();
       
      Form.append("role", data.role);
      Form.append("company", data.company);
      Form.append("location", data.location);
      Form.append("salary", data.salary);
      Form.append("duration", data.duration);
      Form.append("experience", data.experience)
      Form.append("image", data.image[0]);
      Form.append("description", data.description)
      Form.append("categoryId", data.categoryId)
      Form.append("recruiterId", user._id)
      Form.append("skills", skillArray)


      const res = await fetch(
        `${process.env.NEXT_PUBLIC_JOBPOST_END_POINT}/createPost`,
        {
          method: "POST",
          
          credentials: "include",
          body: Form,
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
    <>
      <SubHeading Heading={"Create Your Job"} />
      <div className="max-w-3xl mx-auto p-6 my-8 bg-white shadow rounded-lg">
        <ToastContainer />
        <h2 className="text-2xl font-bold text-center mb-6 text-[#05264e]">
          Create a Job Post
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* role */}
            <div className="space-y-2 w-full md:w-1/2">
              <TextInput
                label="Role"
                name="role"
                minLength={3}
                maxLength={30}
                register={register}
                errors={errors}
                placeholder="Full time"
              />
            </div>
            {/* company */}
            <div className="space-y-2 w-full md:w-1/2">
              <TextInput
                label={"Company"}
                name={"company"}
                register={register}
                errors={errors}
                placeholder={"Microsoft"}
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            {/* location */}
            <div className="space-y-2 w-full md:w-1/2">
              <TextInput
                label={"Location"}
                name={"location"}
                register={register}
                errors={errors}
                placeholder={"Your Location"}
              />
            </div>

            {/* salary */}
            <div className="space-y-2 w-full md:w-1/2">
              <Label>Salary</Label>
              <Input
                type="number"
                placeholder="30000"
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
                <p className="text-red-500 text-sm">
                  {errors.duration.message}
                </p>
              )}
            </div>

            <div className="space-y-2 w-full md:w-1/2">
              <Label>Experience (in years)</Label>
              <Input
                type="number"
                placeholder="Experience"
                {...register("experience", {
                  required: "Experience is required",
                  min: {
                    value: 0,
                    message: "Enter valid Experience.",
                  },
                  max: {
                    value: 50,
                    message: "Experience can't exceed the 50 ",
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
            {/* skills */}
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
          </div>
          {/* image */}
          <div className="space-y-2 w-full md:w-1/2">
            <ImageUploadInput
              label="Upload Image"
              name="image"
              register={register}
              errors={errors}
            />
          </div>
          {/* description */}
          <div className="space-y-2 w-full ">
            <TextAreaInput
              register={register}
              name={"description"}
              label={"Description"}
              placeholder={"Write....."}
              errors={errors}
            />
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
    </>
  );
}
