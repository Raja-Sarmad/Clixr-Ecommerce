import React, { useEffect, useMemo, useRef, useState } from "react";

const GalleryPage = () => {
  const topRowRef = useRef(null);
  const trackX = useRef({ top: 0, bottom: 0 });
  const scrollYRef = useRef(0);
  const singleSetWidthRef = useRef(1);
  const rafRef = useRef(null);

  // ✅ Upar wali row ki images
  const topImages = useMemo(
    () => [
      "/Gallery/image14.jpeg",
      "/Gallery/image22.jpeg",
      "/Gallery/image23.jpeg",
      "/Gallery/image24.jpeg",
      "/Gallery/image15.jpeg",
      "/Gallery/image16.jpeg",
      "/Gallery/image17.jpeg",
      "/Gallery/image27.jpeg",
      "/Gallery/image31.jpeg",
      "/Gallery/image1.jpeg",
    ],
    []
  );

  // ✅ Neeche wali row ki alag images (Aap yahan apni marzi ki images add kar sakte hain)
  const bottomImages = useMemo(
    () => [
      "/Gallery/image2.jpeg",
      "/Gallery/image3.jpeg",
      "/Gallery/image4.jpeg",
      "/Gallery/image5.jpeg",
      "/Gallery/image6.jpeg",
      "/Gallery/image7.jpeg",
      "/Gallery/image8.jpeg",
      "/Gallery/image9.jpeg",
      "/Gallery/image10.jpeg",
      "/Gallery/image11.jpeg",
    ],
    []
  );

  const repeatedTopImages = useMemo(() => [...topImages, ...topImages, ...topImages], [topImages]);
  const repeatedBottomImages = useMemo(() => [...bottomImages, ...bottomImages, ...bottomImages], [bottomImages]);

  useEffect(() => {
    const onScroll = () => {
      scrollYRef.current = window.scrollY || 0;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const row = topRowRef.current;
    if (!row) return;

    const measure = () => {
      const cards = row.querySelectorAll("[data-card='true']");
      // Top row ki measurement use kar rahe hain
      if (!cards || cards.length < topImages.length) return;

      const first = cards[0].getBoundingClientRect();
      const last = cards[topImages.length - 1].getBoundingClientRect();
      const w = last.right - first.left;

      if (Number.isFinite(w) && w > 0) singleSetWidthRef.current = w;
    };

    measure();
    const ro = new ResizeObserver(() => measure());
    ro.observe(row);
    const t = setTimeout(measure, 250);

    return () => {
      clearTimeout(t);
      ro.disconnect();
    };
  }, [topImages.length]);

  useEffect(() => {
    const speed = 0.35;
    let lastScroll = window.scrollY || 0;

    const tick = () => {
      const row = topRowRef.current;
      if (!row) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      const w = singleSetWidthRef.current || 1;
      const curScroll = scrollYRef.current || 0;
      lastScroll = curScroll;

      const move = curScroll * (speed * 1.0);
      const offset = move % w;

      const topX = -offset - w;
      const bottomX = offset - w;

      trackX.current.top = topX;
      trackX.current.bottom = bottomX;

      row.style.transform = `translate3d(${topX}px,0,0)`;

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
        <div className="w-full px-4 sm:px-6 md:px-10 lg:px-12 space-y-3 sm:space-y-4 md:space-y-5">
          
          {/* Top Row - Uses repeatedTopImages */}
          <div
            ref={topRowRef}
            className="flex flex-nowrap will-change-transform gap-3 sm:gap-4 lg:gap-6 items-center"
            style={{ transform: "translate3d(0,0,0)" }}
          >
            {repeatedTopImages.map((src, i) => (
              <div
                key={`top-${i}`}
                data-card="true"
                className="shrink-0 overflow-hidden shadow-2xl bg-black w-[180px] h-[220px] rounded-[18px] sm:w-[210px] sm:h-[250px] sm:rounded-[22px] lg:w-[260px] lg:h-[250px] lg:rounded-[28px]"
                style={{ clipPath: "inset(0 round var(--r))", ["--r"]: "18px" }}
              >
                <img src={src} alt="" className="w-full h-full object-cover block" />
              </div>
            ))}
          </div>

          {/* Bottom Row - Uses repeatedBottomImages */}
          <div
            data-bottom="true"
            className="flex flex-nowrap will-change-transform gap-3 sm:gap-4 lg:gap-6 items-center"
            style={{ transform: "translate3d(0,0,0)" }}
          >
            {repeatedBottomImages.map((src, i) => (
              <div
                key={`bot-${i}`}
                data-card="true"
                className="shrink-0 overflow-hidden shadow-2xl bg-black w-[180px] h-[220px] rounded-[18px] sm:w-[210px] sm:h-[250px] sm:rounded-[22px] lg:w-[260px] lg:h-[250px] lg:rounded-[28px]"
                style={{ clipPath: "inset(0 round var(--r))", ["--r"]: "18px" }}
              >
                <img src={src} alt="" className="w-full h-full object-cover block" />
              </div>
            ))}
          </div>

          <style>{`
            @media (min-width: 640px){ [data-card='true']{ --r: 22px; } }
            @media (min-width: 1024px){ [data-card='true']{ --r: 28px; } }
          `}</style>
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;