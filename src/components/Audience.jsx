import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Audience = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // GSAP Scroll Animation
      gsap.fromTo(
        contentRef.current,
        {
          opacity: 0,
          scale: 0.5,
          y: 200,
          filter: "blur(15px)",
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          filter: "blur(0px)",
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 90%",
            end: "center center",
            scrub: 1.5,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full min-h-screen bg-black flex items-center justify-center overflow-hidden py-20"
    >
      <div ref={contentRef} className="flex flex-col items-center max-w-5xl px-4">
        
        {/* Avatar Section */}
        <div className="w-44 h-44 md:w-64 md:h-64 rounded-full overflow-hidden border-[6px] border-white/5 shadow-2xl">
          <img
            src="/Gallery/image39.png"
            alt="Surprised Man"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Text Section */}
        <div className="mt-12 relative text-center">
          <h1 className="text-white font-semibold tracking-tight text-[50px] md:text-[100px] leading-tight">
            <span className="relative inline-block">
              Wow
              {/* Green Arc Underline */}
              <svg className="absolute -bottom-2 left-0 w-full h-4 md:h-8" viewBox="0 0 100 20">
                <path d="M5 15C30 5 70 5 95 15" stroke="#4ade80" strokeWidth="5" strokeLinecap="round" fill="none" />
              </svg>
            </span> Your Audience
          </h1>
        </div>

        {/* --- PREMIUM BUTTON (EXACT IMAGE COLOR) --- */}
        <button className="mt-16 group relative w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center transition-all duration-500 hover:scale-110 overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
          
          {/* Exact Radial Gradient Match: Emerald to Black */}
          {/* Isme humne specifically bright emerald (#64d38c) aur deep green use kiya hai */}
          <div 
            className="absolute inset-0 rounded-full border border-white/10 transition-all duration-500 group-hover:brightness-125"
            style={{
                background: "radial-gradient(circle at 75% 25%, #7cf3a0 0%, #4ade80 20%, #064e3b 50%, #000 90%)"
            }}
          ></div>

          {/* Arrow SVG: Shuru mein seedha (→), Hover par tedha (↗) */}
          <svg 
            className="relative z-10 w-9 h-9 md:w-14 md:h-14 text-white transition-all duration-500 transform group-hover:-rotate-45 group-hover:-translate-y-1 group-hover:translate-x-1" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            {/* Horizontal Arrow Line */}
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>

          {/* Subtle Outer Glow on Hover */}
          <div className="absolute inset-0 bg-[#4ade80]/10 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity"></div>
        </button>

      </div>
    </section>
  );
};

export default Audience;