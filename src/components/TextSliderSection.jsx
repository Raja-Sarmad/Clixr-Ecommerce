import React from "react";

const TextSliderSection = () => {
  return (
    <div className="bg-[#ffffff] py-6 overflow-hidden">
      <div className="relative overflow-hidden">

        <div className="slider flex text-[90px] font-medium">

          {/* Group 1 */}
          <div className="slide flex gap-10">
            <span className="text-black">Acrylic Paintings</span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-400">Watercolor Art</span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-400">Oil Paint</span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-400">Canvas Artwork</span>
            <span className="text-gray-400">•</span>
          </div>

          {/* Group 2 (duplicate for seamless loop) */}
          <div className="slide flex gap-10">
            <span className="text-black">Acrylic Paintings</span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-400">Watercolor Art</span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-400">Oil Paint</span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-400">Canvas Artwork</span>
            <span className="text-gray-400">•</span>
          </div>

        </div>
      </div>

      <style>
        {`
        .slider{
          width: max-content;
          display:flex;
          animation: scroll 30s linear infinite;
        }

        .slide{
          display:flex;
          gap:40px;
          padding-right:40px;
        }

        @keyframes scroll{
          0%{ transform: translateX(0); }
          100%{ transform: translateX(-50%); }
        }
        `}
      </style>
    </div>
  );
};

export default TextSliderSection;