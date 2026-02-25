import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const ImageSlider = () => {
  const containerRef = useRef(null);

  const baseImages = [
    '/Gallery/image1.jpeg', '/Gallery/image29.jpeg', '/Gallery/image30.jpeg', 
    '/Gallery/image4.jpeg', '/Gallery/image5.jpeg'
  ];
  
  const images = [...baseImages, ...baseImages];


  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
  });

 
  const xTranslate = useTransform(smoothProgress, [0, 1], ["10%", "-40%"]);
  

  const topTextY = useTransform(smoothProgress, [0, 1], [0, 200]);

 
  const bottomTextY = useTransform(smoothProgress, [0, 1], [100, -300]);

  return (
    <div ref={containerRef} className="bg-black w-full overflow-hidden py-40 flex flex-col gap-20">
      

      <motion.div 
        style={{ y: topTextY }}
        className="px-10 z-20"
      >
        <h1 className="text-gray-400 text-4xl md:text-5xl font-medium tracking-tight leading-tight">
          Unlock your <br />
          <span className="text-white font-bold">super power</span>
        </h1>
      </motion.div>

      
      <div className="w-full flex items-center -rotate-12 py-20">
        <motion.div 
          style={{ x: xTranslate }} 
          className="flex gap-10"
        >
          {images.map((img, index) => (
            <div 
              key={index}
              className="w-64 h-96 md:w-80 md:h-[480px] flex-shrink-0 rounded-[3rem] overflow-hidden shadow-2xl transition-transform hover:scale-105 duration-500 bg-zinc-900"
            >
              <img 
                src={img} 
                alt={`slide-${index}`} 
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </motion.div>
      </div>

     
      <motion.div 
        style={{ y: bottomTextY }}
        className="px-10 text-right z-20"
      >
        <h2 className="text-white text-4xl md:text-6xl font-bold leading-[0.8] tracking-tight">
          Amazing <br />
          <span className="text-gray-500 font-medium">& unique</span>
        </h2>
      </motion.div>

    </div>
  );
};

export default ImageSlider;