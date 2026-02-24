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
    <section className="relative min-h-screen bg-black overflow-hidden flex items-start justify-center pt-28">

      <div className="relative z-10 flex flex-col items-center text-center px-4 w-full max-w-[1400px]">
        
      <p className="text-white text-[22px] font-medium mb-4">
  We’re{" "}
  <span className="relative inline-block px-1">
    Clixr
    {/* Exact Brush-style Curved Line */}
    <span 
      className="absolute left-0 -bottom-[2px] w-full h-[8px] opacity-90"
      style={{ 
        background: "radial-gradient(ellipse at center, #4ade80 0%, #22c55e 50%, transparent 100%)",
        borderRadius: "50% 50% 0 0 / 100% 100% 0 0",
        clipPath: "ellipse(55% 45% at 50% 100%)",
        filter: "blur(0.3px)"
      }}
    ></span>
  </span>
</p>


        {/* We make */}
        <h1 className="text-[clamp(60px,8vw,120px)] font-semibold leading-[0.95] tracking-[-2px] bg-gradient-to-b from-white to-[#bfbfbf] bg-clip-text text-transparent">
          We make
        </h1>

        {/* Animated word */}
        <h1
          className={`text-[clamp(60px,8vw,120px)] font-semibold leading-[1] tracking-[-2px] text-white transition-all duration-300 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
        >
          {words[index]}
        </h1>

        {/* Marquee + Button */}
        <div className="relative mt-16 flex items-center justify-center w-screen h-[150px]">
          
          <div className="absolute left-1/2 -translate-x-1/2 w-[200vw] overflow-hidden">
            <div className="marqueeTrack">
              
              <div className="marqueeGroup">
                {logos.map((l, i) => (
                  <span key={`a-${i}`} className="marqueeItem">
                    {l}
                  </span>
                ))}
              </div>

              <div className="marqueeGroup">
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
  className="relative z-20 w-[140px] h-[140px] rounded-full font-bold text-white text-[18px] 
  bg-gradient-to-br from-[#050565]  to-[#030118]
  hover:scale-105 transition-all duration-500 ease-in-out
  border-2 border-white/20 flex items-center justify-center"
  style={{
    animation: "float 6s ease-in-out infinite",
    boxShadow: `
      0 0 40px 5px rgba(93, 95, 239, 0.4), 
      inset 0 0 15px rgba(255, 255, 255, 0.2)
    `,
    textShadow: "0px 2px 4px rgba(0,0,0,0.3)"
  }}
>
  Get Clixr
</button>

        </div>
      </div>

      <style>{`
        @keyframes float {
          0%,100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }

       .marqueeTrack{
  display: flex;
  width: max-content;
  animation: marquee 60s linear infinite; /* pehle 22s tha */
}

        @keyframes marquee{
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        .marqueeGroup{
          display: flex;
          align-items: center;
          gap: 120px;
          padding-right: 120px;
        }

        .marqueeItem{
          color: rgba(255,255,255,0.55);
          white-space: nowrap;
          font-weight: 500;
          font-size: 26px;
        }

        @media (prefers-reduced-motion: reduce){
          .marqueeTrack{ animation: none; }
          button{ animation: none !important; }
        }
      `}</style>
    </section>
  );
}