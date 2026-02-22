import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import img1 from "/Gallery/img1.jpg"
import img2 from "/Gallery/img2.jpg"
import img3 from "/Gallery/img3.jpg"
import img4 from "/Gallery/img4.jpg"
import img5 from "/Gallery/img5.jpg"
import img6 from "/Gallery/img6.jpg"
import img7 from "/Gallery/img7.jpg"
import img8 from "/Gallery/img8.jpg"
import img9 from "/Gallery/img9.jpg"

gsap.registerPlugin(ScrollTrigger);

const CardStack = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  const images = [
    img7, // Pink
    img5, // Red
    img1, // Orange
    img3, // White
    img6, // Blue Face
  ];

  useEffect(() => {
    const cards = cardsRef.current;
    
    // Initial state: Saare cards center mein stacked
    gsap.set(cards, { x: 0, y: 0, rotate: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom", // Jab section ke top viewport ke bottom se milega tab animation start hoga
        // ⚙️ EDIT HERE: Smoothness - "bottom top" gives more scrolling distance so the animation plays slower and smoother.
        end: "bottom center", 
        // ⚙️ EDIT HERE: Scrub delay. 1 is very responsive and smooth. 1.5 adds a slight delay.
        scrub: 1,
      },
    });

    cards.forEach((card, index) => {
      // Middle index is 2 
      
      // ⚙️ EDIT HERE: WIDTH / SPREAD
      // Changed from 110 to 60. 
      // Decrease to 40 if you want them even closer. Increase to 80 if you want them wider.
      const cardSpread = 60; 
      const xOffset = (index - 2) * cardSpread; 
      
      // ⚙️ EDIT HERE: FAN ROTATION
      // Changed from 15 to 10. 
      // Decrease to 5 for less tilt, increase to 15 for a wider fan shape.
      const cardTilt = 10;
      const rotation = (index - 2) * cardTilt; 
      
      tl.to(card, {
        // ⚙️ EDIT HERE: RIGHT-SHIFT 
        // Changed from +100 to +30. This prevents the whole stack from going out of screen on the right.
        x: xOffset + 30,  
        
        // ⚙️ EDIT HERE: RIGHT-LEAN
        // Changed from +10 to +5 to make the right-leaning effect more subtle.
        rotate: rotation + 5, 
        
        // ⚙️ EDIT HERE: CURVE / ARCH
        // Changed from 15 to 10. Makes the top curve of the cards slightly flatter.
        y: Math.abs(index - 2) * 10, 
        
        duration: 0.5,
        // ⚙️ EDIT HERE: EASING (SMOOTHNESS)
        // Using "none" instead of "power2.out". For scrubbed scroll animations, "none" is the smoothest because it exactly tracks your scroll wheel without adding extra momentum.
        ease: "none" 
      }, 0);
    });
  }, []);

  return (
    <div className="bg-black">
      {/* Scroll area build karne ke liye spacer */}
      <div className="h-[20vh]" />

      <section
        ref={sectionRef}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Cards Wrapper - Screen ke Middle mein */}
        <div className="relative w-full flex items-center justify-center">
          
          {images.map((img, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="absolute w-72 h-80 md:w-[320px] md:h-[420px] rounded-[3.5rem] overflow-hidden shadow-2xl border border-white/10 bg-gray-900"
              style={{
                zIndex: index, // Isse aakhri card (Blue) sabse upar rahega
                transformOrigin: "bottom center", // Pivot point neeche rakha hai fanning ke liye
              }}
            >
              <img
                src={img}
                alt={`Card ${index}`}
                className="w-full h-full object-cover"
              />
              {/* Overlay taaki depth real lage */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
          ))}

        </div>
      </section>

      {/* Adding more height at the bottom to allow full scrolling */}
      {/* <div className="h-[60vh]" /> */}
    </div>
  );
};

export default CardStack;