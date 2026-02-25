// src/components/HappilyCustomer.jsx
import React, { useEffect, useRef, useState } from "react";

const HappilyCustomer = () => {
  const leftImages = [
    "https://cdn.prod.website-files.com/64a6caa646429ed756eb2d03/64a6cdff000962bbfb4a9ccb_sc1.jpg",
    "https://cdn.prod.website-files.com/64a6caa646429ed756eb2d03/64a6cdff000962bbfb4a9cd0_main.jpg",
    "https://cdn.prod.website-files.com/64a6caa646429ed756eb2d03/64a6cdff000962bbfb4a9cc6_newsletter.jpg",
  ];

  const rightImages = [
    "https://cdn.prod.website-files.com/64a6caa646429ed756eb2d03/64a6cdff000962bbfb4a9d07_customer1.jpg",
    "https://cdn.prod.website-files.com/64a6caa646429ed756eb2d03/64a6cdff000962bbfb4a9d0c_customer3.jpg",
    "https://cdn.prod.website-files.com/64a6caa646429ed756eb2d03/64a6cdff000962bbfb4a9cdd_customer2.jpg",
  ];

  const sectionRef = useRef(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    const update = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      // Calculate scroll progress (0 to 1)
      const progress = (vh - rect.top) / (vh + rect.height);
      setP(Math.max(0, Math.min(1, progress)));
    };
    window.addEventListener("scroll", update);
    return () => window.removeEventListener("scroll", update);
  }, []);

  // Parallax calculations
  const verticalShift = (p - 0.5) * 60; // For Desktop
  const horizontalShift = (p - 0.5) * 150; // For Mobile slider effect

  return (
    <div
      ref={sectionRef}
      style={{
        backgroundColor: "black",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden", // Crucial for horizontal movement
        position: "relative",
        padding: "60px 0",
      }}
    >
      <style>{`
        .main-wrapper { 
          display: flex; 
          align-items: center; 
          justify-content: space-between; 
          width: 100%; 
          max-width: 1400px; 
          padding: 0 40px; 
        }
        .image-stack { display: flex; flex-direction: column; width: 220px; }
        .circle-img { 
          width: 220px; 
          height: 220px; 
          border-radius: 50%; 
          overflow: hidden; 
          border: 4px solid #111; 
          margin-top: -50px; 
          flex-shrink: 0;
        }
        .circle-img:first-child { margin-top: 0; }
        .circle-img img { width: 100%; height: 100%; object-fit: cover; }

        /* Mobile Adjustments */
        @media (max-width: 768px) {
          .main-wrapper { flex-direction: column; padding: 0; gap: 40px; }
          
          .image-stack { 
            flex-direction: row !important; 
            width: max-content; 
            gap: 20px; 
            padding: 0 20px;
            transition: transform 0.1s linear;
          }
          
          .circle-img { 
            width: 160px; 
            height: 160px; 
            margin-top: 0 !important; 
          }

          .stack-top { order: 1; align-self: flex-start; } /* Moves Left to Right */
          .center-content { order: 2; margin: 20px 0; }
          .stack-bottom { order: 3; align-self: flex-end; } /* Moves Right to Left */
        }
      `}</style>

      <div className="main-wrapper">
        {/* TOP IMAGES ROW (Slider effect on mobile) */}
        <div 
          className="image-stack stack-top" 
          style={{ 
            transform: window.innerWidth > 768 
              ? `translateY(${verticalShift * -1}px)` 
              : `translateX(${horizontalShift}px)` 
          }}
        >
          {leftImages.map((img, i) => (
            <div key={i} className="circle-img"><img src={img} alt="" /></div>
          ))}
        </div>

        {/* CENTER CONTENT */}
        <div className="center-content" style={{ textAlign: "center", zIndex: 10 }}>
          
          {/* +1M with Red Arc */}
          <div style={{ position: "relative", display: "inline-block" }}>
            <h1 style={{ color: "white", fontSize: "clamp(80px, 12vw, 110px)", fontWeight: "800", margin: 0, lineHeight: 0.8 }}>
              +1M
            </h1>
            <div style={{ marginTop: "5px", display: 'flex', justifyContent: 'center' }}>
              <svg width="180" height="22" viewBox="0 0 210 22" fill="none">
                <path d="M10 18 Q105 2 200 18" stroke="url(#red-grad)" strokeWidth="10" strokeLinecap="round" />
                <defs>
                  <linearGradient id="red-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#E63946" />
                    <stop offset="70%" stopColor="#E63946" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#300000" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          {/* Happy Customers Text */}
          <div style={{ marginTop: "20px" }}>
            <h2 style={{ 
              fontSize: "clamp(70px, 10vw, 100px)", 
              fontWeight: "600", 
              color: "#666", 
              lineHeight: "0.95", 
              margin: 0,
              letterSpacing: "-1px"
            }}>
              Happy<br />Customers
            </h2>
          </div>

          {/* Read Reviews with Green Arc */}
          <div style={{ marginTop: "50px", cursor: "pointer" }}>
            <p style={{ color: "white", fontWeight: "700", fontSize: "20px", margin: 0 }}>
              Read Reviews
            </p>
            <div style={{ marginTop: "5px", display: 'flex', justifyContent: 'center' }}>
              <svg width="160" height="16" viewBox="0 0 190 16" fill="none">
                <path d="M10 12 Q95 1 180 12" stroke="url(#green-grad)" strokeWidth="6" strokeLinecap="round" />
                <defs>
                  <linearGradient id="green-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#7CFF8C" />
                    <stop offset="70%" stopColor="#7CFF8C" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#003300" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>

        {/* BOTTOM IMAGES ROW (Slider effect on mobile) */}
        <div 
          className="image-stack stack-bottom" 
          style={{ 
            transform: window.innerWidth > 768 
              ? `translateY(${verticalShift}px)` 
              : `translateX(${horizontalShift * -1}px)` 
          }}
        >
          {rightImages.map((img, i) => (
            <div key={i} className="circle-img"><img src={img} alt="" /></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HappilyCustomer;