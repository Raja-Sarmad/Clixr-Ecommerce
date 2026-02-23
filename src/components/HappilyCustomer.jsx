// src/components/HappilyCustomer.jsx
import React from "react";

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

  return (
    <div
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
      `}</style>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between", // ✅ push left/right
          width: "100%",
          maxWidth: "1300px",
          position: "relative",
          padding: "0 100px", // ✅ breathing space from edges
        }}
      >
        {/* LEFT STACK (sticks to left) */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start", // ✅ left aligned
            width: "260px", // ✅ reserved space so center stays centered
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

        {/* CENTER CONTENT (stays in middle) */}
        <div
          style={{
            textAlign: "center",
            zIndex: 2,
            position: "relative",
            width: "420px",
            padding: "0 24px",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              fontSize: "72px",
              fontWeight: "800",
              color: "#fff",
              letterSpacing: "-2px",
              lineHeight: 1,
              marginBottom: "4px",
            }}
          >
            +1M
          </div>

          <div style={{ display: "flex", justifyContent: "center", marginBottom: "8px" }}>
            <svg width="160" height="18" viewBox="0 0 160 18" fill="none">
              <path d="M6 13 Q80 1 154 13" stroke="#e53935" strokeWidth="6" strokeLinecap="round" />
            </svg>
          </div>

          <div
            style={{
              fontSize: "78px",
              fontWeight: "800",
              color: "#888",
              lineHeight: 0.9,
              letterSpacing: "-1px",
            }}
          >
            Happy
            <br />
            Customers
          </div>

          <div style={{ marginTop: "28px" }}>
            <span
              style={{
                color: "#fff",
                fontWeight: "600",
                fontSize: "18px",
                cursor: "pointer",
                letterSpacing: "0.2px",
              }}
            >
              Read Reviews
            </span>
            <div style={{ display: "flex", justifyContent: "center", marginTop: "4px" }}>
              <svg width="150" height="12" viewBox="0 0 150 12" fill="none">
                <path d="M6 9 Q75 1 144 9" stroke="#4caf50" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>

        {/* RIGHT STACK (sticks to right) */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end", // ✅ right aligned
            width: "260px", // ✅ reserved space
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