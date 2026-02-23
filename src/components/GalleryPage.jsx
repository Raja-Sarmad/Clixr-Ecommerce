// src/components/GalleryPage.jsx
import React, { useEffect, useState, useMemo } from "react";

const GalleryPage = () => {
  const [scrollY, setScrollY] = useState(0);

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

  const cardWidth = 260;
  const gap = 24;
  const singleSetWidth = images.length * (cardWidth + gap);

  const repeatedImages = useMemo(() => {
    return [...images, ...images, ...images];
  }, []);

  const getTranslateX = (direction = 1) => {
    const speed = 0.4;
    const move = scrollY * speed;
    const offset = move % singleSetWidth;

    return direction === 1
      ? -offset - singleSetWidth
      : offset - singleSetWidth;
  };

  return (
    <div className="bg-[#050505] text-white min-h-[200vh] overflow-hidden rounded-b-[120px]">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="w-full px-12 space-y-12">

          {/* Top Row */}
          <div
            className="flex gap-6 will-change-transform"
            style={{ transform: `translateX(${getTranslateX(1)}px)` }}
          >
            {repeatedImages.map((src, i) => (
              <div
                key={i}
                // rounded-3xl se all 4 sides perfect round ho jayengi
                className="min-w-[260px] h-[340px] rounded-[32px] overflow-hidden shadow-2xl"
              >
                <img
                  src={src}
                  alt=""
                  // overflow-hidden ke sath image bhi round corners follow karegi
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Bottom Row */}
          <div
            className="flex gap-6 will-change-transform"
            style={{ transform: `translateX(${getTranslateX(-1)}px)` }}
          >
            {repeatedImages.map((src, i) => (
              <div
                key={i}
                // Custom rounding [32px] ya rounded-3xl ka use
                className="min-w-[260px] h-[340px] rounded-[32px] overflow-hidden shadow-2xl"
              >
                <img
                  src={src}
                  alt=""
                  className="w-full h-full object-cover"
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
