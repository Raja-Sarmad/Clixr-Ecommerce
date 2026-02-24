// src/components/GalleryPage.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";

const GalleryPage = () => {
  const [scrollY, setScrollY] = useState(0);
  const [singleSetWidth, setSingleSetWidth] = useState(1);
  const topRowRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const images = [
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
  ];

  const repeatedImages = useMemo(() => [...images, ...images, ...images], []);

  useEffect(() => {
    const measure = () => {
      const row = topRowRef.current;
      if (!row) return;

      const cards = row.querySelectorAll("[data-card='true']");
      if (!cards || cards.length < images.length) return;

      const first = cards[0].getBoundingClientRect();
      const last = cards[images.length - 1].getBoundingClientRect();
      const width = last.right - first.left;

      if (Number.isFinite(width) && width > 0) {
        setSingleSetWidth(width);
      }
    };

    measure();
    window.addEventListener("resize", measure);
    const t = setTimeout(measure, 200);

    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", measure);
    };
  }, [images.length]);

  const getTranslateX = (direction = 1) => {
    const speed = 0.35;
    const move = scrollY * speed;
    const offset = move % singleSetWidth;

    return direction === 1
      ? -offset - singleSetWidth
      : offset - singleSetWidth;
  };

  const cardRadius = 28;

  return (
    <div className="bg-[#050505] text-white min-h-[100vh] overflow-hidden rounded-b-[60px] sm:rounded-b-[80px]">

      {/* 🔥 EXTREME CHIPKA / HERO KE SAATH MERGE */}
      <div className="sticky -top-44 h-screen flex items-start pt-0 sm:pt-0 overflow-hidden">

        <div className="w-full px-4 sm:px-8 lg:px-12 space-y-6 sm:space-y-8">

          {/* Top Row */}
          <div
            ref={topRowRef}
            className="flex flex-nowrap gap-4 sm:gap-6 will-change-transform"
            style={{ transform: `translate3d(${getTranslateX(1)}px,0,0)` }}
          >
            {repeatedImages.map((src, i) => (
              <div
                key={i}
                data-card="true"
                className="
                  min-w-[180px] h-[160px]
                  sm:min-w-[220px] sm:h-[200px]
                  md:min-w-[240px] md:h-[220px]
                  lg:min-w-[260px] lg:h-[250px]
                  overflow-hidden bg-black shadow-2xl
                "
                style={{
                  borderRadius: `${cardRadius}px`,
                  WebkitMaskImage: "-webkit-radial-gradient(white, black)",
                }}
              >
                <img
                  src={src}
                  alt=""
                  className="w-full h-full object-cover"
                  style={{ borderRadius: `${cardRadius}px` }}
                />
              </div>
            ))}
          </div>

          {/* Bottom Row */}
          <div
            className="flex flex-nowrap gap-4 sm:gap-6 will-change-transform"
            style={{ transform: `translate3d(${getTranslateX(-1)}px,0,0)` }}
          >
            {repeatedImages.map((src, i) => (
              <div
                key={i}
                className="
                  min-w-[180px] h-[160px]
                  sm:min-w-[220px] sm:h-[200px]
                  md:min-w-[240px] md:h-[220px]
                  lg:min-w-[260px] lg:h-[250px]
                  overflow-hidden bg-black shadow-2xl
                "
                style={{
                  borderRadius: `${cardRadius}px`,
                  WebkitMaskImage: "-webkit-radial-gradient(white, black)",
                }}
              >
                <img
                  src={src}
                  alt=""
                  className="w-full h-full object-cover"
                  style={{ borderRadius: `${cardRadius}px` }}
                />
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default GalleryPage;