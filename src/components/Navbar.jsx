// src/components/Navbar.jsx
"use client";

import React, { useEffect, useState } from "react";
import { BiShoppingBag } from "react-icons/bi";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const linkBase =
    "text-[18px] font-medium transition-all duration-300 hover:text-white hover:scale-105";
  const linkColor = scrolled
    ? "text-white/85 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]"
    : "text-[#8f8f8f]";

  return (
    <nav
      className={[
        "fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-out",
        scrolled ? "bg-transparent" : "bg-black/85 backdrop-blur-md",
      ].join(" ")}
    >
      {!scrolled && (
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[200px] bg-[radial-gradient(ellipse_at_center_top,rgba(80,60,180,0.18),transparent_65%)] animate-pulse" />
      )}

      <div className="relative px-5 sm:px-8 md:px-14 lg:px-20">
        <div className="max-w-[1600px] mx-auto h-[76px] sm:h-[82px] lg:h-[88px] flex items-center justify-between">
          
          {/* LEFT */}
          <div className="flex items-center gap-4 sm:gap-8 lg:gap-20">
            
            {/* LOGO (Replaced Clixr text) */}
            <div className="cursor-pointer transition-all duration-300">
              <img
                src="/Gallery/artlogo.png"
                alt="Art Logo"
                className={`h-[50px] sm:h-[50px] lg:h-[60px] w-auto pt-2 object-contain transition-all duration-300 ${
                  scrolled
                    ? "drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]"
                    : ""
                }`}
              />
            </div>

            {/* Desktop links */}
            <div className="hidden lg:flex items-center gap-10 xl:gap-14">
              {["About", "Pricing", "FAQ"].map((t) => (
                <a key={t} className={[linkBase, linkColor].join(" ")}>
                  {t}
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="hidden sm:flex items-center gap-3 sm:gap-4">
              <div
                className={[
                  "relative cursor-pointer transition-transform duration-300 hover:scale-110",
                  scrolled
                    ? "drop-shadow-[0_4px_20px_rgba(0,0,0,0.85)]"
                    : "",
                ].join(" ")}
              >
                <BiShoppingBag size={28} className="text-white" />
                <span className="absolute -bottom-1 -right-1 bg-white text-black text-[11px] font-bold h-[18px] w-[18px] rounded-full flex items-center justify-center shadow-md">
                  0
                </span>
              </div>

              <button
                className={[
                  "relative rounded-full p-[1px] transition-all duration-300 hover:scale-[1.05]",
                  scrolled
                    ? "drop-shadow-[0_12px_40px_rgba(0,0,0,0.6)]"
                    : "",
                ].join(" ")}
              >
                <span className="absolute inset-0 rounded-full blur-[8px] opacity-70 bg-gradient-to-r from-[#1e1e1e] via-[#2d2d2d] to-[#58c27d]" />
                <span className="relative inline-flex items-center justify-center rounded-full px-5 md:px-7 py-[14px] md:py-[18px] border border-white/20 bg-gradient-to-r from-black/10 via-black/10 to-[#58c27d] hover:to-[#4ade80] transition-all duration-300">
                  <span className="text-white font-semibold text-[14px] md:text-[16px] tracking-[-0.01em]">
                    Copy This Site
                  </span>
                </span>
                
              </button>
            </div>

            {/* Mobile right */}
            <div className="flex sm:hidden items-center gap-3">
              <div
                className={[
                  "relative cursor-pointer transition-transform duration-300 active:scale-95",
                  scrolled
                    ? "drop-shadow-[0_4px_20px_rgba(0,0,0,0.85)]"
                    : "",
                ].join(" ")}
              >
                <BiShoppingBag size={26} className="text-white" />
                <span className="absolute -bottom-1 -right-1 bg-white text-black text-[10px] font-bold h-[17px] w-[17px] rounded-full flex items-center justify-center shadow-md">
                  0
                </span>
              </div>

              <button
                onClick={() => setMenuOpen(true)}
                className="text-white/90 hover:text-white transition active:scale-95"
                aria-label="Open menu"
              >
                <HiMenuAlt3 size={28} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={[
          "fixed inset-0 z-[60] lg:hidden transition-all duration-300",
          menuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        ].join(" ")}
      >
        <div
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        />

        <div
          className={[
            "absolute right-0 top-0 h-full w-[86%] max-w-[360px] bg-[#0b0b0b] border-l border-white/10",
            "transition-transform duration-300",
            menuOpen ? "translate-x-0" : "translate-x-full",
          ].join(" ")}
        >
          <div className="px-5 pt-5 pb-4 flex items-center justify-between">
            
            {/* Mobile Logo */}
            <img
              src="/gallery/artlogo.png"
              alt="Art Logo"
              className="h-[32px] w-auto object-contain"
            />

            <button
              onClick={() => setMenuOpen(false)}
              className="text-white/80 hover:text-white transition active:scale-95"
              aria-label="Close menu"
            >
              <IoClose size={28} />
            </button>
          </div>

          <div className="px-5 py-3">
            <div className="flex flex-col gap-3">
              {["About", "Pricing", "FAQ"].map((t) => (
                <a
                  key={t}
                  onClick={() => setMenuOpen(false)}
                  className="text-white/85 hover:text-white transition text-[18px] font-medium py-3 border-b border-white/10"
                >
                  {t}
                </a>
              ))}
            </div>

            <div className="mt-6">
              <button
                onClick={() => setMenuOpen(false)}
                className="relative w-full rounded-full p-[1px] transition-all duration-300 active:scale-[0.99]"
              >
                <span className="absolute inset-0 rounded-full blur-[10px] opacity-70 bg-gradient-to-r from-[#1e1e1e] via-[#2d2d2d] to-[#58c27d]" />
                <span className="relative inline-flex w-full items-center justify-center rounded-full px-6 py-[16px] border border-white/20 bg-gradient-to-r from-black/10 via-black/10 to-[#58c27d] hover:to-[#4ade80] transition-all duration-300">
                  <span className="text-white font-semibold text-[15px] tracking-[-0.01em]">
                    Copy This Site
                  </span>
                </span>
              </button>

              <p className="mt-4 text-white/50 text-[13px] leading-relaxed">
                Menu closes automatically on scroll/resize and backdrop click.
              </p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;