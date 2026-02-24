// src/components/ShapingIndustrySection.jsx
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
        start: "top 85%",
        end: "top 15%",
        scrub: 1.5,
      },
    });

    // LEFT SIDE
    tl.fromTo(leftBack.current, { x: -400, rotate: 5 }, { x: -40, rotate: 2, duration: 1 }, 0);
    tl.fromTo(leftFront.current, { x: -550, rotate: 20, y: 50 }, { x: -110, rotate: -15, y: 30, duration: 1 }, 0.1); 

    // RIGHT SIDE
    tl.fromTo(rightBack.current, { x: 400, rotate: -5 }, { x: 40, rotate: -2, duration: 1 }, 0);
    tl.fromTo(rightFront.current, { x: 550, rotate: -20, y: 50 }, { x: 110, rotate: 15, y: 30, duration: 1 }, 0.1); 
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen flex items-center justify-center bg-black overflow-hidden py-10"
    >
      {/* --- LEFT SIDE CARDS --- */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
        {/* Back Card */}
        <div
          ref={leftBack}
          className="relative w-[350px] h-[450px] md:w-[430px] md:h-[540px] rounded-[3.5rem] overflow-hidden shadow-2xl z-0"
        >
          <img
            src="https://cdn.prod.website-files.com/64a6caa646429ed756eb2d03/64a6cdff000962bbfb4a9cea_card1.jpg"
            className="w-full h-full object-cover"
            alt=""
          />
        </div>
        {/* Front Card */}
        <div
          ref={leftFront}
          className="absolute left-0 w-[350px] h-[600px] md:w-[430px] md:h-[600px] rounded-[3.5rem] overflow-hidden shadow-2xl z-10 border-4 border-black/30"
          style={{ transform: "perspective(1200px) rotateY(18deg) rotateX(-8deg) rotateZ(6deg)" }}
        >
          <img
            src="https://cdn.prod.website-files.com/64a6caa646429ed756eb2d03/64a6cdff000962bbfb4a9cd5_sc3.jpg"
            className="w-full h-full object-cover"
            alt=""
          />
        </div>
      </div>

      {/* --- CENTER CONTENT --- */}
      <div className="z-16 text-center flex flex-col items-center gap-3 px-10">
        <h2 className="md:text-[80px] font-semibold text-white max-w-lg leading-[1.2] tracking-tighter pt-18">
          We’re  Shaping  Industry
        </h2>
        <button className="relative w-36 h-36 md:w-44 md:h-44 flex items-center justify-center rounded-full bg-gradient-to-br from-[#3b448f] via-[#12142a] to-black text-white font-semibold text-lg transition-all duration-500 hover:scale-110 border border-white/10 px-0">
          Get Clixr
        </button>
      </div>

      {/* --- RIGHT SIDE CARDS --- */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-end pointer-events-none">
        {/* Back Card */}
        <div
          ref={rightBack}
          className="relative w-[350px] h-[450px] md:w-[430px] md:h-[540px] rounded-[3.5rem] overflow-hidden shadow-2xl z-0 brightness-90"
        >
          <img
            src="https://cdn.prod.website-files.com/64a6caa646429ed756eb2d03/64a6cdff000962bbfb4a9d10_stewart-maclean-Zs1WKNa4Oy0-unsplash.jpg"
            className="w-full h-full object-cover"
            alt=""
          />
        </div>
        {/* Front Card */}
        <div
          ref={rightFront}
          className="absolute right-0 w-[350px] h-[600px] md:w-[430px] md:h-[600px] rounded-[3.5rem] overflow-hidden shadow-2xl z-10 border-4 border-black/30"
        >
          <img
            src="https://cdn.prod.website-files.com/64a6caa646429ed756eb2d03/64a6cdff000962bbfb4a9cf9_card2.jpg" 
            className="w-full h-full object-cover"
            alt=""
          />
        </div>
      </div>
    </section>
  );
};

export default ShapingIndustrySection;