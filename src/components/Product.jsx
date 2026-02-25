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
        <div className="flex flex-wrap items-baseline gap-x-6 md:gap-x-10 mt-2">
          <span className="text-[55px] md:text-[110px] leading-[0.9] font-medium text-white tracking-tighter">
            Product
          </span>

          {/* Custom Pill Button */}
          <button className="relative group inline-flex items-center justify-center h-[55px] md:h-[85px] px-8 md:px-14 rounded-full border border-white/20 overflow-hidden transition-transform hover:scale-105 active:scale-95">
            
            {/* Half-Half Gradient Background (Exact as Image) */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-[#4ade80] opacity-100 group-hover:opacity-90 transition-opacity"></div>
            
            {/* Button Text */}
            <span className="relative z-10 text-sm md:text-xl font-medium tracking-tight">
              Get Clixr
            </span>
          </button>
        </div>

      </div>
    </section>
  );
};

export default Product;