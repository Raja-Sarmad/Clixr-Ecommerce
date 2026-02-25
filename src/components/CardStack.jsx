// src/components/CardStack.jsx
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Images imports
import img1 from "/Gallery/image20.jpeg"
import img3 from "/Gallery/image15.jpeg"
import img5 from "/Gallery/image3.jpeg"
import img6 from "/Gallery/image16.jpeg"
import img7 from "/Gallery/image18.jpeg"

gsap.registerPlugin(ScrollTrigger);

const CardStack = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  const images = [img7, img5, img1, img3, img6]; 

  useEffect(() => {
    let mm = gsap.matchMedia();

    mm.add({
      isMobile: "(max-width: 767px)",
      isDesktop: "(min-width: 768px)"
    }, (context) => {
      let { isMobile } = context.conditions;
      const cards = cardsRef.current;

      // --- INITIAL STATE: Cards load par stack rahenge ---
      cards.forEach((card, index) => {
        const factor = index - 2; 
        gsap.set(card, {
          x: factor * (isMobile ? 15 : 40),      
          rotate: factor * (isMobile ? 4 : 10), 
          y: 0,
          transformOrigin: "bottom center",
        });
      });

      // --- SCROLL ANIMATION ---
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",      // Section top pe aate hi pin ho jayega
          // ✅ FIX: Mobile par duration choti rakhi hai taaki agla section forn aaye
          end: isMobile ? "+=60%" : "+=100%",         
          pin: true,             
          scrub: 1, 
          pinSpacing: true,      // Ye agle section ko tab tak rokkega jab tak cards khul na jayein
          anticipatePin: 1,
        },
      });

      cards.forEach((card, index) => {
        const factor = index - 2; 
        tl.to(card, {
          x: factor * (isMobile ? 65 : 135), // Mobile par perfect spread
          rotate: factor * (isMobile ? 12 : 16),  
          y: -Math.abs(factor) * (isMobile ? 15 : 30), 
          ease: "none", 
        }, 0);
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <div className="bg-black w-full overflow-hidden">
      {/* 
        Section h-screen hai taaki Mobile aur Desktop dono par cards 
        hamesha screen ke dead center (middle) mein animate hon.
      */}
      <section
        ref={sectionRef}
        className="relative w-full h-[80vh] sm:h-screen bg-black flex items-center justify-center"
      >
        {/* CARDS WRAPPER: items-center ensures middle alignment */}
        <div className="relative w-full flex items-center justify-center h-auto">
          {images.map((img, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="absolute w-[160px] h-[210px] sm:w-[200px] sm:h-[260px] md:w-[340px] md:h-[400px] rounded-[2rem] md:rounded-[4rem] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.9)] border border-white/10 bg-gray-900 will-change-transform"
              style={{ zIndex: index }}
            >
              <img
                src={img}
                alt={`card-${index}`}
                className="w-full h-full object-cover pointer-events-none"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/10"></div>
            </div>
          ))}
        </div>
      </section>
      
      {/* 
        Ab iske foran baad jo bhi section hoga (About, Gallery etc.), 
        wo cards khulne ke foran baad chipka hua nazar aayega.
      */}
    </div>
  );
};

export default CardStack;