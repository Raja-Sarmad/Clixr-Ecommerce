// src/components/CardStack.jsx
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Images imports
import img1 from "/Gallery/img1.jpg"
import img3 from "/Gallery/img3.jpg"
import img5 from "/Gallery/img5.jpg"
import img6 from "/Gallery/img6.jpg"
import img7 from "/Gallery/img7.jpg"

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

      // --- INITIAL STATE ---
      cards.forEach((card, index) => {
        const factor = index - 2; 
        gsap.set(card, {
          x: factor * (isMobile ? 25 : 40),      
          rotate: factor * (isMobile ? 8 : 10), 
          y: 0,
          transformOrigin: "bottom center",
        });
      });

      // --- SCROLL ANIMATION ---
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",      
          end: "+=100%",         
          pin: true,             
          scrub: 1.2, 
          pinSpacing: true,      
          anticipatePin: 1,
        },
      });

      cards.forEach((card, index) => {
        const factor = index - 2; 
        tl.to(card, {
          x: factor * (isMobile ? 55 : 135), // Mobile par kam phailayenge taaki screen mein rahe
          rotate: factor * (isMobile ? 12 : 16),  
          y: -Math.abs(factor) * (isMobile ? 15 : 30), 
          ease: "power2.out",
        }, 0);
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <div className="bg-black w-full overflow-hidden">
      <section
        ref={sectionRef}
        className="relative w-full h-screen bg-black flex flex-col items-center justify-start md:justify-center"
      >
        {/* CARDS WRAPPER - Mobile par top par, Desktop par center */}
        <div className="relative w-full flex items-center justify-center pt-24 md:pt-0 h-[40%] md:h-auto">
          {images.map((img, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="absolute w-[160px] h-[200px] sm:w-[200px] sm:h-[260px] md:w-[340px] md:h-[400px] rounded-[2rem] md:rounded-[4rem] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.8)] border border-white/10 bg-gray-900 will-change-transform"
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

        {/* TEXT CONTENT - Jo aapki pic mein hai */}
        <div className="relative z-30 mt-10 md:absolute md:bottom-20 md:mt-0 text-left md:text-center px-8 w-full max-w-4xl">
          <h2 className="text-[32px] md:text-[50px] font-semibold text-gray-400 leading-[1.2] tracking-tight">
            Unleash Your <br className="md:hidden" /> Potential with our <br />
            <span className="text-white font-bold">Product</span>
          </h2>
        </div>
      </section>
    </div>
  );
};

export default CardStack;