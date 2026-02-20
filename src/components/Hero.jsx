"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  const words = ["Cool Products", "Good Stuff 😍", "Bold Ideas", "Real Impact"];
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  const marqueeRef = useRef(null);

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

  const logos = Array(16).fill("Logo");

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (marquee) {
      gsap.to(marquee, {
        x: "-50%",
        duration: 28,
        repeat: -1,
        ease: "linear",
      });
    }
  }, []);

  return (
    <section className="relative min-h-screen bg-black overflow-hidden flex items-start justify-center pt-28">
      {/* glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[radial-gradient(ellipse_at_center_top,rgba(80,60,180,0.18),transparent_65%)]" />

      {/* content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 w-full max-w-[1100px]">
        <p className="text-white text-[15px] font-medium mb-4">We’re Clixr</p>

        <h1 className="text-[clamp(56px,7vw,92px)] font-semibold leading-[0.95] tracking-[-2px] bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
          We make
        </h1>

        <h1
          className={`text-[clamp(56px,7vw,92px)] font-semibold leading-[1] tracking-[-2px] text-white transition-all duration-300 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
        >
          {words[index]}
        </h1>

        {/* logo strip behind button */}
        <div className="relative mt-14 flex items-center justify-center w-full">
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
            {/* fade edges */}
            <div className="absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-black to-transparent z-10" />
            <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-black to-transparent z-10" />

            {/* GSAP animated logos */}
            <div
              ref={marqueeRef}
              className="flex w-max gap-24 opacity-40"
              style={{ transform: "translateX(0%)" }}
            >
              {[...logos, ...logos].map((l, i) => (
                <span
                  key={i}
                  className="text-white/40 text-[18px] whitespace-nowrap"
                >
                  {l}
                </span>
              ))}
            </div>
          </div>

          {/* button */}
          <button className="relative z-20 w-[110px] h-[110px] rounded-full font-semibold text-white text-[15px] bg-gradient-to-br from-indigo-500 to-indigo-800 shadow-[0_0_60px_rgba(99,102,241,0.5),0_0_120px_rgba(99,102,241,0.2)] hover:scale-110 transition duration-300 animate-[float_4s_ease-in-out_infinite]">
            Get Clixr
          </button>
        </div>
      </div>

      {/* float animation */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </section>
  );
}
