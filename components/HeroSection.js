import React from "react";
import Image from "next/image";

const HeroSection = () => {
  return (
    <div className="flex flex-col lg:flex-row bg-gray-50 items-center justify-between md:min-h-[80vh] w-full overflow-hidden">
      <div className="left w-full lg:w-1/2 p-6 lg:p-10 lg:pl-24 space-y-4 flex flex-col items-start justify-center  "> 
        <h2 className="font-semibold text-3xl lg:text-5xl leading-tight break-words">
          The <span className="text-[#3c65f5]">Easiest Way</span> to Get Your New Job
        </h2>
        <p className="text-[#4f5e64] text-base lg:text-lg leading-relaxed break-words">
          Each month, more than 3 million job seekers turn to website in their
          search for work, making over 140,000 applications every single day
        </p>
      </div>
      
       <div className="right hidden  w-full lg:w-1/2 md:flex items-center justify-center  min-h-[40vh] lg:min-h-[80vh] p-4 lg:p-8 overflow-hidden">
        <div className="relative w-full max-w-md mx-auto h-full flex items-center justify-center">
          {/* Main Image Container - Positioned to allow overlap without overflow */}
          <div className="relative w-72 h-80 lg:w-80 lg:h-96">
            {/* Top Image with blue bor der styling */}
            <div className="absolute top-0 right-11  w-56 h-64 lg:w-[400px] lg:h-72 border-l-6 border-b-6 border-[#3c65f5] rounded-tl-3xl rounded-r-3xl overflow-hidden shadow-lg z-20">
              <Image
                src="/grp.jpg" 
                alt="Happy team collaboration"
                width={320}
                height={360}
                className="w-full h-full object-cover rounded-tl-3xl rounded-br-3xl"
              />
            </div>
            
            {/* Bottom Overlapping Image */}
            <div className="absolute -bottom-8 right-0 w-52 h-56 lg:w-[350px] lg:h-64 border-l-6 border-b-6 border-[#3c65f5] rounded-tl-3xl rounded-r-3xl overflow-hidden shadow-lg z-30">
              <Image
                src="/grp.jpg"
                alt="Professional meeting"
                width={280}
                height={320}
                className="w-full h-full object-cover rounded-tl-3xl rounded-br-3l"
              />
            </div>
            
          </div>
        </div>
      </div> 

    </div>
  );
};

export default HeroSection;