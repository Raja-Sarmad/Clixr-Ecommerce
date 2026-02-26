import React from 'react';

const Product = () => {
  return (
    <section className="bg-black text-white py-24 px-8 md:px-20 min-h-[300px] flex flex-col justify-center overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        
        {/* First Line */}
        <h1 className="text-[55px] md:text-[110px] leading-[0.9] font-medium text-[#7a7a7a] tracking-tighter">
          Unleash Your
        </h1>

        {/* Second Line */}
        <h1 className="text-[55px] md:text-[110px] leading-[0.9] font-medium text-[#7a7a7a] tracking-tighter">
          Potential with our
        </h1>

        {/* Third Line with Inline Button */}
        <div className="flex flex-wrap items-center gap-x-6 md:gap-x-10 mt-2">
          <span className="text-[55px] md:text-[110px] leading-[0.9] font-medium text-white tracking-tighter">
            Product
          </span>

          {/* UPDATED BUTTON: Matched with Blue/Teal Theme */}
          <button className="relative group inline-flex items-center justify-center h-[55px] md:h-[80px] px-8 md:px-14 rounded-full border border-white/20 overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 bg-gradient-to-br from-[#0b6472] to-[#022227] shadow-[0_0_30px_rgba(11,100,114,0.5)] hover:shadow-[0_0_45px_rgba(11,100,114,0.8)]">
            
            {/* Ambient Glow inside button */}
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Button Text */}
            <span className="relative z-10 text-white text-sm md:text-xl font-bold tracking-tight uppercase">
              Get Clixr
            </span>
          </button>
        </div>

      </div>
    </section>
  );
};

export default Product;