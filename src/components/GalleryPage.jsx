// src/components/GalleryPage.jsx
import React, { useEffect, useMemo, useRef } from "react";

const GalleryPage = () => {
<<<<<<< HEAD
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
=======
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
>>>>>>> 5a5d6cbc2cb17dc10e60b6ac230e3afc2aae52cd

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
<<<<<<< HEAD
      const w = last.right - first.left;

      if (Number.isFinite(w) && w > 0) singleSetWidthRef.current = w;
=======
      const width = last.right - first.left;

      if (Number.isFinite(width) && width > 0) setSingleSetWidth(width);
>>>>>>> 5a5d6cbc2cb17dc10e60b6ac230e3afc2aae52cd
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

<<<<<<< HEAD
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
=======
  const getTranslateX = (direction = 1) => {
    const speed = 0.35; // smoother on mobile
    const move = scrollY * speed;
    const offset = move % singleSetWidth;

    return direction === 1
      ? -offset - singleSetWidth
      : offset - singleSetWidth;
  };

  const cardRadius = 28;
>>>>>>> 5a5d6cbc2cb17dc10e60b6ac230e3afc2aae52cd

  return (
    <div className="bg-[#050505] text-white min-h-[120vh] overflow-hidden rounded-b-[60px] sm:rounded-b-[80px]">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
<<<<<<< HEAD
        {/* ✅ Responsive padding + spacing via Tailwind */}
        <div className="w-full px-4 sm:px-6 md:px-10 lg:px-12 space-y-3 sm:space-y-4 md:space-y-5">
          {/* Top Row */}
          <div
            ref={topRowRef}
            className="flex flex-nowrap will-change-transform gap-3 sm:gap-4 lg:gap-6 items-center"
            style={{ transform: "translate3d(0,0,0)" }}
=======
        <div className="w-full px-4 sm:px-8 lg:px-12 space-y-6 sm:space-y-8">

          {/* Top Row */}
          <div
            ref={topRowRef}
            className="flex flex-nowrap gap-4 sm:gap-6 will-change-transform"
            style={{ transform: `translate3d(${getTranslateX(1)}px,0,0)` }}
>>>>>>> 5a5d6cbc2cb17dc10e60b6ac230e3afc2aae52cd
          >
            {repeatedImages.map((src, i) => (
              <div
                key={`top-${i}`}
                data-card="true"
<<<<<<< HEAD
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
=======
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
>>>>>>> 5a5d6cbc2cb17dc10e60b6ac230e3afc2aae52cd
              </div>
            ))}
          </div>

          {/* Bottom Row */}
          <div
<<<<<<< HEAD
            data-bottom="true"
            className="flex flex-nowrap will-change-transform gap-3 sm:gap-4 lg:gap-6 items-center"
            style={{ transform: "translate3d(0,0,0)" }}
=======
            ref={bottomRowRef}
            className="flex flex-nowrap gap-4 sm:gap-6 will-change-transform"
            style={{ transform: `translate3d(${getTranslateX(-1)}px,0,0)` }}
>>>>>>> 5a5d6cbc2cb17dc10e60b6ac230e3afc2aae52cd
          >
            {repeatedImages.map((src, i) => (
              <div
                key={`bot-${i}`}
                data-card="true"
<<<<<<< HEAD
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
=======
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
>>>>>>> 5a5d6cbc2cb17dc10e60b6ac230e3afc2aae52cd
              </div>
            ))}
          </div>

<<<<<<< HEAD
          <style>{`
            /* ✅ sync clipPath radius with breakpoints */
            @media (min-width: 640px){
              [data-card='true']{ --r: 22px; }
            }
            @media (min-width: 1024px){
              [data-card='true']{ --r: 28px; }
            }
          `}</style>
=======
>>>>>>> 5a5d6cbc2cb17dc10e60b6ac230e3afc2aae52cd
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;