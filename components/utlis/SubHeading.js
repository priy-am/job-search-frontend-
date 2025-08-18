import { Home } from "lucide-react";
import Link from "next/link";

const  SubHeading = ({Heading, bio=" "}) => {

    return (
        <>
            <div className="w-full bg-[#f0f5fc] mt-8 py-3 sm:py-5 md:py-10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          {/* Title & Subtext */}
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-[#05264e]">
              {Heading}
            </h1>
            <p className="text-[#6c757d] text-base sm:text-lg mt-1">
              {bio}
            </p>
          </div>

          {/* Breadcrumb */}
          <div className="bg-white max-w-80 shadow-sm px-4 py-2 rounded-md flex items-center gap-1 text-sm text-[#6c757d]">
            <Home size={16} className="text-[#6c757d]" />
            <Link href="/" className="hover:underline text-[#6c757d]">
              JobSearch
            </Link>
            <span className="mx-1">›</span>
            <span className="text-[#3c65f5] font-medium">{Heading}</span>
          </div>
        </div>
      </div>
        </>
    );
}

export default SubHeading;