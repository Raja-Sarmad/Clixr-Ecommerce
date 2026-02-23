// src/components/Navbar.jsx
"use client";

import React, { useEffect, useState } from "react";

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
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        scrolled ? "bg-transparent" : "bg-black/85 backdrop-blur-md",
      ].join(" ")}
    >
      {/* same glow as hero (only when NOT scrolled) */}
      {!scrolled && (
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[180px] bg-[radial-gradient(ellipse_at_center_top,rgba(80,60,180,0.18),transparent_65%)]" />
      )}

      <div className="relative px-8 md:px-12 lg:px-16">
        <div className="max-w-[1440px] mx-auto h-[72px] flex items-center justify-between">
          {/* LEFT */}
          <div className="flex items-center gap-14">
            <div
              className={[
                "text-[22px] font-bold tracking-[-0.02em] cursor-pointer",
                scrolled ? "text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]" : "text-white",
              ].join(" ")}
            >
              Clixr
            </div>

            <div className="hidden md:flex items-center gap-9">
              {["About", "Pricing", "FAQ"].map((t) => (
                <a
                  key={t}
                  className={[
                    "text-[15px] font-medium transition-colors",
                    scrolled
                      ? "text-white/85 hover:text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]"
                      : "text-[#8f8f8f] hover:text-white",
                  ].join(" ")}
                >
                  {t}
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-7">
            {/* Cart */}
            <div
              className={[
                "relative cursor-pointer",
                scrolled ? "drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]" : "",
              ].join(" ")}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="1.5"
              >
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                <path d="M3 6h18" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>

              <span className="absolute -bottom-1 -right-2 bg-white text-black text-[10px] font-bold h-[16px] w-[16px] rounded-full flex items-center justify-center">
                0
              </span>
            </div>

            {/* CTA */}
            <button
              className={[
                "relative rounded-full p-[1px] transition-transform duration-200 hover:scale-[1.02]",
                scrolled ? "drop-shadow-[0_10px_30px_rgba(0,0,0,0.55)]" : "",
              ].join(" ")}
            >
              {/* when scrolled: keep CTA visible but no background panel */}
              <span
                className={[
                  "absolute inset-0 rounded-full blur-[6px] opacity-60 bg-gradient-to-r from-[#1e1e1e] via-[#2d2d2d] to-[#58c27d]",
                  scrolled ? "opacity-45" : "opacity-60",
                ].join(" ")}
              />
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-white/10 to-white/10" />

              <span className="relative inline-flex items-center justify-center rounded-full px-8 py-[12px] border border-white/15 bg-gradient-to-r from-black/0 via-black/0 to-[#58c27d]/90 hover:to-[#58c27d] transition">
                <span className="text-white font-semibold text-[14px] tracking-[-0.01em]">
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