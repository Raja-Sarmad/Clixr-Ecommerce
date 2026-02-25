import React, { useEffect, useRef } from "react";

const cards = [
  {
    id: 1,
    bg: "#e8a0b4",
    rotation: -18,
    x: -420,
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=560&fit=crop&crop=faces",
  },
  {
    id: 2,
    bg: "#c0392b",
    rotation: -9,
    x: -210,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=560&fit=crop&crop=faces",
  },
  {
    id: 3,
    bg: "#f39c12",
    rotation: 0,
    x: 0,
    image: "https://images.unsplash.com/photo-1520785643438-5bf77931f493?w=400&h=560&fit=crop&crop=faces",
  },
  {
    id: 4,
    bg: "#bdc3c7",
    rotation: 9,
    x: 210,
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=560&fit=crop&crop=faces",
  },
  {
    id: 5,
    bg: "#3498db",
    rotation: 18,
    x: 420,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=560&fit=crop&crop=faces",
  },
];

const FanCards = () => {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    // Dynamically load GSAP + ScrollTrigger
    const loadGSAP = async () => {
      const script1 = document.createElement("script");
      script1.src = "/Gallery/image25.jpeg";
      document.head.appendChild(script1);

      await new Promise((res) => (script1.onload = res));

      const script2 = document.createElement("script");
      script2.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js";
      document.head.appendChild(script2);

      await new Promise((res) => (script2.onload = res));

      const { gsap } = window;
      const { ScrollTrigger } = window;
      gsap.registerPlugin(ScrollTrigger);

      // All cards start stacked in center
      cardRefs.current.forEach((card) => {
        gsap.set(card, { x: 0, rotation: 0, transformOrigin: "bottom center" });
      });

      // Scroll → fan out
      cardRefs.current.forEach((card, i) => {
        const target = cards[i];
        gsap.to(card, {
          x: target.x,
          rotation: target.rotation,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=600",
            scrub: 1.2,
            pin: true,
          },
        });
      });
    };

    loadGSAP();

    return () => {
      if (window.ScrollTrigger) window.ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <>
      {/* Navbar */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: "20px 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "transparent",
        }}
      >
        <span style={{ color: "white", fontWeight: 800, fontSize: "22px", fontFamily: "sans-serif" }}>
          Clixr
        </span>
        <div style={{ display: "flex", gap: "40px" }}>
          {["About", "Pricing", "FAQ"].map((item) => (
            <a
              key={item}
              href="#"
              style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: "15px", fontFamily: "sans-serif" }}
            >
              {item}
            </a>
          ))}
        </div>
        <button
          style={{
            background: "#22c55e",
            color: "white",
            border: "none",
            borderRadius: "999px",
            padding: "12px 28px",
            fontWeight: 700,
            fontSize: "15px",
            cursor: "pointer",
            fontFamily: "sans-serif",
          }}
        >
          Copy This Site
        </button>
      </nav>

      {/* Fan Section */}
      <div
        ref={sectionRef}
        style={{
          height: "100vh",
          background: "#0a0a0a",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Cards container */}
        <div
          style={{
            position: "relative",
            width: "300px",
            height: "420px",
          }}
        >
          {cards.map((card, i) => (
            <div
              key={card.id}
              ref={(el) => (cardRefs.current[i] = el)}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "300px",
                height: "420px",
                borderRadius: "28px",
                overflow: "hidden",
                backgroundColor: card.bg,
                boxShadow: "0 30px 80px rgba(0,0,0,0.6)",
                willChange: "transform",
              }}
            >
              <img
                src={card.image}
                alt=""
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Content after */}
      <div
        style={{
          background: "#0a0a0a",
          height: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p style={{ color: "rgba(255,255,255,0.3)", fontFamily: "sans-serif", fontSize: "18px" }}>
          Your content continues here...
        </p>
      </div>
    </>
  );
};

export default FanCards;