import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HappilyCustomer = () => {
  const leftStack = useRef(null);
  const rightStack = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    // Subtle Scroll Parallax (Halka sa hilne wala effect)
    gsap.to(leftStack.current, {
      y: -100, // Left side thoda upar jayega
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5,
      }
    });

    gsap.to(rightStack.current, {
      y: 100, // Right side thoda neeche jayega (Opposite movement for dynamic feel)
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5,
      }
    });
  }, []);

  const leftImages = [
    "https://cdn.prod.website-files.com/64a6caa646429ed756eb2d03/64a6cdff000962bbfb4a9ccb_sc1.jpg", // Yellow BG
    "https://cdn.prod.website-files.com/64a6caa646429ed756eb2d03/64a6cdff000962bbfb4a9d0c_customer3.jpg", // Blue BG
    "https://cdn.prod.website-files.com/64a6caa646429ed756eb2d03/64a6cdff000962bbfb4a9cc6_newsletter.jpg", // Green BG
  ];

  const rightImages = [
    "https://cdn.prod.website-files.com/64a6caa646429ed756eb2d03/64a6cdff000962bbfb4a9d07_customer1.jpg", // Pink BG
    "https://cdn.prod.website-files.com/64a6caa646429ed756eb2d03/64a6cdff000962bbfb4a9cd0_main.jpg", // Blue BG
    "https://cdn.prod.website-files.com/64a6caa646429ed756eb2d03/64a6cdff000962bbfb4a9cdd_customer2.jpg", // Flower Girl
  ];

  return (
    <section ref={sectionRef} className="relative w-full min-h-screen bg-black flex items-center justify-center overflow-hidden py-20">
      
      {/* --- LEFT SIDE STACK --- */}
      <div ref={leftStack} className="absolute left-[-60px] md:left-4 lg:left-10 flex flex-col items-start pointer-events-none">
        {leftImages.map((img, i) => (
          <div 
            key={i} 
            className="w-48 h-48 md:w-[280px] md:h-[280px] lg:w-[320px] lg:h-[320px] rounded-full overflow-hidden border-[10px] md:border-[15px] border-black shadow-2xl -mt-20 md:-mt-36 first:mt-0"
            style={{ zIndex: i }} // Neeche wali image upar aayegi logic
          >
            <img src={img} alt="customer" className="w-full h-full object-cover" />
          </div>
        ))}
      </div>

      {/* --- CENTER CONTENT --- */}
      <div className="text-center z-50 flex flex-col items-center px-4">
        {/* +1M Section */}
        <div className="relative inline-block">
          <h1 className="text-[60px] md:text-[60px] lg:text-[100px] font-bold text-white tracking-tighter leading-none">
            +1M
          </h1>
          {/* Red Arc Underline */}
          <svg className="absolute -bottom-4 md:-bottom-10 left-0 w-full h-8 md:h-12" viewBox="0 0 200 20">
            <path d="M15 15C60 5 140 5 185 15" stroke="#ef4444" strokeWidth="6" fill="none" strokeLinecap="round" />
          </svg>
        </div>

        {/* Happy Customers Text */}
        <div className="mt-12 md:mt-20 space-y-0">
          <h2 className="text-[60px] md:text-[60px] lg:text-[100px] font-bold text-[#888888] tracking-tighter leading-[0.75]">
            Happy
          </h2>
          <h2 className="text-[60px] md:text-[60px] lg:text-[100px] font-bold text-[#888888] tracking-tighter leading-[0.75]">
            Customers
          </h2>
        </div>

        {/* Read Reviews Link */}
        <div className="mt-20 md:mt-32 relative inline-block group cursor-pointer">
          <span className="text-lg md:text-2xl font-semibold text-white tracking-tight">Read Reviews</span>
          {/* Green Arc */}
          <svg className="absolute -bottom-3 left-0 w-full h-4" viewBox="0 0 150 20">
            <path d="M10 15C40 5 110 5 140 15" stroke="#4ade80" strokeWidth="3" fill="none" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* --- RIGHT SIDE STACK --- */}
      <div ref={rightStack} className="absolute right-[-60px] md:right-4 lg:right-10 flex flex-col items-end pointer-events-none">
        {rightImages.map((img, i) => (
          <div 
            key={i} 
            className="w-48 h-48 md:w-[280px] md:h-[280px] lg:w-[320px] lg:h-[320px] rounded-full overflow-hidden border-[10px] md:border-[15px] border-black shadow-2xl -mt-20 md:-mt-36 first:mt-0"
            style={{ zIndex: i }}
          >
            <img src={img} alt="customer" className="w-full h-full object-cover" />
          </div>
        ))}
      </div>

    </section>
  );
};

export default HappilyCustomer;