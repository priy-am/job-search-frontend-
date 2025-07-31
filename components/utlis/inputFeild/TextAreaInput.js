import React from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const TextAreaInput = (
{  label,
  name,
  register,
  errors,
  placeholder,
  minLength = 10,
  maxLength = 500,
  rows=4,
  requiredMessage = "This field is required"}
) => {
  return (
    <div>
      {label && <Label className="block font-semibold mb-1">{label}</Label>}
      <Textarea
        rows={rows}
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
            value.trim().length > 0 || "Description must not be empty",
        })}
      />
      {errors[name] && (
        <p className="text-red-500 text-sm">{errors[name].message}</p>
      )}
    </div>
  );
};

export default TextAreaInput;
