// src/components/Navbar.jsx
"use client";

import React, { useEffect, useState } from "react";
import { BiShoppingBag } from "react-icons/bi";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={[
        "fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-out",
        scrolled ? "bg-transparent" : "bg-black/85 backdrop-blur-md",
      ].join(" ")}
    >
      {/* Top Glow (only when NOT scrolled) */}
      {!scrolled && (
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[200px] bg-[radial-gradient(ellipse_at_center_top,rgba(80,60,180,0.18),transparent_65%)] animate-pulse" />
      )}

      {/* Content */}
      <div className="relative px-16 md:px-24 lg:px-32">
        <div className="max-w-[1600px] mx-auto h-[88px] flex items-center justify-between">

          {/* LEFT */}
          <div className="flex items-center gap-20">
            <div
              className={[
                "text-[30px] font-bold tracking-[-0.02em] cursor-pointer transition-all duration-300",
                scrolled
                  ? "text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]"
                  : "text-white",
              ].join(" ")}
            >
              Clixr
            </div>

            <div className="hidden md:flex items-center gap-14">
              {["About", "Pricing", "FAQ"].map((t) => (
                <a
                  key={t}
                  className={[
                    "text-[18px] font-medium transition-all duration-300 hover:text-white hover:scale-105",
                    scrolled
                      ? "text-white/85 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]"
                      : "text-[#8f8f8f]",
                  ].join(" ")}
                >
                  {t}
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT (Shifted slightly left) */}
          <div className="flex items-center gap-4 ml-[-10px]">
            {/* Shopping Bag Icon */}
            <div
              className={[
                "relative cursor-pointer transition-transform duration-300 hover:scale-110",
                scrolled ? "drop-shadow-[0_4px_20px_rgba(0,0,0,0.85)]" : "",
              ].join(" ")}
            >
              <BiShoppingBag size={30} className="text-white" />
              <span className="absolute -bottom-1 -right-1 bg-white text-black text-[11px] font-bold h-[19px] w-[19px] rounded-full flex items-center justify-center shadow-md">
                0
              </span>
            </div>

            {/* CTA Button */}
            <button
              className={[
                "relative rounded-full p-[1px] transition-all duration-300 hover:scale-[1.05]",
                scrolled
                  ? "drop-shadow-[0_12px_40px_rgba(0,0,0,0.6)]"
                  : "",
              ].join(" ")}
            >
              {/* Outer Glow */}
              <span className="absolute inset-0 rounded-full blur-[8px] opacity-70 bg-gradient-to-r from-[#1e1e1e] via-[#2d2d2d] to-[#58c27d]" />

              {/* Button Content */}
              <span className="relative inline-flex items-center justify-center rounded-full px-8 py-[22px] border border-white/20 bg-gradient-to-r from-black/10 via-black/10 to-[#58c27d] hover:to-[#4ade80] transition-all duration-300">
                <span className="text-white font-semibold text-[16px] tracking-[-0.01em]">
                  Copy This Site
                </span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;