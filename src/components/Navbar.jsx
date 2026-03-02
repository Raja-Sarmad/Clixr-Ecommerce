// src/components/Navbar.jsx
"use client";

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BiShoppingBag } from "react-icons/bi";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // ✅ cart count from context
  const { cartCount } = useCart();

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

  const closeMenu = () => setMenuOpen(false);

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
            {/* LOGO */}
            <Link to="/paintings" onClick={closeMenu}>
              <img
                src="/Gallery/artlogo.png"
                alt="Art Logo"
                className={`h-[50px] sm:h-[50px] lg:h-[60px] w-auto pt-2 object-contain transition-all duration-300 ${
                  scrolled ? "drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]" : ""
                }`}
              />
            </Link>

            {/* Desktop links */}
            <div className="hidden lg:flex items-center gap-10 xl:gap-14">
              <Link to="/paintings" className={[linkBase, linkColor].join(" ")}>
                Paintings
              </Link>
              <span className={[linkBase, linkColor].join(" ")}>About</span>
              <span className={[linkBase, linkColor].join(" ")}>Pricing</span>
              <span className={[linkBase, linkColor].join(" ")}>FAQ</span>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Desktop right */}
            <div className="hidden sm:flex items-center gap-3 sm:gap-4">
              {/* ✅ Cart Icon (Desktop) */}
              <Link
                to="/cart"
                className={[
                  "relative cursor-pointer transition-transform duration-300 hover:scale-110",
                  scrolled ? "drop-shadow-[0_4px_20px_rgba(0,0,0,0.85)]" : "",
                ].join(" ")}
                aria-label="Open cart"
              >
                <BiShoppingBag size={28} className="text-white" />
                <span className="absolute -bottom-1 -right-1 bg-white text-black text-[11px] font-bold h-[18px] w-[18px] rounded-full flex items-center justify-center shadow-md">
                  {cartCount || 0}
                </span>
              </Link>

              {/* Contact Us Button Desktop */}
              <button
                className={[
                  "relative rounded-full p-[1px] transition-all duration-300 hover:scale-[1.05] group",
                  scrolled ? "drop-shadow-[0_12px_40px_rgba(0,0,0,0.6)]" : "",
                ].join(" ")}
              >
                <span className="absolute inset-0 rounded-full blur-[10px] opacity-60 bg-gradient-to-r from-[#0b6472] to-[#022227]" />
                <span className="relative inline-flex items-center justify-center rounded-full px-5 md:px-7 py-[12px] md:py-[16px] border border-white/20 bg-gradient-to-br from-[#0b6472] to-[#022227] shadow-[0_0_25px_rgba(11,100,114,0.5)] group-hover:shadow-[0_0_35px_rgba(11,100,114,0.8)] transition-all duration-300">
                  <span className="text-white font-bold text-[14px] md:text-[16px] tracking-wider uppercase">
                    Contact Us
                  </span>
                </span>
              </button>
            </div>

            {/* Mobile right */}
            <div className="flex sm:hidden items-center gap-3">
              {/* ✅ Cart Icon (Mobile) */}
              <Link
                to="/cart"
                className="relative text-white/90 hover:text-white transition active:scale-95"
                aria-label="Open cart"
              >
                <BiShoppingBag size={26} className="text-white" />
                <span className="absolute -bottom-1 -right-1 bg-white text-black text-[10px] font-bold h-[16px] w-[16px] rounded-full flex items-center justify-center shadow-md">
                  {cartCount || 0}
                </span>
              </Link>

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
          menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        ].join(" ")}
      >
        <div
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={closeMenu}
        />

        <div
          className={[
            "absolute right-0 top-0 h-full w-[86%] max-w-[360px] bg-[#0b0b0b] border-l border-white/10",
            "transition-transform duration-300",
            menuOpen ? "translate-x-0" : "translate-x-full",
          ].join(" ")}
        >
          <div className="px-5 pt-5 pb-4 flex items-center justify-between">
            <Link to="/paintings" onClick={closeMenu}>
              <img
                src="/Gallery/artlogo.png"
                alt="Art Logo"
                className="h-[50px] w-auto object-contain"
              />
            </Link>

            <button
              onClick={closeMenu}
              className="text-white/80 hover:text-white transition active:scale-95"
              aria-label="Close menu"
            >
              <IoClose size={28} />
            </button>
          </div>

          <div className="px-5 py-3 flex flex-col gap-3">
            <Link
              to="/paintings"
              onClick={closeMenu}
              className="text-white/85 hover:text-white text-[18px] font-medium py-3 border-b border-white/10"
            >
              Paintings
            </Link>
            <span className="text-white/85 hover:text-white text-[18px] font-medium py-3 border-b border-white/10">
              About
            </span>
            <span className="text-white/85 hover:text-white text-[18px] font-medium py-3 border-b border-white/10">
              Pricing
            </span>
            <span className="text-white/85 hover:text-white text-[18px] font-medium py-3 border-b border-white/10">
              FAQ
            </span>

            {/* ✅ Cart inside mobile menu */}
            <Link
              to="/cart"
              onClick={closeMenu}
              className="text-white/85 hover:text-white text-[18px] font-medium py-3 border-b border-white/10 flex items-center justify-between"
            >
              <span>Cart</span>
              <span className="bg-white text-black text-[11px] font-bold h-[18px] min-w-[18px] px-1 rounded-full flex items-center justify-center shadow-md">
                {cartCount || 0}
              </span>
            </Link>

            {/* Contact Us Mobile */}
            <button className="relative w-full rounded-full p-[1px] mt-2 transition-all duration-300 active:scale-[0.97] group">
              <span className="absolute inset-0 rounded-full blur-[12px] opacity-60 bg-gradient-to-r from-[#0b6472] to-[#022227]" />
              <span className="relative inline-flex w-full items-center justify-center rounded-full px-6 py-[16px] border border-white/20 bg-gradient-to-br from-[#0b6472] to-[#022227] shadow-[0_0_30px_rgba(11,100,114,0.5)] group-hover:shadow-[0_0_45px_rgba(11,100,114,0.8)] transition-all duration-300">
                <span className="text-white font-black text-[16px] tracking-widest uppercase">
                  Contact Us
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