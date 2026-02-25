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
    const cards = cardsRef.current;
    
    // --- INITIAL STATE ---
    cards.forEach((card, index) => {
      const factor = index - 2; 
      gsap.set(card, {
        x: factor * 40,      
        rotate: factor * 10, 
        y: 0,
        transformOrigin: "bottom center",
      });
    });

    // --- SCROLL ANIMATION ---
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",      
        end: "+=100%",         // ✅ Scroll length thodi kam ki taaki gap kam ho jaye
        pin: true,             
        scrub: 1.2, 
        pinSpacing: true,      // ✅ Isko true rakhna zaroori hai taaki animation ke waqt agla section upar na charhay
        anticipatePin: 1,
      },
    });

    cards.forEach((card, index) => {
      const factor = index - 2; 
      tl.to(card, {
        x: factor * 135,      
        rotate: factor * 16,  
        y: -Math.abs(factor) * 30, 
        ease: "power2.out",
      }, 0);
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div className="bg-black w-full">
      {/* Upper Spacer: Zarurat ke mutabiq rakhein ya hata dein */}
      <div className="h-[10vh]" />

      <section
        ref={sectionRef}
        className="relative w-full h-screen bg-black flex items-center justify-center overflow-hidden"
      >
        {/* Main Wrapper */}
        <div className="relative w-full max-w-6xl mt-40 flex items-center justify-center pb-20">
          
          {images.map((img, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="absolute w-[240px] h-[300px] md:w-[340px] md:h-[400px] rounded-[3rem] md:rounded-[4rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.9)] border border-white/10 bg-gray-900 will-change-transform"
              style={{
                zIndex: index, 
              }}
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

      {/* ✅ FIX: Niche wala 100vh spacer hata diya hai. 
          Ab agla section theek animation ke baad shuru ho jayega. */}
    </div>
  );
};

export default CardStack;