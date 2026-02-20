import React from "react";

const TextSliderSection = () => {
  return (
    <div className="bg-[#ffffff] py-6 overflow-hidden">
      <div className="relative whitespace-nowrap overflow-hidden">

        {/* Slider Track */}
        <div className="slider-track flex gap-12 text-[90px] font-medium">

          {/* Original content */}
          <div className="flex gap-10">
            <span className="text-black">Awesome</span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-400">Amazing</span>
            <span className="text-gray-400">•</span>
          </div>

          {/* Duplicate for seamless scroll */}
          <div className="flex gap-10">
            <span className="text-black">Awesome</span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-400">Amazing</span>
            <span className="text-gray-400">•</span>
          </div>

        </div>
      </div>

      {/* Smooth Infinite Animation */}
      <style>
        {`
          .slider-track {
            display: inline-flex;
            animation: marquee 6s linear infinite; /* Fast 6s scroll */
          }

          @keyframes marquee {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%); /* Scroll exactly half the track */
            }
          }

          /* Thinner text */
          .slider-track span {
            font-weight: 500; /* Medium instead of semibold */
          }
        `}
      </style>
    </div>
  );
};

export default TextSliderSection;