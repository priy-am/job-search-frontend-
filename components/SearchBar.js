"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Briefcase, MapPin, Search, Grid, ChevronDown } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import useGetAllCategories from "@/hooks/useGetAllCategories";
import {
  setIndustry,
  setLocation,
  setKeyword,
} from "@/redux/searchFilterSlice";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const router = useRouter();
  const [industryOpen, setIndustryOpen] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);

  const dispatch = useDispatch();
  const { categories = [] } = useSelector((state) => state.category);
  const { industry, location, keyword } = useSelector(
    (state) => state.searchFilter
  );

  useGetAllCategories();

  const handleIndustrySelect = (value) => {
    dispatch(setIndustry(value));
    setIndustryOpen(false);
  };

  const handleLocationSelect = (value) => {
    dispatch(setLocation(value));
    setLocationOpen(false);
  };

  const handleSearchInput = (e) => {
    dispatch(setKeyword(e.target.value));
  };

  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-start bg-white rounded-xl px-4 md:px-6  py-5 shadow-md gap-4 max-w-[44rem] mx-auto w-full">
      {/* Industry Dropdown */}
      <Popover open={industryOpen} onOpenChange={setIndustryOpen}>
        <PopoverTrigger
          onMouseEnter={() => setIndustryOpen(true)}
          onMouseLeave={() => setIndustryOpen(false)}
          className="flex items-center justify-between text-gray-500 w-full md:w-auto px-3 py-2 border border-gray-200 rounded-md cursor-pointer"
        >
          <Briefcase size={18} className="mr-2" />
          <span className="flex-1 text-left">{industry || "Industry"}</span>
          <ChevronDown size={16} className="ml-2 text-gray-400" />
        </PopoverTrigger>
        <PopoverContent
          onMouseEnter={() => setIndustryOpen(true)}
          onMouseLeave={() => setIndustryOpen(false)}
          className="w-[150px] p-2"
        >
          {categories.map((cat, key) => (
            <div
              key={key}
              className="p-2 hover:bg-gray-100 rounded cursor-pointer"
              onClick={() => handleIndustrySelect(cat.category)}
            >
              {cat.category}
            </div>
          ))}
        </PopoverContent>
      </Popover>

      {/* Location Dropdown */}
      <Popover open={locationOpen} onOpenChange={setLocationOpen}>
        <PopoverTrigger
          onMouseEnter={() => setLocationOpen(true)}
          onMouseLeave={() => setLocationOpen(false)}
          className="flex items-center justify-between text-gray-500 w-full md:w-auto px-3 py-2 border border-gray-200 rounded-md cursor-pointer"
        >
          <MapPin size={18} className="mr-2" />
          <span className="flex-1 text-left">{location || "Location"}</span>
          <ChevronDown size={16} className="ml-2 text-gray-400" />
        </PopoverTrigger>
        <PopoverContent
          onMouseEnter={() => setLocationOpen(true)}
          onMouseLeave={() => setLocationOpen(false)}
          className="w-[150px] p-2"
        >
          {["Remote", "New York", "San Francisco", "Bangalore", "London"].map(
            (loc) => (
              <div
                key={loc}
                className="p-2 hover:bg-gray-100 rounded cursor-pointer"
                onClick={() => handleLocationSelect(loc)}
              >
                {loc}
              </div>
            )
          )}
        </PopoverContent>
      </Popover>

      {/* Search Input */}
      <div className="flex items-center gap-2 border border-gray-200 px-3 py-2 rounded-md w-full md:w-auto">
        <Grid size={18} className="text-gray-500" />
        <Input
          className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-0 w-full md:w-[180px]"
          placeholder="software"
          value={keyword}
          onChange={handleSearchInput}
        />
      </div>

      {/* Search Button */}
      <Button
        className="bg-[#3c65f5] hover:bg-[#05264e] text-white px-6 py-2 rounded-lg flex items-center justify-center space-x-1 transition-all duration-200 w-full md:w-auto"
        onClick={() => {
          const query = new URLSearchParams();
          if (industry) query.append("industry", industry);
          if (location) query.append("location", location);
          if (keyword) query.append("keyword", keyword);
          router.push(`/allJob?${query.toString()}`);
        }}
      >
        <Search size={16} />
        <span>Search</span>
      </Button>
    </div>
  );
}
