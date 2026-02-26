import React from 'react';

const AboutSection = () => {
  return (
    <div className="bg-white"> 
      <section className="bg-black text-white pt-16 pb-20 px-6 md:pt-32 md:pb-24 md:px-20 min-h-[400px] rounded-t-[45px] md:rounded-t-[120px] overflow-hidden">
        <div className="max-w-7xl mx-auto w-full flex flex-col md:grid md:grid-cols-12 md:gap-12">
          
          {/* Left Side: About */}
          <div className="md:col-span-3 mb-8 md:mb-0">
            <h2 className="text-[20px] md:text-3xl font-bold text-white tracking-tight">
              About
            </h2>
          </div>

          {/* Right Side: Text Content */}
          <div className="md:col-span-9">
            <p className="text-[28px] md:text-[40px] font-medium tracking-tighter leading-[1.1] md:leading-[1.3] lg:leading-[1.5]">
              <span className="text-[#555555]">We elevate </span>
              <span className="relative text-white inline-block">
  phenomenal
  {/* Wavy Blue/Teal Line SVG - UPDATED COLOR */}
  <svg 
    className="absolute -bottom-1 left-0 w-full h-2 md:h-4" 
    viewBox="0 0 200 20" 
    fill="none"
    preserveAspectRatio="none"
  >
    <path 
      d="M2 15C40 5 160 5 198 15" 
      stroke="#0b6472"  /* Green (#4ade80) ko Blue (#0b6472) se replace kiya */
      strokeWidth="6" 
      strokeLinecap="round"
    />
  </svg>
</span>
              <span className="text-[#555555]"> solutions </span>
              <span className="text-[#555555] leading-14 sm:leading-normal">
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