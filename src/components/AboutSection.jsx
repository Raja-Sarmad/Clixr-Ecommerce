import React from 'react';

const AboutSection = () => {
  return (
    /* Parent container ko white ya koi background color dena zaroori hai 
       taaki rounded corners ka cut saaf nazar aaye */
    <div className="bg-white"> 
      <section className="bg-black text-white pt-32 pb-24 px-10 md:px-20 min-h-[400px] flex items-start rounded-t-[50px] md:rounded-t-[120px] overflow-hidden">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-12">
          
          {/* Left Side: About */}
          <div className="md:col-span-3">
            <h2 className="text-3xl md:text-3xl font-bold text-gray-200 tracking-wide pt-6 pl-5">
              About
            </h2>
          </div>

          {/* Right Side: Text Content */}
          <div className="md:col-span-9 pl-35 px-5">
            <p className="text-2xl md:text-[35px] font-medium  tracking-tight text-gray-400 leading-[2.2]">
              <span className="text-gray-400">We elevate </span>
              <span className="relative text-white inline-block">
                phenomenal
                {/* Wavy Green Line SVG */}
                <svg 
                  className="absolute -bottom-3 left-0 w-full h-4" 
                  viewBox="0 0 200 20" 
                  fill="none"
                >
                  <path 
                    d="M2 15C40 5 160 5 198 15" 
                    stroke="#4ade80" 
                    strokeWidth="4" 
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <span className="text-gray-400"> solutions </span>
              <br className="hidden md:block" />
              <span className="text-gray-400">
                for growth by translating their future potential into a strategic brand narrative and authentic digital presence.
              </span>
            </p>
          </div>

        </div>
      </section>
    </div>
  );
};

export default AboutSection;