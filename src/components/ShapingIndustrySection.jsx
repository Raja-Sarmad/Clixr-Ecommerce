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
    const ctx = gsap.context(() => {
      const lb = leftBack.current;
      const lf = leftFront.current;
      const rb = rightBack.current;
      const rf = rightFront.current;

      if (!lb || !lf || !rb || !rf) return;

      // Initial 3D transforms
      gsap.set(lf, {
        transformPerspective: 1200,
        transformOrigin: "50% 50%",
        rotationY: 15,
        rotationZ: -12,
        x: -420,
      });

      gsap.set(rf, {
        transformPerspective: 1200,
        transformOrigin: "50% 50%",
        rotationY: -15,
        rotationZ: 12,
        x: 420,
      });

      gsap.set(lb, { x: -260 });
      gsap.set(rb, { x: 260 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          end: "top 20%",
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });

      tl.to(lb, { x: 0, ease: "power2.out" }, 0);
      tl.to(rb, { x: 0, ease: "power2.out" }, 0);

      tl.to(lf, {
        x: 0,
        rotationZ: -15,
        ease: "power2.out",
      }, 0.05);

      tl.to(rf, {
        x: 0,
        rotationZ: 15,
        ease: "power2.out",
      }, 0.05);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const backW = "md:w-[350px]";
  const backH = "md:h-[470px]";
  const frontW = "md:w-[350px]";
  const frontH = "md:h-[490px]";

  return (
    <section
      ref={sectionRef}
      // ✅ Yahan h-screen ki jagah h-[115vh] kiya hai
      className="relative w-full h-[115vh] flex items-center justify-center bg-black overflow-hidden pt-10"
    >
      {/* LEFT SIDE */}
      <div className="absolute left-0 md:left-[3%] top-1/2 -translate-y-1/2 flex items-center pointer-events-none z-10">
        <div
          ref={leftBack}
          className={`relative w-[220px] h-[320px] ${backW} ${backH} rounded-[3rem] md:rounded-[4rem] overflow-hidden shadow-2xl z-0 brightness-[0.7] border border-white/5`}
        >
          <img
            src="https://cdn.prod.website-files.com/64a6caa646429ed756eb2d03/64a6cdff000962bbfb4a9cea_card1.jpg"
            className="w-full h-full object-cover"
            alt="Back"
          />
        </div>

        <div
          ref={leftFront}
          className={`absolute -left-14 md:-left-20 w-[200px] h-[290px] ${frontW} ${frontH} rounded-[3rem] md:rounded-[3.5rem] overflow-hidden shadow-[0_40px_90px_rgba(0,0,0,0.9)] z-20 border border-white/10`}
        >
          <img
            src="https://cdn.prod.website-files.com/64a6caa646429ed756eb2d03/64a6cdff000962bbfb4a9cd5_sc3.jpg"
            className="w-full h-full object-cover"
            alt="Front"
          />
        </div>
      </div>

      {/* CENTER CONTENT */}
      <div className="z-30 text-center flex flex-col items-center gap-6 px-4 mt-10">
        <h2 className="text-5xl md:text-[70px] font-medium text-white max-w-2xl leading-[1.3] tracking-tight">
          We’re <br /> Shaping <br /> Industry
        </h2>

        <div className="relative group cursor-pointer mt-4">
          <div className="absolute inset-0 bg-blue-600 blur-[100px] opacity-20"></div>
          <button className="relative w-30 h-28 md:w-40 md:h-40 rounded-full bg-gradient-to-b from-[#3a448e] to-[#0c0e1e] border border-white/10 flex items-center justify-center text-white transition-all duration-500 hover:scale-105 overflow-hidden shadow-xl">
            <span className="text-base md:text-xl font-medium">Get Clixr</span>
          </button>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="absolute right-0 md:right-[3%] top-1/2 -translate-y-1/2 flex items-center justify-end pointer-events-none z-10">
        <div
          ref={rightBack}
          className={`relative w-[220px] h-[320px] ${backW} ${backH} rounded-[3rem] md:rounded-[4rem] overflow-hidden shadow-2xl z-0 brightness-[0.7] border border-white/5`}
        >
          <img
            src="https://cdn.prod.website-files.com/64a6caa646429ed756eb2d03/64a6cdff000962bbfb4a9d10_stewart-maclean-Zs1WKNa4Oy0-unsplash.jpg"
            className="w-full h-full object-cover"
            alt="Back"
          />
        </div>

        <div
          ref={rightFront}
          className={`absolute -right-14 md:-right-20 w-[200px] h-[290px] ${frontW} ${frontH} rounded-[3rem] md:rounded-[3.5rem] overflow-hidden shadow-[0_40px_90px_rgba(0,0,0,0.9)] z-20 border border-white/10`}
        >
          <img
            src="https://cdn.prod.website-files.com/64a6caa646429ed756eb2d03/64a6cdff000962bbfb4a9cf9_card2.jpg"
            className="w-full h-full object-cover"
            alt="Front"
          />
        </div>
      </div>
    </section>
  );
};

export default ShapingIndustrySection;