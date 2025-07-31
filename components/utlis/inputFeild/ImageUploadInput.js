// components/ImageUploadInput.jsx
"use client";
import React, { useState } from "react";
import Image from "next/image";

const ImageUploadInput = ({ label, name, register, errors }) => {
  const [imagePreview, setImagePreview] = useState(null);

  const handleImagePreview = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setImagePreview(imageURL);
    }
  };

  return (
    <div>
      {label && <label className="block font-semibold mb-1">{label}</label>}
      <input
        type="file"
        accept="image/*"
        {...register(name, {
          required: "Image is required",
          validate: {
            acceptedFormats: (fileList) => {
              const file = fileList?.[0];
              if (!file) return "Image is required";
              const MAX_SIZE = 16000000; // 16MB
              if (file.size > MAX_SIZE) {
                return "Image size must be less than 16 MB";
              }
              return true;
            },
          },
        })}
        onChange={handleImagePreview}
        className="block w-full"
      />

      {imagePreview && (
        <Image
          src={imagePreview}
          alt="Preview"
          width={100}
          height={50}
          className="rounded mt-3"
        />
      )}

      {errors[name] && (
        <p className="text-red-500 text-sm">{errors[name].message}</p>
      )}
    </div>
  );
};

export default ImageUploadInput;
