"use client";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";


const SubscribeSection = () => {

  const {
    register,
    handleSubmit,
    formState: { errors,isSubmitting },
    reset,
    
  } = useForm();

  const onSubmit = async(data) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/subscribe`,{
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(data),
      })

      const d = await res.json();
      if(res.ok){
        toast(d.message || "Subscription Successful! Check you email")
      }else{
        toast(d.message || "Something went wrong")
      }

    } catch (error) {
      console.log("Subscribed Error:- ", error)
      toast("server error")
    } finally {
      reset();
    } 
  };

  return (
    <>
      <ToastContainer />
      <section className="bg-[#3566f6] flex flex-col py-16 gap-8 mb-14 justify-center items-center rounded-xl mx-auto px-4 w-full max-w-5xl">
        <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl text-center text-white leading-snug md:max-w-xl">
          New Things Will Always Update Regularly
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-white p-4 rounded-lg w-full max-w-md shadow-md"
        >
          <div className="flex-1 flex flex-col">
            <input
              type="email"
              placeholder="Enter your email here"
              aria-label="Email address"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address",
                },
              })}
              className={`px-4 py-3 text-sm rounded-md border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-[#3566f6] placeholder-gray-500`}
            />
            {errors.email && (
              <span className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={` ${isSubmitting? "bg-[#85a2fa] pointer-events-none cursor-not-allowed": "bg-[#3566f6]"} text-white px-6 py-3 text-sm font-medium rounded-md hover:bg-blue-700 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105`}
          >
            Subscribe
          </button>
        </form>
      </section>
    </>
  );
};

export default SubscribeSection;
