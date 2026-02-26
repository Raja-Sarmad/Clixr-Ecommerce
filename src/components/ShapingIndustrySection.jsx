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

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 300%", 
          end: "bottom 20%",
          scrub: 1.8, 
          invalidateOnRefresh: true,
        },
      });

      if (isMobile) {
        gsap.set(lb, { x: -600, rotate: 15 });
        gsap.set(lf, { x: -700, rotate: 30, transformPerspective: 1200 });
        gsap.set(rb, { x: 600, rotate: -15 });
        gsap.set(rf, { x: 700, rotate: -30, transformPerspective: 1200 });

        tl.to(lb, { x: 40, rotate: 8, ease: "power2.out" }, 0)
          .to(lf, { x: -50, rotate: -12, ease: "power2.out" }, 0.1)
          .to(rb, { x: -40, rotate: -8, ease: "power2.out" }, 0)
          .to(rf, { x: 50, rotate: 12, ease: "power2.out" }, 0.1);

      } else {
        gsap.set(lf, { transformPerspective: 1200, rotationY: 15, rotationZ: -12, x: -420 });
        gsap.set(rf, { transformPerspective: 1200, rotationY: -15, rotationZ: 12, x: 420 });
        gsap.set(lb, { x: -260 });
        gsap.set(rb, { x: 260 });

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
      {/* --- TOP SET --- */}
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
          {/* Blue/Teal Ambient Glow behind button */}
          <div className="absolute inset-0 bg-[#0b6472] blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
          
          {/* UPDATED BUTTON: Matched with Hero Button */}
          <button 
            className="relative z-20 w-[110px] h-[110px] md:w-[140px] md:h-[140px] rounded-full font-bold text-white text-[15px] md:text-[18px] 
            bg-gradient-to-br from-[#0b6472] to-[#022227] border-2 border-white/20 flex items-center justify-center 
            shadow-[0_0_40px_rgba(11,100,114,0.7)] transition-transform duration-500 hover:scale-105"
            style={{ animation: "float 6s ease-in-out infinite" }}
          >
            <span className="relative z-10">Get Clixr</span>
          </button>
        </div>
      </div>

      {/* --- BOTTOM SET --- */}
      <div className="relative flex items-center justify-center w-full md:w-auto h-[320px] md:h-auto md:absolute md:right-[3%] md:top-1/2 md:-translate-y-1/2 z-10">
        <div ref={rightBack} className="relative w-[180px] h-[250px] md:w-[350px] md:h-[470px] rounded-[2.5rem] md:rounded-[4rem] overflow-hidden shadow-2xl brightness-[0.7] border border-white/5">
          <img src="/Gallery/image10.jpeg" className="w-full h-full object-cover" alt="Back" />
        </div>
        <div ref={rightFront} className="absolute w-[190px] h-[280px] md:w-[350px] md:h-[490px] rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,1)] z-20 border border-white/10">
          <img src="/Gallery/image21.jpeg" className="w-full h-full object-cover" alt="Front" />
        </div>
      </div>

      <style jsx>{`
        @keyframes float { 
          0%, 100% { transform: translateY(0px); } 
          50% { transform: translateY(-10px); } 
        }
      `}</style>
    </section>
  );
};

export default ShapingIndustrySection;