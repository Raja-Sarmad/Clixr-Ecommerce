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

      const isMobile = window.innerWidth < 768;

      // Animation Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          // ✅ START: Jab section 70% screen par aa jaye tab shuru ho (Jab aap pounch jayenge)
          start: isMobile ? "top 300%" : "top 300%", 
          // ✅ END: Jab section ka center screen ke top par pounch jaye
          end: isMobile ? "bottom 20%" : "bottom 20%",
          scrub: 1.8, // Thoda slow aur smooth rakha hai taaki movement nazar aaye
          invalidateOnRefresh: true,
        },
      });

      if (isMobile) {
        // --- MOBILE INITIAL STATE ---
        gsap.set(lb, { x: -600, rotate: 15 });
        gsap.set(lf, { x: -700, rotate: 30, transformPerspective: 1200 });
        gsap.set(rb, { x: 600, rotate: -15 });
        gsap.set(rf, { x: 700, rotate: -30, transformPerspective: 1200 });

        // MOBILE ANIMATION
        tl.to(lb, { x: 40, rotate: 8, ease: "power2.out" }, 0)
          .to(lf, { x: -50, rotate: -12, ease: "power2.out" }, 0.1)
          .to(rb, { x: -40, rotate: -8, ease: "power2.out" }, 0)
          .to(rf, { x: 50, rotate: 12, ease: "power2.out" }, 0.1);

      } else {
        // --- DESKTOP INITIAL STATE ---
        gsap.set(lf, { transformPerspective: 1200, rotationY: 15, rotationZ: -12, x: -420 });
        gsap.set(rf, { transformPerspective: 1200, rotationY: -15, rotationZ: 12, x: 420 });
        gsap.set(lb, { x: -260 });
        gsap.set(rb, { x: 260 });

        // DESKTOP ANIMATION
        tl.to(lb, { x: 0, ease: "power2.out" }, 0)
          .to(rb, { x: 0, ease: "power2.out" }, 0)
          .to(lf, { x: 0, rotationZ: -15, ease: "power2.out" }, 0.05)
          .to(rf, { x: 0, rotationZ: 15, ease: "power2.out" }, 0.05);
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen md:h-[120vh] flex flex-col items-center justify-start md:justify-center bg-black overflow-hidden pt-16 md:pt-0 pb-24 md:pb-0"
    >
      {/* --- TOP SET (Slide from Left) --- */}
      <div className="relative flex items-center justify-center w-full md:w-auto h-[320px] md:h-auto md:absolute md:left-[3%] z-10">
        <div ref={leftBack} className="relative w-[180px] h-[250px] md:w-[350px] md:h-[470px] rounded-[2.5rem] md:rounded-[4rem] overflow-hidden shadow-2xl brightness-[0.7] border border-white/5">
          <img src="/Gallery/image13.jpeg" className="w-full h-full object-cover" alt="Back" />
        </div>
        <div ref={leftFront} className="absolute w-[190px] h-[280px] md:w-[350px] md:h-[490px] rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,1)] z-20 border border-white/10">
          <img src="/Gallery/image17.jpeg" className="w-full h-full object-cover" alt="Front" />
        </div>
      </div>

      {/* --- CENTER CONTENT --- */}
      <div className="z-30 text-center flex flex-col items-center gap-6 px-4 my-10 md:my-24">
        <h2 className="text-[52px] md:text-[75px] font-bold text-white max-w-2xl leading-[1.05] md:leading-[1.2] tracking-tighter">
          We’re <br /> Shaping <br /> Industry
        </h2>
        <div className="relative group cursor-pointer">
          <div className="absolute inset-0 bg-blue-600 blur-[100px] opacity-20"></div>
          <button className="relative w-36 h-36 md:w-48 md:h-48 rounded-full bg-gradient-to-b from-[#2a347e] via-[#12142a] to-black border border-white/10 flex items-center justify-center text-white transition-all duration-500 hover:scale-105 shadow-2xl">
            <span className="text-lg font-medium">Get Clixr</span>
          </button>
        </div>
      </div>

      {/* --- BOTTOM SET (Slide from Right) --- */}
      <div className="relative flex items-center justify-center w-full md:w-auto h-[320px] md:h-auto md:absolute md:right-[3%] md:top-1/2 md:-translate-y-1/2 z-10">
        <div ref={rightBack} className="relative w-[180px] h-[250px] md:w-[350px] md:h-[470px] rounded-[2.5rem] md:rounded-[4rem] overflow-hidden shadow-2xl brightness-[0.7] border border-white/5">
          <img src="/Gallery/image10.jpeg" className="w-full h-full object-cover" alt="Back" />
        </div>
        <div ref={rightFront} className="absolute w-[190px] h-[280px] md:w-[350px] md:h-[490px] rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,1)] z-20 border border-white/10">
          <img src="/Gallery/image21.jpeg" className="w-full h-full object-cover" alt="Front" />
        </div>
      </div>
    </section>
  );
};

export default ShapingIndustrySection;