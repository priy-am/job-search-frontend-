// components/TextInput.jsx
"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

const TextInput = ({
  label,
  name,
  register,
  errors,
  placeholder,
  minLength = 3,
  maxLength = 50,
  requiredMessage = "This field is required",
}) => {
  return (
    <div>
      {label && <Label className="block font-semibold mb-1">{label}</Label>}
      <Input
        type="text"
        placeholder={placeholder}
        {...register(name, {
          required: requiredMessage,
          minLength: {
            value: minLength,
            message: `Minimum ${minLength} characters`,
          },
          maxLength: {
            value: maxLength,
            message: `Maximum ${maxLength} characters`,
          },
          validate: (value) =>
            value.trim().length > 0 || "Input must not be empty",
        })}
        // className="w-full border border-gray-300 p-2 rounded focus:outline-blue-400"
      />
      {errors[name] && (
        <p className="text-red-500 text-sm">{errors[name].message}</p>
      )}
    </div>
  );
};

export default TextInput;
