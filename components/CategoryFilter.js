"use client";

import { useEffect, useState } from "react";

const CategoryFilter = ({ selectedCategory, setSelectedCategory }) => {
  const [categories, setCategories] = useState([]);

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

  return (
    <div className="relative w-full max-w-7xl mx-auto">
  <div className="overflow-x-auto scrollbar-hide">
    <div className="flex gap-2 md:gap-4 mt-4 pb-2 min-w-max">
      {/* All Button */}
      <button
        onClick={() => setSelectedCategory(null)}
        className={`whitespace-nowrap border rounded-lg px-4 py-2 text-sm font-medium flex-shrink-0 ${
          selectedCategory === null
            ? "text-white bg-[#3c65f5] border-[#3c65f5]"
            : "text-black border-[#cbd5e1] hover:text-[#3c65f5] hover:border-[#3c65f5]"
        } transition-all`}
      >
        All
      </button>

      {/* Dynamic Category Buttons */}
      {categories.map((cat, i) => (
        <button
          key={i}
          onClick={() => setSelectedCategory(cat.category)}
          className={`whitespace-nowrap border rounded-lg px-4 py-2 text-sm font-medium flex-shrink-0 ${
            selectedCategory === cat.category
              ? "text-white bg-[#3c65f5] border-[#3c65f5]"
              : "text-black border-[#cbd5e1] hover:text-[#3c65f5] hover:border-[#3c65f5]"
          } transition-all`}
        >
          {cat.category}
        </button>
      ))}
    </div>
  </div>
</div>


  );
};


export default CategoryFilter;
