import React from "react";

const BrowseCard = ({ title, available, icon, colorClass }) => {
  return (
    <div className="group bg-white rounded-xl border border-gray-100 px-1.5 py-2 h-full hover:shadow-lg hover:border-[#3c65f5] cursor-pointer transition-all duration-300 transform hover:-translate-y-1 hover:scale-105">
      <div className="flex  items-start justify-center space-y-4">
        {/* Icon */}
        <div className={`w-12 h-12 rounded-lg flex items-center  justify-center text-xl ${colorClass || 'bg-blue-100 text-blue-600'} group-hover:scale-110 transition-transform duration-300`}>
          {icon || "📊"}
        </div>
        
        {/* Content */}
        <div className="space-y-2 w-full">
          <h4 className="text-[#05264e] font-semibold text-lg hover:text-[#3c65f5] transition-colors duration-300">
            {title}
          </h4>
          <p className="text-[#4f5e64] hover:text-[#3c65f5] text-sm">
            {available}
          </p>
        </div>
        
        
      </div>
    </div>
  );
};

export default BrowseCard;