import React, { useEffect, useState } from "react";

const GalleryPage = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
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

  const cardStyle =
    "min-w-[260px] h-[340px] rounded-[28px] overflow-hidden shadow-2xl";

  return (
    <div className="bg-[#050505] text-white min-h-[120vh] overflow-hidden rounded-b-[120px]">
      
      {/* Sticky Section */}
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="w-full px-12 space-y-12">

          {/* Top Row */}
          <div
            className="flex gap-6 transition-transform duration-100 ease-out"
            style={{ transform: `translateX(-${scrollY * 0.45}px)` }}
          >
            {images.slice(0, 5).map((src, i) => (
              <div key={i} className={cardStyle}>
                <img
                  src={src}
                  alt={`gallery-${i}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Bottom Row */}
          <div
            className="flex gap-6 transition-transform duration-100 ease-out"
            style={{ transform: `translateX(${scrollY * 0.45}px)` }}
          >
            {images.slice(5, 10).map((src, i) => (
              <div key={i} className={cardStyle}>
                <img
                  src={src}
                  alt={`gallery-${i + 5}`}
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