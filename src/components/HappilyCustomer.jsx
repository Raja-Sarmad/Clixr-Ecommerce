// src/components/HappilyCustomer.jsx
import React, { useEffect, useRef, useState } from "react";

const HappilyCustomer = () => {
  const leftImages = [
    "https://cdn.prod.website-files.com/64a6caa646429ed756eb2d03/64a6cdff000962bbfb4a9ccb_sc1.jpg",
    "https://cdn.prod.website-files.com/64a6caa646429ed756eb2d03/64a6cdff000962bbfb4a9d0c_customer3.jpg",
    "https://cdn.prod.website-files.com/64a6caa646429ed756eb2d03/64a6cdff000962bbfb4a9cc6_newsletter.jpg",
  ];

  const rightImages = [
    "https://cdn.prod.website-files.com/64a6caa646429ed756eb2d03/64a6cdff000962bbfb4a9d07_customer1.jpg",
    "https://cdn.prod.website-files.com/64a6caa646429ed756eb2d03/64a6cdff000962bbfb4a9cd0_main.jpg",
    "https://cdn.prod.website-files.com/64a6caa646429ed756eb2d03/64a6cdff000962bbfb4a9cdd_customer2.jpg",
  ];

  const circleBase = {
    width: "220px",
    height: "220px",
    borderRadius: "50%",
    overflow: "hidden",
    border: "4px solid #111",
    flexShrink: 0,
    background: "#000",
  };

  // ✅ ADD: refs + scroll progress state (subtle parallax)
  const sectionRef = useRef(null);
  const rafRef = useRef(null);
  const [p, setP] = useState(0); // 0..1

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const clamp01 = (v) => Math.max(0, Math.min(1, v));

    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;

      // progress while section is in view (0..1)
      const raw = (vh - rect.top) / (vh + rect.height);
      setP(clamp01(raw));
      rafRef.current = null;
    };

    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // ✅ ADD: subtle transforms (no shaking, just smooth “hiltay huay”)
  const leftY = (p - 0.5) * -36;   // up/down
  const rightY = (p - 0.5) * 36;
  const centerY = (p - 0.5) * -18;

  const leftRot = (p - 0.5) * -2.2;   // deg
  const rightRot = (p - 0.5) * 2.2;
  const centerRot = (p - 0.5) * 0.8;

  return (
    <div
      ref={sectionRef} // ✅ ADD
      style={{
        backgroundColor: "black",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Segoe UI', sans-serif",
        overflow: "hidden",
        padding: "60px 0",
      }}
    >
      <style>{`
        .lift {
          transform: scale(1.01);
          box-shadow: 0 18px 50px rgba(0,0,0,0.55);
          transition: transform 220ms ease, box-shadow 220ms ease, filter 220ms ease;
          will-change: transform;
        }
        .lift:hover {
          transform: scale(1.03);
          box-shadow: 0 26px 70px rgba(0,0,0,0.65);
        }

        /* ✅ ADD: smooth parallax transform */
        .parallax {
          will-change: transform;
          transition: transform 120ms ease-out;
          transform-style: preserve-3d;
        }
      `}</style>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          maxWidth: "1300px",
          position: "relative",
          padding: "0 100px",
        }}
      >
        {/* LEFT STACK */}
        <div
          className="parallax" // ✅ ADD
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            width: "260px",
            transform: `translate3d(0, ${leftY}px, 0) rotate(${leftRot}deg)`,
          }}
        >
          {leftImages.map((img, i) => (
            <div
              key={i}
              className="lift"
              style={{
                ...circleBase,
                marginTop: i === 0 ? "0" : "-40px",
              }}
            >
              <img
                src={img}
                alt={`customer-left-${i}`}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>
          ))}
        </div>

        {/* CENTER CONTENT */}
        <div
          className="parallax" // ✅ ADD
          style={{
            textAlign: "center",
            zIndex: 2,
            position: "relative",
            width: "min(520px, 92vw)",
            padding: "0 24px",
            flexShrink: 0,
            margin: "0 auto",
            transform: `translate3d(0, ${centerY}px, 0) rotate(${centerRot}deg)`,
          }}
        >
          {/* +1M */}
          <div
            style={{
              fontSize: "clamp(65px, 15vw, 100px)",
              fontWeight: 500,
              color: "#fff",
              letterSpacing: "-2.5px",
              lineHeight: 1,
              marginBottom: "10px",
              textShadow: "0 8px 30px rgba(0,0,0,.55)",
              WebkitFontSmoothing: "antialiased",
              MozOsxFontSmoothing: "grayscale",
            }}
          >
            +1M
          </div>

          {/* Red arc */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "16px" }}>
            <svg width="210" height="22" viewBox="0 0 210 22" fill="none">
              <path
                d="M10 16 Q105 3 200 16"
                stroke="url(#redGrad)"
                strokeWidth="7"
                strokeLinecap="round"
                style={{ filter: "drop-shadow(0px 6px 14px rgba(229,57,53,.35))" }}
              />
              <defs>
                <linearGradient id="redGrad" x1="10" y1="16" x2="200" y2="16" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#ff4a45" />
                  <stop offset="1" stopColor="#b71c1c" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Happy Customers */}
          <div
            style={{
              fontSize: "clamp(75px, 7vw, 108px)",
              fontWeight: 600,
              letterSpacing: "1px",
              lineHeight: 1,
              marginTop: "6px",
              marginBottom: "30px",
              background: "linear-gradient(to bottom, rgba(255,255,255,.55), rgba(255,255,255,.38))",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              textShadow: "0 18px 60px rgba(0,0,0,.65)",
              WebkitFontSmoothing: "antialiased",
              MozOsxFontSmoothing: "grayscale",
            }}
          >
            Happy
            <br />
            Customers
          </div>

          {/* Read Reviews */}
          <div>
            <span
              style={{
                color: "#fff",
                fontWeight: 700,
                fontSize: "18px",
                cursor: "pointer",
                letterSpacing: "0.2px",
                textShadow: "0 10px 30px rgba(0,0,0,.55)",
              }}
            >
              Read Reviews
            </span>

            {/* Green arc */}
            <div style={{ display: "flex", justifyContent: "center", marginTop: "8px" }}>
              <svg width="190" height="16" viewBox="0 0 190 16" fill="none">
                <path
                  d="M10 12 Q95 2 180 12"
                  stroke="url(#greenGrad)"
                  strokeWidth="5"
                  strokeLinecap="round"
                  style={{ filter: "drop-shadow(0px 6px 14px rgba(76,175,80,.25))" }}
                />
                <defs>
                  <linearGradient id="greenGrad" x1="10" y1="12" x2="180" y2="12" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#7CFF8C" />
                    <stop offset="1" stopColor="#2e7d32" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>

        {/* RIGHT STACK */}
        <div
          className="parallax" // ✅ ADD
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            width: "260px",
            transform: `translate3d(0, ${rightY}px, 0) rotate(${rightRot}deg)`,
          }}
        >
          {rightImages.map((img, i) => (
            <div
              key={i}
              className="lift"
              style={{
                ...circleBase,
                marginTop: i === 0 ? "0" : "-40px",
              }}
            >
              <img
                src={img}
                alt={`customer-right-${i}`}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HappilyCustomer;