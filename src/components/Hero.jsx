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

  const logos = useMemo(() => Array(30).fill("Logo"), []);

  return (
    <section className="relative h-auto md:min-h-screen bg-black overflow-hidden flex items-start justify-center pt-20 md:pt-28 pb-10 md:pb-0">
      <div className="relative z-10 flex flex-col items-center text-center px-4 w-full max-w-[1400px]">
        
        <p className="text-white text-[18px] md:text-[22px] font-medium mb-4">
          By{" "}
          <span className="relative inline-block px-1">
            Ali Mehdi
            {/* UPDATED: Green line changed to matching Blue/Teal Glow */}
            <span 
              className="absolute left-0 -bottom-[2px] w-full h-[8px] opacity-90"
              style={{ 
                background: "radial-gradient(ellipse at center, #0b6472 0%, #022227 70%, transparent 100%)",
                borderRadius: "50% 50% 0 0 / 100% 100% 0 0",
                clipPath: "ellipse(55% 45% at 50% 100%)",
                filter: "blur(0.5px)"
              }}
            ></span>
          </span>
        </p>

        <h1 className="text-[55px] md:text-[clamp(60px,8vw,120px)] font-semibold leading-[1] md:leading-[0.95] tracking-[-1px] md:tracking-[-2px] bg-gradient-to-b from-white to-[#bfbfbf] bg-clip-text text-transparent">
          We make
        </h1>

        <h1 className={`text-[55px] md:text-[clamp(60px,8vw,120px)] font-semibold leading-[1] tracking-[-1px] md:tracking-[-2px] text-white transition-all duration-300 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}>
          {words[index]}
        </h1>

        <div className="relative mt-10 md:mt-16 flex items-center justify-center w-screen h-[120px] md:h-[150px]">
          <div className="absolute left-1/2 -translate-x-1/2 w-[200vw] overflow-hidden opacity-30">
            <div className="marqueeTrack">
              <div className="marqueeGroup">
                {logos.map((l, i) => <span key={`a-${i}`} className="marqueeItem">{l}</span>)}
              </div>
              <div className="marqueeGroup">
                {logos.map((l, i) => <span key={`b-${i}`} className="marqueeItem">{l}</span>)}
              </div>
            </div>
          </div>

          <button
            className="relative z-20 w-[110px] h-[110px] md:w-[140px] md:h-[140px] rounded-full font-bold text-white text-[15px] md:text-[18px] 
            bg-gradient-to-br from-[#0b6472] to-[#022227] border-2 border-white/20 flex items-center justify-center 
            shadow-[0_0_40px_rgba(11,100,114,0.7)]"
            style={{ animation: "float 6s ease-in-out infinite" }}
          >
            Get Clixr
          </button>
        </div>
      </div>

      <style>{`
        @keyframes float { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
        .marqueeTrack { display: flex; width: max-content; animation: marquee 60s linear infinite; }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .marqueeGroup { display: flex; align-items: center; gap: 60px; md:gap: 120px; padding-right: 60px; }
        .marqueeItem { color: rgba(255,255,255,0.55); white-space: nowrap; font-size: 20px; md:font-size: 26px; }
      `}</style>
    </section>
  );
}