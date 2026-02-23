// src/components/GalleryPage.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";

const GalleryPage = () => {
  const [scrollY, setScrollY] = useState(0);

  const topRowRef = useRef(null);
  const bottomRowRef = useRef(null);

  const [singleSetWidth, setSingleSetWidth] = useState(1); // ✅ measured width

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

  const repeatedImages = useMemo(() => {
    return [...images, ...images, ...images];
  }, [images]);

  // ✅ Measure real width (works on 75%, 100%, any zoom)
  useEffect(() => {
    const measure = () => {
      const row = topRowRef.current;
      if (!row) return;

      // First "set" = first images.length cards
      const cards = row.querySelectorAll("[data-card='true']");
      if (!cards || cards.length < images.length) return;

      const first = cards[0].getBoundingClientRect();
      const last = cards[images.length - 1].getBoundingClientRect();

      // width from start of first card to end of last card
      const width = (last.right - first.left);

      // prevent 0 / NaN
      if (Number.isFinite(width) && width > 0) setSingleSetWidth(width);
    };

    // measure now + after images load + on resize
    measure();
    window.addEventListener("resize", measure);

    // also re-measure after a tiny delay (fonts/paint settle)
    const t = setTimeout(measure, 200);

    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", measure);
    };
  }, [images.length]);

  const getTranslateX = (direction = 1) => {
    const speed = 0.4;
    const move = scrollY * speed;
    const offset = move % singleSetWidth;

    // keep it centered in the middle copy for seamless loop
    return direction === 1
      ? -offset - singleSetWidth
      : offset - singleSetWidth;
  };

  const cardRadius = 28;

  return (
    <div className="bg-[#050505] text-white min-h-[130vh] overflow-hidden rounded-b-[80px]">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="w-full px-12 space-y-8">
          {/* Top Row */}
          <div
            ref={topRowRef}
            className="flex flex-nowrap gap-6 will-change-transform" // ✅ nowrap fix
            style={{ transform: `translate3d(${getTranslateX(1)}px,0,0)` }}
          >
            {repeatedImages.map((src, i) => (
              <div
                key={i}
                data-card="true"
                className="min-w-[260px] h-[340px] overflow-hidden shadow-2xl bg-black"
                style={{
                  borderRadius: `${cardRadius}px`,
                  WebkitMaskImage: "-webkit-radial-gradient(white, black)",
                }}
              >
                <img
                  src={src}
                  alt=""
                  className="w-full h-full object-cover"
                  style={{ borderRadius: `${cardRadius}px`, display: "block" }}
                  onLoad={() => {
                    // ✅ re-measure when images load (helps at 100% zoom)
                    const row = topRowRef.current;
                    if (!row) return;
                    const cards = row.querySelectorAll("[data-card='true']");
                    if (!cards || cards.length < images.length) return;
                    const first = cards[0].getBoundingClientRect();
                    const last = cards[images.length - 1].getBoundingClientRect();
                    const width = last.right - first.left;
                    if (Number.isFinite(width) && width > 0) setSingleSetWidth(width);
                  }}
                />
              </div>
            ))}
          </div>

          {/* Bottom Row */}
          <div
            ref={bottomRowRef}
            className="flex flex-nowrap gap-6 will-change-transform" // ✅ nowrap fix
            style={{ transform: `translate3d(${getTranslateX(-1)}px,0,0)` }}
          >
            {repeatedImages.map((src, i) => (
              <div
                key={i}
                data-card="true"
                className="min-w-[260px] h-[340px] overflow-hidden shadow-2xl bg-black"
                style={{
                  borderRadius: `${cardRadius}px`,
                  WebkitMaskImage: "-webkit-radial-gradient(white, black)",
                }}
              >
                <img
                  src={src}
                  alt=""
                  className="w-full h-full object-cover"
                  style={{ borderRadius: `${cardRadius}px`, display: "block" }}
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