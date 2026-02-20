import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ShapingIndustrySection = () => {
  const sectionRef = useRef(null);
  const leftBack = useRef(null);
  const leftFront = useRef(null);
  const rightBack = useRef(null);
  const rightFront = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 90%",
        end: "top 10%",
        scrub: 1.5,
      },
    });

    // LEFT SIDE: Upar se andar, neeche se bahar (Positive Rotation)
    tl.fromTo(leftBack.current, 
      { x: -400, rotate: -5 }, 
      { x: -50, rotate: 0, duration: 1 }, 0);
    
    tl.fromTo(leftFront.current, 
      { x: -500, rotate: -20, y: 50 }, 
      { x: -100, rotate: 15, y: 30, duration: 1 }, 0.1); // rotate: 15 se upar andar jayega

    // RIGHT SIDE: Upar se andar, neeche se bahar (Negative Rotation)
    tl.fromTo(rightBack.current, 
      { x: 400, rotate: 5 }, 
      { x: 50, rotate: 0, duration: 1 }, 0);
    
    tl.fromTo(rightFront.current, 
      { x: 500, rotate: 20, y: 50 }, 
      { x: 100, rotate: -15, y: 30, duration: 1 }, 0.1); // rotate: -15 se upar andar jayega
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen flex items-center justify-center bg-black overflow-hidden"
    >
      {/* --- LEFT SIDE CARDS --- */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
        {/* Back Card (Yellow) */}
        <div
          ref={leftBack}
          className="relative w-[280px] h-[400px] md:w-[380px] md:h-[520px] rounded-[3rem] overflow-hidden shadow-2xl z-0"
        >
          <img
            src="https://cdn.prod.website-files.com/64a6caa646429ed756eb2d03/64a6cdff000962bbfb4a9cea_card1.jpg"
            className="w-full h-full object-cover"
            alt=""
          />
        </div>
        {/* Front Card (Face) - Tilted Top-In, Bottom-Out */}
        <div
          ref={leftFront}
          className="absolute left-0 w-[280px] h-[400px] md:w-[380px] md:h-[520px] rounded-[3rem] overflow-hidden shadow-2xl z-10 border-2 border-white/5"
        >
          <img
            src="https://cdn.prod.website-files.com/64a6caa646429ed756eb2d03/64a6cdff000962bbfb4a9d10_stewart-maclean-Zs1WKNa4Oy0-unsplash.jpg"
            className="w-full h-full object-cover"
            alt=""
          />
        </div>
      </div>

      {/* --- CENTER CONTENT --- */}
      <div className="z-20 text-center flex flex-col items-center gap-10 px-6">
        <h2 className="text-5xl md:text-[85px] font-bold text-white max-w-xl leading-[0.95] tracking-tighter">
          We’re Shaping Industry
        </h2>
        
        <button className="relative w-36 h-36 flex items-center justify-center rounded-full bg-gradient-to-b from-[#3a448d] to-[#121429] text-white font-medium text-lg transition-transform hover:scale-110 shadow-[0_0_50px_rgba(58,68,141,0.4)] border border-white/10">
          Get Clixr
        </button>
      </div>

      {/* --- RIGHT SIDE CARDS --- */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-end pointer-events-none">
        {/* Back Card */}
        <div
          ref={rightBack}
          className="relative w-[280px] h-[400px] md:w-[380px] md:h-[520px] rounded-[3rem] overflow-hidden shadow-2xl z-0 brightness-90"
        >
          <img
            src="https://cdn.prod.website-files.com/64a6caa646429ed756eb2d03/64a6cdff000962bbfb4a9cea_card1.jpg"
            className="w-full h-full object-cover"
            alt=""
          />
        </div>
        {/* Front Card - Tilted Top-In, Bottom-Out */}
        <div
          ref={rightFront}
          className="absolute right-0 w-[280px] h-[400px] md:w-[380px] md:h-[520px] rounded-[3rem] overflow-hidden shadow-2xl z-10 border-2 border-white/5"
        >
          <img
            src="https://cdn.prod.website-files.com/64a6caa646429ed756eb2d03/64a6cdff000962bbfb4a9d10_stewart-maclean-Zs1WKNa4Oy0-unsplash.jpg" 
            className="w-full h-full object-cover"
            alt=""
          />
        </div>
      </div>
    </section>
  );
};

export default ShapingIndustrySection;