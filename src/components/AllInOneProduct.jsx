// src/components/AllInOneProduct.jsx
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AllInOneProduct = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null); // Cards container ke liye ref
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

      // Logic: Shuruat mein cards center ke peeche thode zyada honge
      const startOverlap = 0.8; 
      const endOverlap = 0.1;    

      const startDist = (centerW / 2 + sideW / 2) - startOverlap * sideW;
      const endDist = (centerW / 2 + sideW / 2) - endOverlap * sideW;

      // Initial Position
      gsap.set(leftEl, { x: -startDist });
      gsap.set(rightEl, { x: startDist });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "bottom bottom", // Jab section ka bottom screen ke bottom mein aaye
          end: "+=150%",          // Animation ki duration (kitna scroll lagega)
          scrub: 1,               // Smooth follow (increase for more smoothness)
          pin: true,              // Section ko wahi rok dega
          pinSpacing: true,       // Neeche wala content tab tak nahi aayega jab tak animation khatam na ho
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Animation
      tl.to(leftEl, { x: -endDist, ease: "power2.out" }, 0)
        .to(rightEl, { x: endDist, ease: "power2.out" }, 0)
        .fromTo(centerEl, { scale: 0.9 }, { scale: 1, ease: "power2.out" }, 0);

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-black">
      <section
        ref={sectionRef}
        className="relative w-full min-h-screen bg-black flex flex-col items-center justify-center overflow-hidden"
      >
        {/* TEXT CONTENT */}
        <div className="text-center z-30 mb-12 px-4">
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

        {/* CARDS CONTAINER */}
        <div ref={containerRef} className="relative w-full flex justify-center items-center h-[400px] md:h-[500px]">
          {/* Left Card */}
          <div
            ref={leftCard}
            className="absolute w-[240px] h-[260px] md:w-[320px] md:h-[340px] rounded-[3rem] overflow-hidden shadow-2xl z-10 brightness-50"
          >
            <img
              src="/Gallery/image26.jpeg"
              className="w-full h-full object-cover"
              alt="Left"
            />
          </div>

          {/* Right Card */}
          <div
            ref={rightCard}
            className="absolute w-[240px] h-[260px] md:w-[320px] md:h-[340px] rounded-[3rem] overflow-hidden shadow-2xl z-10 brightness-50"
          >
            <img
              src="/Gallery/image31.jpeg"
              className="w-full h-full object-cover"
              alt="Right"
            />
          </div>

          {/* Center Card */}
          <div
            ref={centerCard}
            className="absolute w-[300px] h-[300px] md:w-[460px] md:h-[400px] rounded-[3rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)] z-20 border border-white/10"
          >
            <img
              src="/Gallery/image27.jpeg"
              className="w-full h-full object-cover"
              alt="Center"
            />
          </div>
        </div>
      </section>

     
    </div>
  );
};

export default AllInOneProduct;