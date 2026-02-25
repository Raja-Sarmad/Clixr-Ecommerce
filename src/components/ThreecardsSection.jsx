import React, { useRef, useEffect } from "react";

const ThreecardsSection = () => {
  const leftImageRef = useRef(null);
  const rightImageRef = useRef(null);
  const centerImageRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const section = document.getElementById("three-cards-section");
          if (!section) return;

          const rect = section.getBoundingClientRect();
          const viewportHeight = window.innerHeight;

          const scrollProgress = Math.min(
            1,
            Math.max(0, (viewportHeight - rect.top) / (viewportHeight + rect.height))
          );

          const isMobile = window.innerWidth < 768;

          // LEFT IMAGE
          if (leftImageRef.current) {
            const moveY = scrollProgress * 60 - 30;
            const rotate = isMobile ? -10 + scrollProgress * 10 : -15 + scrollProgress * 20;
            leftImageRef.current.style.transform = `translateY(${moveY}px) rotate(${rotate}deg)`;
          }

          // RIGHT IMAGE
          if (rightImageRef.current) {
            const moveY = isMobile ? (scrollProgress * 60 - 30) : (-scrollProgress * 80 + 40);
            const rotate = isMobile ? 10 - scrollProgress * 10 : 15 - scrollProgress * 20;
            rightImageRef.current.style.transform = `translateY(${moveY}px) rotate(${rotate}deg)`;
          }

          // CENTER IMAGE
          if (centerImageRef.current) {
            const moveY = isMobile ? scrollProgress * -40 : scrollProgress * -60;
            const scale = 1 + scrollProgress * 0.1;
            centerImageRef.current.style.transform = `translateY(${moveY}px) scale(${scale}) rotate(-2deg)`;
          }

          // TEXT
          if (textRef.current) {
            const moveY = scrollProgress * -20;
            textRef.current.style.transform = `translateY(${moveY}px)`;
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      id="three-cards-section"
      className="bg-black min-h-screen w-full flex flex-col items-center justify-start pt-16 md:pt-28 px-4 md:px-6 overflow-hidden"
    >
      {/* Container for Top Images (Side by side on mobile) */}
      <div className="w-full max-w-7xl flex flex-row items-start justify-between relative px-2 md:px-10">
        
        {/* Left Image */}
        <div
          ref={leftImageRef}
          className="w-40 h-40 sm:w-48 sm:h-48 md:w-72 md:h-72 rounded-[35px] md:rounded-[55px] overflow-hidden border border-white/5 shadow-2xl will-change-transform -translate-x-12 sm:-translate-x-0"
          style={{ transform: "rotate(-12deg)" }}
        >
          <img
            src="/Gallery/image7.jpeg"
            alt="left"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Image (Desktop par side mein, mobile par top-right) */}
        <div
          ref={rightImageRef}
          className="w-40 h-40 sm:w-48 sm:h-48 md:w-72 md:h-72 rounded-[35px] md:rounded-[55px] overflow-hidden border border-white/5 shadow-2xl will-change-transform translate-x-12 sm:translate-x-0"
          style={{ transform: "rotate(12deg)" }}
        >
          <img
            src="/Gallery/image17.jpeg"
            alt="right"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Text Section (Mobile par Images ke niche aayega) */}
      <div
        ref={textRef}
        className="flex flex-col items-center text-center mt-10 md:-mt-20 z-20"
      >
        <h1 className="text-white text-5xl sm:text-6xl md:text-9xl font-bold leading-tight md:leading-none tracking-tighter">
          Real
        </h1>
        <h1 className="text-[#555] text-5xl sm:text-6xl md:text-9xl font-bold leading-tight md:leading-none tracking-tighter">
          Potential
        </h1>

        <div className="mt-8 md:mt-12 flex items-center gap-4 group cursor-pointer">
          <span className="text-white text-base md:text-lg font-medium">Get Clixr</span>
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-green-400/30 flex items-center justify-center bg-gradient-to-br from-green-400/20 to-transparent group-hover:scale-110 transition-transform shadow-lg shadow-green-400/10">
            <svg
              className="w-5 h-5 md:w-7 md:h-7 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </div>
      </div>

      {/* Bottom Image (Sabse niche) */}
      <div className="mt-12 md:mt-24 relative z-10 pb-20">
        <div
          ref={centerImageRef}
          className="w-60 h-60 sm:w-72 sm:h-80 md:w-[400px] md:h-[400px] rounded-[40px] md:rounded-[60px] overflow-hidden border border-white/5 shadow-[0_0_50px_rgba(0,0,0,0.8)] will-change-transform"
        >
          <img
            src="/Gallery/image15.jpeg"
            alt="center"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
        </div>
      </div>
    </div>
  );
};

export default ThreecardsSection;