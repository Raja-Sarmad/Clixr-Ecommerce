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

          // LEFT IMAGE
          if (leftImageRef.current) {
            const moveY = scrollProgress * 80 - 40;
            const rotate = -15 + scrollProgress * 20;
            leftImageRef.current.style.transform =
              `translateY(${moveY}px) rotate(${rotate}deg)`;
          }

          // RIGHT IMAGE
          if (rightImageRef.current) {
            const moveY = -scrollProgress * 80 + 40;
            const rotate = 15 - scrollProgress * 20;
            rightImageRef.current.style.transform =
              `translateY(${moveY}px) rotate(${rotate}deg)`;
          }

          // CENTER IMAGE
          if (centerImageRef.current) {
            const moveY = scrollProgress * -60;
            const scale = 1 + scrollProgress * 0.15;
            centerImageRef.current.style.transform =
              `translateY(${moveY}px) scale(${scale}) rotate(-3deg)`;
          }

          // TEXT
          if (textRef.current) {
            const opacity = 1 - scrollProgress * 0.4;
            const moveY = scrollProgress * -30;
            textRef.current.style.transform = `translateY(${moveY}px)`;
            textRef.current.style.opacity = opacity;
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
      className="bg-black min-h-screen w-full flex flex-col items-center justify-start pt-20 px-6 overflow-hidden"
    >
      <div className="w-full max-w-7xl flex items-start justify-between relative px-10">

        {/* Left Image */}
        <div
          ref={leftImageRef}
          className="w-48 h-48 md:w-72 md:h-72 rounded-[55px] overflow-hidden border border-white/5 shadow-2xl transition-transform duration-300 ease-out"
          style={{ transform: "rotate(-15deg) translateY(-40px)" }}
        >
          <img
            src="https://cdn.prod.website-files.com/64a6caa646429ed756eb2d03/64a6cdff000962bbfb4a9cd5_sc3.jpg"
            alt="left"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Text */}
        <div
          ref={textRef}
          className="flex flex-col items-center text-center pt-10 transition-all duration-300 ease-out"
        >
          <h1 className="text-white text-6xl md:text-8xl font-bold leading-none tracking-tight">
            Real
          </h1>
          <h1 className="text-[#555] text-6xl md:text-8xl font-bold leading-none tracking-tight">
            Potential
          </h1>

          <div className="mt-12 flex items-center gap-5 group cursor-pointer">
            <span className="text-white text-lg font-medium">Get Clixr</span>
            <div className="w-16 h-16 rounded-full border border-green-400/30 flex items-center justify-center bg-gradient-to-br from-green-400/20 to-transparent shadow-[0_0_20px_rgba(74,222,128,0.2)] group-hover:scale-110 transition-transform">
              <svg
                className="w-7 h-7 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div
          ref={rightImageRef}
          className="w-48 h-48 md:w-72 md:h-72 rounded-[55px] overflow-hidden border border-white/5 shadow-2xl transition-transform duration-300 ease-out"
          style={{ transform: "rotate(15deg) translateY(40px)" }}
        >
          <img
            src="https://cdn.prod.website-files.com/64a6caa646429ed756eb2d03/64a6cdff000962bbfb4a9ccb_sc1.jpg"
            alt="right"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Center Image */}
      <div className="mt-24 md:mt-32 relative z-10">
        <div
          ref={centerImageRef}
          className="w-64 h-80 md:w-72 md:h-72 rounded-[55px] overflow-hidden border border-white/5 shadow-2xl transition-transform duration-300 ease-out"
        >
          <img
            src="https://cdn.prod.website-files.com/64a6caa646429ed756eb2d03/64a6cdff000962bbfb4a9cd0_main.jpg"
            alt="center"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
        </div>
      </div>
    </div>
  );
};

export default ThreecardsSection;