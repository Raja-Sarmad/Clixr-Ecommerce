// src/components/GalleryPage.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";

const GalleryPage = () => {
  const [scrollY, setScrollY] = useState(0);
  const topRowRef = useRef(null);
  const bottomRowRef = useRef(null);
  const [singleSetWidth, setSingleSetWidth] = useState(1);

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

  // Measure real width
  useEffect(() => {
    const measure = () => {
      const row = topRowRef.current;
      if (!row) return;

      const cards = row.querySelectorAll("[data-card='true']");
      if (!cards || cards.length < images.length) return;

      const first = cards[0].getBoundingClientRect();
      const last = cards[images.length - 1].getBoundingClientRect();
      const width = last.right - first.left;

      if (Number.isFinite(width) && width > 0) setSingleSetWidth(width);
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
    const speed = 0.35; // smoother on mobile
    const move = scrollY * speed;
    const offset = move % singleSetWidth;

    return direction === 1
      ? -offset - singleSetWidth
      : offset - singleSetWidth;
  };

  const cardRadius = 28;

  return (
    <div className="bg-[#050505] text-white min-h-[120vh] overflow-hidden rounded-b-[60px] sm:rounded-b-[80px]">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
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
                className="min-w-[200px] sm:min-w-[240px] lg:min-w-[260px] 
                           h-[180px] sm:h-[220px] lg:h-[250px]
                           overflow-hidden shadow-2xl bg-black"
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
                  onLoad={() => {
                    const row = topRowRef.current;
                    if (!row) return;
                    const cards = row.querySelectorAll("[data-card='true']");
                    if (!cards || cards.length < images.length) return;
                    const first = cards[0].getBoundingClientRect();
                    const last = cards[images.length - 1].getBoundingClientRect();
                    const width = last.right - first.left;
                    if (Number.isFinite(width) && width > 0)
                      setSingleSetWidth(width);
                  }}
                />
              </div>
            ))}
          </div>

          {/* Bottom Row */}
          <div
            ref={bottomRowRef}
            className="flex flex-nowrap gap-4 sm:gap-6 will-change-transform"
            style={{ transform: `translate3d(${getTranslateX(-1)}px,0,0)` }}
          >
            {repeatedImages.map((src, i) => (
              <div
                key={i}
                data-card="true"
                className="min-w-[200px] sm:min-w-[240px] lg:min-w-[260px] 
                           h-[180px] sm:h-[220px] lg:h-[250px]
                           overflow-hidden shadow-2xl bg-black"
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