// src/components/HappilyCustomer.jsx
import React, { useEffect, useRef, useState } from "react";

const HappilyCustomer = () => {
  const leftImages = [
    "/Gallery/image41.jpeg",
    "/Gallery/image42.jpeg",
    "/Gallery/image43.jpeg",
  ];

  const rightImages = [
    "/Gallery/image44.jpeg",
    "/Gallery/image45.jpeg",
    "/Gallery/image46.jpeg",
  ];

  const sectionRef = useRef(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    const update = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = (vh - rect.top) / (vh + rect.height);
      setP(Math.max(0, Math.min(1, progress)));
    };
    window.addEventListener("scroll", update);
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  const verticalShift = (p - 0.5) * 100;
  const horizontalShift = (p - 0.5) * 150;

  return (
    <section
      ref={sectionRef}
      className="bg-black min-h-screen flex flex-col items-center justify-center overflow-hidden relative py-20 px-4 md:px-0"
    >
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-[1400px] md:px-16 gap-12 md:gap-0">
        
        {/* LEFT / TOP IMAGES STACK */}
        <div 
          className="flex flex-row md:flex-col shrink-0 gap-4 md:gap-0 transition-transform duration-100 ease-linear self-start md:self-auto"
          style={{ 
            transform: typeof window !== 'undefined' && window.innerWidth > 768 
              ? `translateY(${verticalShift * -1.2}px)` 
              : `translateX(${horizontalShift}px)` 
          }}
        >
          {leftImages.map((img, i) => (
            <div 
              key={i} 
              className="w-[140px] h-[140px] md:w-[260px] md:h-[260px] rounded-full overflow-hidden border-[3px] border-white/10 md:-mt-16 first:mt-0 relative bg-zinc-900 shadow-2xl transition-all duration-500 hover:scale-105 hover:z-50 hover:border-[#0b6472]"
            >
              <img 
                src={img} 
                alt="Customer" 
                className="w-full h-full object-fill object-cover" 
              />
            </div>
          ))}
        </div>

        {/* CENTER CONTENT */}
        <div className="text-center z-10 flex flex-col items-center">
          
          {/* +1M Area */}
          <div className="relative inline-block">
            <h1 className="text-white text-[85px] md:text-[130px] font-black leading-none tracking-[-4px] md:tracking-[-8px]">
              +1M
            </h1>
            <div className="mt-3 flex justify-center">
              <svg width="220" height="24" viewBox="0 0 210 22" fill="none" className="w-[180px] md:w-[240px]">
                <path d="M10 18 Q105 2 200 18" stroke="url(#red-grad)" strokeWidth="12" strokeLinecap="round" />
                <defs>
                  <linearGradient id="red-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#E63946" />
                    <stop offset="100%" stopColor="#450a0a" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          {/* Happy Customers Text */}
          <div className="mt-10">
            <h2 className="text-[#4a4a4a] text-[65px] md:text-[100px] font-bold leading-[0.85] tracking-tighter">
              Happy<br />Customers
            </h2>
          </div>

          {/* Read Reviews Link */}
          <div className="mt-14 cursor-pointer group flex flex-col items-center">
            <p className="text-white font-bold text-xl md:text-2xl tracking-wide transition-all duration-300 group-hover:tracking-[0.2em] group-hover:text-[#14b8a6]">
              Read Reviews
            </p>
            <div className="mt-2">
              <svg width="180" height="18" viewBox="0 0 190 16" fill="none" className="transition-transform duration-500 group-hover:scale-110">
                <path d="M10 12 Q95 1 180 12" stroke="url(#blue-teal-grad)" strokeWidth="8" strokeLinecap="round" />
                <defs>
                  <linearGradient id="blue-teal-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#14b8a6" />
                    <stop offset="50%" stopColor="#0b6472" />
                    <stop offset="100%" stopColor="#022227" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>

        {/* RIGHT / BOTTOM IMAGES STACK */}
        <div 
          className="flex flex-row md:flex-col shrink-0 gap-4 md:gap-0 transition-transform duration-100 ease-linear self-end md:self-auto"
          style={{ 
            transform: typeof window !== 'undefined' && window.innerWidth > 768 
              ? `translateY(${verticalShift * 1.2}px)` 
              : `translateX(${horizontalShift * -1}px)` 
          }}
        >
          {rightImages.map((img, i) => (
            <div 
              key={i} 
              className="w-[140px] h-[140px] md:w-[260px] md:h-[260px] rounded-full overflow-hidden border-[3px] border-white/10 md:-mt-16 first:mt-0 relative bg-zinc-900 shadow-2xl transition-all duration-500 hover:scale-105 hover:z-50 hover:border-[#0b6472]"
            >
              <img 
                src={img} 
                alt="Customer" 
                className="w-full h-full object-fill object-cover" 
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HappilyCustomer;