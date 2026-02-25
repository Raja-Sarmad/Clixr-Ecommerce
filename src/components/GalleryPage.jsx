<<<<<<< HEAD
import React, { useEffect, useMemo, useRef, useState } from "react";
=======
// src/components/GalleryPage.jsx
import React, { useEffect, useMemo, useRef } from "react";
>>>>>>> c8497f578f22221fdedb4b7683130ab8b680ebf0

const GalleryPage = () => {
  const topRowRef = useRef(null);
  const trackX = useRef({ top: 0, bottom: 0 });
  const scrollYRef = useRef(0);
  const singleSetWidthRef = useRef(1);
  const rafRef = useRef(null);

  const images = useMemo(
    () => [
      "/Gallery/img1.jpg",
      "/Gallery/img2.jpg",
      "/Gallery/img3.jpg",
      "/Gallery/img4.jpg",
      "/Gallery/img5.jpg",
      "/Gallery/img6.jpg",
      "/Gallery/img7.jpg",
      "/Gallery/img8.jpg",
      "/Gallery/img9.jpg",
      "/Gallery/img10.jpg",
    ],
    []
  );

  const repeatedImages = useMemo(() => [...images, ...images, ...images], []);

  // ✅ Track scroll without re-render
  useEffect(() => {
    const onScroll = () => {
      scrollYRef.current = window.scrollY || 0;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ✅ Measure ONE set width using ResizeObserver (zoom-proof)
  useEffect(() => {
    const row = topRowRef.current;
    if (!row) return;

    const measure = () => {
      const cards = row.querySelectorAll("[data-card='true']");
      if (!cards || cards.length < images.length) return;

      const first = cards[0].getBoundingClientRect();
      const last = cards[images.length - 1].getBoundingClientRect();
      const w = last.right - first.left;

      if (Number.isFinite(w) && w > 0) singleSetWidthRef.current = w;
    };

    measure();

    const ro = new ResizeObserver(() => measure());
    ro.observe(row);

    // also re-measure after images settle
    const t = setTimeout(measure, 250);

    return () => {
      clearTimeout(t);
      ro.disconnect();
    };
  }, [images.length]);

  // ✅ Animate transforms smoothly (no React re-render jitter)
  useEffect(() => {
    const speed = 0.35; // base speed factor for scroll -> translate
    let lastScroll = window.scrollY || 0;

    const tick = () => {
      const row = topRowRef.current;
      if (!row) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      const w = singleSetWidthRef.current || 1;
      const curScroll = scrollYRef.current || 0;
      const delta = curScroll - lastScroll;
      lastScroll = curScroll;

      // ✅ scroll influence (nice feel)
      const boost = Math.max(-180, Math.min(180, delta * 2.0));

      // compute offset based on scroll
      const move = curScroll * (speed * 1.0);
      const offset = move % w;

      const topX = -offset - w;
      const bottomX = offset - w;

      trackX.current.top = topX;
      trackX.current.bottom = bottomX;

      // apply transforms
      const topTrack = row;
      topTrack.style.transform = `translate3d(${topX}px,0,0)`;

      // bottom row is next sibling with data-bottom
      const bottomTrack = row.parentElement?.querySelector("[data-bottom='true']");
      if (bottomTrack) {
        bottomTrack.style.transform = `translate3d(${bottomX}px,0,0)`;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div className="bg-[#050505] text-white -mt-30 sm:-mt-0 sm:min-h-[120vh] overflow-hidden rounded-b-[60px] sm:rounded-b-[80px]">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        {/* ✅ Responsive padding + spacing via Tailwind */}
        <div className="w-full px-4 sm:px-6 md:px-10 lg:px-12 space-y-3 sm:space-y-4 md:space-y-5">
          {/* Top Row */}
          <div
            ref={topRowRef}
            className="flex flex-nowrap will-change-transform gap-3 sm:gap-4 lg:gap-6 items-center"
            style={{ transform: "translate3d(0,0,0)" }}
          >
            {repeatedImages.map((src, i) => (
              <div
                key={`top-${i}`}
                data-card="true"
                className="
                  shrink-0 overflow-hidden shadow-2xl bg-black
                  w-[180px] h-[220px] rounded-[18px]
                  sm:w-[210px] sm:h-[250px] sm:rounded-[22px]
                  lg:w-[260px] lg:h-[250px] lg:rounded-[28px]
                "
                style={{
                  clipPath: "inset(0 round var(--r))",
                  // set per breakpoint radius using CSS var
                  // (Tailwind can't feed clipPath radius easily)
                  ["--r"]: "18px",
                }}
              >
                <img src={src} alt="" className="w-full h-full object-cover block" />
              </div>
            ))}
          </div>

          {/* Bottom Row */}
          <div
            data-bottom="true"
            className="flex flex-nowrap will-change-transform gap-3 sm:gap-4 lg:gap-6 items-center"
            style={{ transform: "translate3d(0,0,0)" }}
          >
            {repeatedImages.map((src, i) => (
              <div
                key={`bot-${i}`}
                data-card="true"
                className="
                  shrink-0 overflow-hidden shadow-2xl bg-black
                  w-[180px] h-[220px] rounded-[18px]
                  sm:w-[210px] sm:h-[250px] sm:rounded-[22px]
                  lg:w-[260px] lg:h-[250px] lg:rounded-[28px]
                "
                style={{
                  clipPath: "inset(0 round var(--r))",
                  ["--r"]: "18px",
                }}
              >
                <img src={src} alt="" className="w-full h-full object-cover block" />
              </div>
            ))}
          </div>

          <style>{`
            /* ✅ sync clipPath radius with breakpoints */
            @media (min-width: 640px){
              [data-card='true']{ --r: 22px; }
            }
            @media (min-width: 1024px){
              [data-card='true']{ --r: 28px; }
            }
          `}</style>
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;