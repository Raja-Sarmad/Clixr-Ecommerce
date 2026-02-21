import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CardStack = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  const images = [
    "https://cdn.prod.website-files.com/64a6caa646429ed756eb2d03/64a6cdff000962bbfb4a9ceb_customer-03.jpg", // Pink
    "https://cdn.prod.website-files.com/64a6caa646429ed756eb2d03/64a6cdff000962bbfb4a9ce9_customer-01.jpg", // Red
    "https://cdn.prod.website-files.com/64a6caa646429ed756eb2d03/64a6cdff000962bbfb4a9ceb_customer-03.jpg", // Orange
    "https://cdn.prod.website-files.com/64a6caa646429ed756eb2d03/64a6cdff000962bbfb4a9ce7_customer-02.jpg", // White
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&h=700&fit=crop", // Blue Face
  ];

  useEffect(() => {
    const cards = cardsRef.current;
    
    // Initial state: Saare cards center mein stacked
    gsap.set(cards, { x: 0, y: 0, rotate: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top center", 
        end: "bottom center",
        scrub: 1.5,
      },
    });

    // Saare cards move honge aur Right side fan out honge
    cards.forEach((card, index) => {
      // Logic: Index ke hisaab se X-position aur Rotation distribute karna
      // middle index 2 hai. 
      const xOffset = (index - 2) * 110; // Cards ko spread karega
      const rotation = (index - 2) * 15; // Cards ko fan shape mein rotate karega
      
      tl.to(card, {
        x: xOffset + 100,  // +100 karne se poora stack Right ki taraf shift hoga
        rotate: rotation + 10, // +10 rotation se right-leaning fan banega
        y: Math.abs(index - 2) * 15, // Halka sa arch (curve) banaye rkhne ke liye
        duration: 1,
        ease: "power2.out"
      }, 0);
    });
  }, []);

  return (
    <div className="bg-black">
      {/* Scroll area build karne ke liye spacer */}
      <div className="h-[40vh]" />

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
                alt=""
                className="w-full h-full object-cover"
              />
              {/* Overlay taaki depth real lage */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
          ))}

        </div>
      </section>

      <div className="h-[40vh]" />
    </div>
  );
};

export default CardStack;