"use client";
import Image from "next/image";

const SubscribeSection = () => {
  return (
    <section className="bg-[#3566f6] flex flex-col py-16 gap-9 mb-14 justify-center items-center rounded-lg mx-auto w-3/4">
      <h2 className="font-bold text-3xl break-words md:w-1/3 text-center text-white ">
        New Things Will Always Update Regularly
      </h2>
      <div className="flex flex-col md:flex-row w-1/2 gap-2 bg-white p-3 mt-4 rounded-lg">
        <input
          type="email"
          placeholder="Enter your email here"
          className="w-full py-3 text-sm outline-none text-black placeholder-[#6c757d]"
        />
         <button
            type="submit"
            className="bg-[#3566f6] text-white px-6 py-3 text-sm font-medium rounded-lg hover:bg-blue-700  cursor-pointer transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
          >
            Subscribe
          </button>
      </div>
    </section>
  );
};

export default SubscribeSection;

