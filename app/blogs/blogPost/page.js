"use client";

import { useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
import { useState } from "react";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SubHeading from "@/components/utlis/SubHeading";
import ImageUploadInput from "@/components/utlis/inputFeild/ImageUploadInput";
import TextInput from "@/components/utlis/inputFeild/TextInput";

const BlogEditor = dynamic(() => import("@/components/blog/BlogEditor"), {
  ssr: false,
});

const CreateBlog = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [content, setContent] = useState("");
  const user = useSelector((state) => state.user.user);

  const onSubmit = async (formData) => {
    const title = formData.title.trim();
    const description = formData.description.trim();
    const tags = formData.tags?.trim() || "";

    const strippedContent = content.replace(/<(.|\n)*?>/g, "").trim();
    if (!strippedContent) {
      toast.error("Blog content cannot be empty.");
      return;
    }

    const finalForm = new FormData();
    finalForm.append("title", title);
    finalForm.append("description", description);
    finalForm.append("content", content);
    finalForm.append("writer", user?.name || "Anonymous");
    finalForm.append("tags", tags);
    finalForm.append("image", formData.image[0]);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs/createBlog`,
        {
          method: "POST",
          body: finalForm,
        }
      );

      if (res.ok) {
        toast.success("✅ Blog posted successfully!");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (err) {
      toast.error("❌ Failed to post blog.");
      console.error(err);
    }
  };

  return (
    <>
      <ToastContainer />
      <SubHeading Heading={"Write Your Blog"} />
      <div className="p-4 sm:p-6 max-w-4xl mx-auto space-y-6 my-12 bg-white shadow-md rounded-md mt-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-blue-700">
          Write Your Blog ✍️
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <TextInput
            label="Blog Title"
            name="title"
            register={register}
            errors={errors}
            minLength={5}
            maxLength={100}
            placeholder="Enter blog title"
          />

          <div>
            <label className="block font-semibold mb-1">
              Short Description
            </label>
            <textarea
              rows={3}
              {...register("description", {
                required: "Description is required",
                minLength: { value: 10, message: "Min 10 characters" },
                maxLength: { value: 300, message: "Max 300 characters" },
                validate: (v) => v.trim().length > 0 || "No empty spaces",
              })}
              className="w-full border border-gray-300 p-2 rounded focus:outline-blue-400"
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          <div>
            <label className="block font-semibold mb-1">
              Blog Content <span className="text-red-500">*</span>
            </label>
            <div className="border border-gray-300 rounded p-2 bg-white">
              <BlogEditor content={content} setContent={setContent} />
            </div>
          </div>

          <ImageUploadInput
            label="Upload Image"
            name="image"
            register={register}
            errors={errors}
          />

          <div>
            <label className="block font-semibold mb-1">#Tags (Optional)</label>
            <input
              type="text"
              placeholder="e.g. #tech, #travel"
              {...register("tags")}
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Written by</label>
            <input
              type="text"
              value={user?.name || "Anonymous"}
              readOnly
              className="w-full bg-gray-100 border border-gray-300 p-2 rounded"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 w-full sm:w-auto"
          >
            Publish Blog 🚀
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateBlog;
