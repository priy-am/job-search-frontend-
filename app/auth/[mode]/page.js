"use client";

import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { useState } from "react";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { ToastContainer, toast } from 'react-toastify';

export default function AuthPage() {
  const params = useParams();
  const mode = params?.mode || "login"; // fallback if undefined
  const router = useRouter();

  const { register, handleSubmit, setValue, formState } = useForm();
  const { errors } = formState || {}; // this prevents undefined error
  const [show, setShow] = useState(false)


  const isRegister = mode === "register";

  const onSubmit = async (data) => {
    try {
      const endpoint = isRegister ? "register" : "login";
      const res = await fetch(`${process.env.NEXT_PUBLIC_AUTH_END_POINT}/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      })

      const result = await  res.json();
      if(!res.ok){
        return toast.error(result.message || `Failed to ${isRegister ? "register" : "login"}`);
      }
      toast.success(result.message)
      if(isRegister === "login"){
        localStorage.setItem("token", result.token);
      }
      if (isRegister) {
      router.push("/auth/login"); // redirect to login after register
    } else {
      router.push("/"); // redirect to homepage after login
    }

    } catch (error) {
      console.error("Error during submission:", error);
      toast.error(`Failed to ${isRegister ? "register" : "login"}: ${error.message}`);
    }
  };

  const toggleMode = () => {
    router.push(`/auth/${isRegister ? "login" : "register"}`);
  };

  return (
    <>
    <ToastContainer />
    <div className="min-h-screen flex items-center justify-center bg-[#f4f7ff] p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold text-[#05264e]">
            {isRegister ? "Create an Account" : "Login to Your Account"}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* FULL NAME (Register only) */}
            {isRegister && (
              <div className="flex  flex-col md:flex-row gap-8 ">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input
                    {...register("name", {
                      required: "Full name is required",
                      validate: (value) =>{
                        const trimmed = value.trim();
                        if( trimmed.length < 3){
                          return"Full name must be at least 3 characters";
                        }
                        return true;
                      }
                    })}
                    placeholder="Your full name"
                  />
                  {errors?.name && (
                    <p className="text-sm text-red-500">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* USER TYPE */}
                <div className="space-y-2 w-1/2">
                  <Label>User Type</Label>
                  <Select
                    onValueChange={(val) => setValue("userType", val)}
                    defaultValue=""
                  >
                    <SelectTrigger className={"w-full"}>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="jobseeker">Job Seeker</SelectItem>
                      <SelectItem value="recruiter">Recruiter</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors?.userType && (
                    <p className="text-sm text-red-500">
                      {errors.userType.message}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* EMAIL */}
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    message: "Invalid email format",
                  },
                })}
                type="email"
                placeholder="example@mail.com"
              />
              {errors?.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* PASSWORD */}
            <div className="space-y-2">
              <Label>Password</Label>

              <div className="relative">
              <Input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                  validate: (value) => {
                    const trimmed = value.trim();
                    if(trimmed.length< 6) {
                      return "Password must be at least 6 characters";
                    }
                    if (!/[A-Z]/.test(trimmed)) {
                      return "Password must contain at least one uppercase letter";
                    }
                    if (!/[a-z]/.test(trimmed)) {
                      return "Password must contain at least one lowercase letter";
                    }
                    if (!/[0-9]/.test(trimmed)) {
                      return "Password must contain at least one number";
                    }
                    if (!/[!@#$%^&*(),.?":{}|<>]/.test(trimmed)) {
                      return "Password must contain at least one special character";
                    }
                    return true;
                  }
                })}
                type={!show ? "password" : "text"}
                
                placeholder={!show ? "********" : "password"}
              />
              <span className='absolute right-5 top-1' onClick={() => { setShow(!show) }}> {!show ? <IoEye size={"25px"} /> : <IoEyeOff size={"25px"} />}</span>
              </div>

              {errors?.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* SUBMIT BUTTON */}
            <Button
              className="w-full bg-[#3c65f5] hover:bg-[#274fcc] text-white"
              type="submit"
            >
              {isRegister ? "Register" : "Login"}
            </Button>

            {/* TOGGLE LINK */}
            <p className="text-center text-sm text-gray-600">
              {isRegister
                ? "Already have an account?"
                : "Don't have an account?"}{" "}
              <span
                className="text-[#3c65f5] hover:underline cursor-pointer"
                onClick={toggleMode}
              >
                {isRegister ? "Login" : "Register"}
              </span>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
    </>
  );
}
