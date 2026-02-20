import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HappilyCustomer = () => {
  const leftStack = useRef(null);
  const rightStack = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    // Subtle Scroll Animation
    gsap.to([leftStack.current, rightStack.current], {
      y: -80, // Mamooli si upward movement
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1, // Smoothly follows scroll
      }
    });
  }, []);

  const leftImages = [
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop", 
    "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=400&h=400&fit=crop", 
    "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop", 
  ];

  const rightImages = [
    "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop", 
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop", 
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop", 
  ];

  return (
    <section ref={sectionRef} className="relative w-full min-h-screen bg-black flex items-center justify-center overflow-hidden py-24">
      
      {/* --- LEFT SIDE STACK --- */}
      <div ref={leftStack} className="absolute left-[-40px] md:left-12 flex flex-col">
        {leftImages.map((img, i) => (
          <div 
            key={i} 
            className="w-44 h-44 md:w-72 md:h-72 rounded-full overflow-hidden border-[12px] border-black shadow-2xl -mt-16 md:-mt-24 first:mt-0"
            style={{ zIndex: i + 1 }} // Har neeche wali image upar wale se upar hogi
          >
            <img src={img} alt="customer" className="w-full h-full object-cover" />
          </div>
        ))}
      </div>

      {/* --- CENTER CONTENT (Same as before) --- */}
      <div className="text-center z-50 flex flex-col items-center">
        <div className="relative inline-block">
          <h1 className="text-7xl md:text-[150px] font-bold text-white tracking-tighter leading-none">
            +1M
          </h1>
          <svg className="absolute -bottom-4 md:-bottom-8 left-0 w-full h-6 md:h-10" viewBox="0 0 200 20">
            <path d="M10 15C50 5 150 5 190 15" stroke="#ef4444" strokeWidth="6" fill="none" strokeLinecap="round" />
          </svg>
        </div>

        <div className="mt-10 md:mt-16">
          <h2 className="text-6xl md:text-[130px] font-bold text-[#555555] tracking-tighter leading-[0.82]">
            Happy
          </h2>
          <h2 className="text-6xl md:text-[130px] font-bold text-[#555555] tracking-tighter leading-[0.82]">
            Customers
          </h2>
        </div>

        <div className="mt-20 md:mt-28 relative inline-block group cursor-pointer">
          <span className="text-xl md:text-2xl font-medium text-white">Read Reviews</span>
          <svg className="absolute -bottom-3 left-0 w-full h-4" viewBox="0 0 150 20">
            <path d="M5 15C30 5 120 5 145 15" stroke="#4ade80" strokeWidth="3" fill="none" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* --- RIGHT SIDE STACK --- */}
      <div ref={rightStack} className="absolute right-[-40px] md:right-12 flex flex-col items-end">
        {rightImages.map((img, i) => (
          <div 
            key={i} 
            className="w-44 h-44 md:w-72 md:h-72 rounded-full overflow-hidden border-[12px] border-black shadow-2xl -mt-16 md:-mt-24 first:mt-0"
            style={{ zIndex: i + 1 }}
          >
            <img src={img} alt="customer" className="w-full h-full object-cover" />
          </div>
        ))}
      </div>

    </section>
  );
};

export default HappilyCustomer;