"use client";

import { useEffect, useMemo, useState } from "react";

export default function Hero() {
  const words = ["Cool Products", "Good Stuff 😍", "Bold Ideas", "Real Impact"];
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((p) => (p + 1) % words.length);
        setVisible(true);
      }, 250);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const logos = useMemo(() => Array(20).fill("Logo"), []);

  return (
    <section className="relative min-h-screen bg-black overflow-hidden flex items-start justify-center pt-24 sm:pt-28">
      {/* glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[520px] sm:w-[720px] lg:w-[900px] h-[340px] sm:h-[440px] lg:h-[520px] bg-[radial-gradient(ellipse_at_center_top,rgba(80,60,180,0.18),transparent_65%)]" />

      {/* content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 sm:px-6 w-full max-w-[1100px]">
        <p className="text-white text-[16px] sm:text-[20px] lg:text-[25px] font-medium mb-3 sm:mb-4">
          We're Clixr
        </p>

        <h1 className="text-[clamp(40px,8vw,92px)] font-semibold leading-[0.95] tracking-[-2px] bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
          We make
        </h1>

        <h1
          className={`text-[clamp(40px,8vw,92px)] font-semibold leading-[1] tracking-[-2px] text-white transition-all duration-300 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
        >
          {words[index]}
        </h1>

        {/* Marquee + Button */}
        <div className="relative mt-10 sm:mt-14 flex items-center justify-center w-full h-[112px] sm:h-[130px]">
          {/* ✅ Marquee container (no blur, only fade with mask) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden marqueeMask">
            {/* ✅ Track (2 identical groups) — CSS infinite, NO BREAK */}
            <div className="marqueeTrack">
              <div className="marqueeGroup" aria-hidden="true">
                {logos.map((l, i) => (
                  <span key={`a-${i}`} className="marqueeItem">
                    {l}
                  </span>
                ))}
              </div>

              <div className="marqueeGroup" aria-hidden="true">
                {logos.map((l, i) => (
                  <span key={`b-${i}`} className="marqueeItem">
                    {l}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Button */}
          <button
            className="relative z-20 w-[96px] h-[96px] sm:w-[120px] sm:h-[120px] lg:w-[130px] lg:h-[130px] rounded-full font-semibold text-white text-[13px] sm:text-[15px] lg:text-[16px] bg-gradient-to-br from-indigo-500 to-indigo-800 shadow-[0_0_60px_rgba(99,102,241,0.5),0_0_120px_rgba(99,102,241,0.2)] hover:scale-110 transition duration-300"
            style={{ animation: "float 4s ease-in-out infinite" }}
          >
            Get Clixr
          </button>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-8px); }
        }

        /* ✅ Edge fade (NOT blur) */
        .marqueeMask{
          -webkit-mask-image: linear-gradient(to right, transparent, black 12%, black 88%, transparent);
          mask-image: linear-gradient(to right, transparent, black 12%, black 88%, transparent);
        }

        /* ✅ Seamless infinite scroll */
        .marqueeTrack{
          display: flex;
          width: max-content;
          will-change: transform;
          transform: translate3d(0,0,0);
          animation: marquee 28s linear infinite; /* ✅ slightly slower */
        }

        @keyframes marquee{
          from { transform: translate3d(0,0,0); }
          to   { transform: translate3d(-50%,0,0); }
        }

        .marqueeGroup{
          display: flex;
          align-items: center;
          gap: 44px;              /* ✅ responsive gap default */
          padding-right: 44px;
        }

        /* ✅ responsive gap + size */
        @media (min-width: 640px){
          .marqueeGroup{ gap: 70px; padding-right: 70px; }
        }
        @media (min-width: 1024px){
          .marqueeGroup{ gap: 90px; padding-right: 90px; }
        }

        .marqueeItem{
          color: rgba(255,255,255,0.45);
          white-space: nowrap;
          font-weight: 500;
          font-size: 16px;        /* ✅ mobile smaller */
          filter: none;
          backface-visibility: hidden;
          -webkit-font-smoothing: antialiased;
        }
        @media (min-width: 640px){
          .marqueeItem{ font-size: 20px; }
        }
        @media (min-width: 1024px){
          .marqueeItem{ font-size: 24px; }
        }

        /* Accessibility: respect reduced motion */
        @media (prefers-reduced-motion: reduce){
          .marqueeTrack{ animation: none; }
          button{ animation: none !important; }
        }
      `}</style>
    </section>
  );
}