import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AllInOneProduct = () => {
  const sectionRef = useRef(null);
  const leftCard = useRef(null);
  const rightCard = useRef(null);
  const centerCard = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const leftEl = leftCard.current;
      const rightEl = rightCard.current;
      const centerEl = centerCard.current;

      const centerW = centerEl.offsetWidth;
      const sideW = leftEl.offsetWidth;

      const startOverlap = 0.75; // mostly hidden
      const endOverlap = 0.2; // 20% still inside

      const startDist = (centerW / 2 + sideW / 2) - startOverlap * sideW;
      const endDist = (centerW / 2 + sideW / 2) - endOverlap * sideW;

      gsap.set(leftEl, { x: -startDist });
      gsap.set(rightEl, { x: startDist });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=100%",
          scrub: 2.5,
          pin: true,
          pinSpacing: false, // ✅ no extra gap
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(leftEl, { x: -endDist, ease: "none" }, 0);
      tl.to(rightEl, { x: endDist, ease: "none" }, 0);

      tl.fromTo(centerEl, { scale: 0.95 }, { scale: 1, ease: "none" }, 0);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* PINNED SECTION */}
      <section
        ref={sectionRef}
        className="relative z-20 w-full min-h-screen bg-black flex flex-col items-center justify-center overflow-hidden"
      >
        {/* TEXT */}
        <div className="text-center z-30 mb-10 px-4">
          <h1 className="text-6xl md:text-[110px] font-bold text-white tracking-tighter leading-tight">
            All In One
          </h1>
          <h1 className="text-6xl md:text-[110px] font-bold text-[#555555] tracking-tighter leading-[0.85]">
            Product
          </h1>

          <div className="mt-8 relative inline-flex flex-col items-center group cursor-pointer">
            <div className="flex items-center gap-2 text-white text-lg md:text-xl font-medium">
              Learn more <span className="text-green-400 text-2xl">→</span>
            </div>
            <svg className="w-24 h-4 mt-1" viewBox="0 0 100 20">
              <path
                d="M5 15C25 5 75 5 95 15"
                stroke="#4ade80"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        {/* CARDS */}
        <div className="relative w-full flex justify-center items-center h-[400px] md:h-[460px]">
          {/* Left */}
          <div
            ref={leftCard}
            className="absolute w-[240px] h-[260px] md:w-[310px] md:h-[330px] rounded-[3rem] overflow-hidden shadow-2xl z-10 brightness-75"
          >
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1000&fit=crop"
              className="w-full h-full object-cover"
              alt="Left"
            />
          </div>

          {/* Right */}
          <div
            ref={rightCard}
            className="absolute w-[240px] h-[260px] md:w-[310px] md:h-[330px] rounded-[3rem] overflow-hidden shadow-2xl z-10 brightness-75"
          >
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&h=1000&fit=crop"
              className="w-full h-full object-cover"
              alt="Right"
            />
          </div>

          {/* Center */}
          <div
            ref={centerCard}
            className="absolute w-[300px] h-[290px] md:w-[440px] md:h-[380px] rounded-[3rem] overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.9)] z-20 border border-white/10"
          >
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=1000&fit=crop"
              className="w-full h-full object-cover"
              alt="Center"
            />
          </div>
        </div>
      </section>

      {/* ✅ SPACER (because pinSpacing:false) */}
      <div className="h-[100vh]" />

    </>
  );
};

export default AllInOneProduct;