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

    // LEFT SIDE: Back card ko thoda sa andar layenge
    tl.fromTo(leftBack.current, { x: -200 }, { x: 50, duration: 1 }, 0);
    // Front card: Iska X itna rakhenge ke ye Back card ke upar overlap kare
    tl.fromTo(leftFront.current, 
      { x: -350, rotate: 20, y: 40 }, 
      { x: -40, rotate: -12, y: 10, duration: 1 }, // x: -40 isko back card ke upar rakhega
      0.1
    ); 

    // RIGHT SIDE
    tl.fromTo(rightBack.current, { x: 200 }, { x: -50, duration: 1 }, 0);
    tl.fromTo(rightFront.current, 
      { x: 350, rotate: -20, y: 40 }, 
      { x: 40, rotate: 12, y: 10, duration: 1 }, // x: 40 isko back card ke upar rakhega
      0.1
    ); 
  }, []);

  // EXACT SIZES (Jo screen par fit aayein)
  const cardW = "md:w-[380px]"; 
  const cardH = "md:h-[500px]"; 

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen flex items-center justify-center bg-black overflow-hidden"
    >
      {/* --- LEFT SIDE CARDS --- */}
      <div className="absolute left-0 md:left-[2%] top-1/2 -translate-y-1/2 flex items-center pointer-events-none z-10">
        {/* Back Card (Straight) */}
        <div
          ref={leftBack}
          className={`relative w-[200px] h-[280px] ${cardW} ${cardH} rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden shadow-2xl z-0 brightness-75`}
        >
          <img
            src="https://cdn.prod.website-files.com/64a6caa646429ed756eb2d03/64a6cdff000962bbfb4a9cea_card1.jpg"
            className="w-full h-full object-cover"
            alt=""
          />
        </div>
        {/* Front Card (Overlapping like the reference) */}
        <div
          ref={leftFront}
          className={`absolute left-0 w-[210px] h-[320px] ${cardW} ${cardH} rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.8)] z-20 border-4 border-black/20`}
          style={{ 
             transform: "perspective(1200px) rotateY(18deg) rotateZ(-8deg)",
             transformStyle: "preserve-3d"
          }}
        >
          <img
            src="https://cdn.prod.website-files.com/64a6caa646429ed756eb2d03/64a6cdff000962bbfb4a9cd5_sc3.jpg"
            className="w-full h-full object-cover shadow-inner"
            alt=""
          />
        </div>
      </div>

      {/* --- CENTER CONTENT --- */}
      <div className="z-30 text-center flex flex-col items-center gap-6 px-4">
        <h2 className="text-5xl md:text-[90px] font-bold text-white max-w-2xl leading-[1] tracking-tighter">
          We’re <br /> Shaping <br /> Industry
        </h2>
        
        {/* Button */}
        <div className="relative group cursor-pointer mt-4">
          <div className="absolute inset-0 bg-blue-600 blur-[100px] opacity-10"></div>
          <button className="relative w-36 h-36 md:w-44 md:h-44 rounded-full bg-gradient-to-br from-[#2a347e] via-[#12142a] to-black border border-white/10 flex items-center justify-center text-white transition-all duration-500 hover:scale-105 shadow-2xl">
            <span className="text-lg font-medium">Get Clixr</span>
          </button>
        </div>
      </div>

      {/* --- RIGHT SIDE CARDS --- */}
      <div className="absolute right-0 md:right-[2%] top-1/2 -translate-y-1/2 flex items-center justify-end pointer-events-none z-10">
        {/* Back Card */}
        <div
          ref={rightBack}
          className={`relative w-[200px] h-[280px] ${cardW} ${cardH} rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden shadow-2xl z-0 brightness-75`}
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
          className={`absolute right-0 w-[210px] h-[320px] ${cardW} ${cardH} rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.8)] z-20 border-4 border-black/20`}
          style={{ 
             transform: "perspective(1200px) rotateY(-18deg) rotateZ(8deg)",
             transformStyle: "preserve-3d"
          }}
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