import React from "react";

const Navbar = () => {
  return (
    <nav className="w-full bg-black h-20">
      {/* OUTER SAFE PADDING */}
      <div className="px-6 md:px-10 lg:px-12">
        <div className="max-w-[1440px] mx-auto h-20 flex items-center justify-between">
          
          {/* LEFT GROUP */}
          <div className="flex items-center gap-16">
            <div className="text-2xl font-bold text-white tracking-tighter cursor-pointer">
              Clixr
            </div>

            <div className="hidden md:flex items-center gap-10">
              <a className="text-[#999] hover:text-white text-[15px] font-medium transition">
                About
              </a>
              <a className="text-[#999] hover:text-white text-[15px] font-medium transition">
                Pricing
              </a>
              <a className="text-[#999] hover:text-white text-[15px] font-medium transition">
                FAQ
              </a>
            </div>
          </div>

          {/* RIGHT GROUP */}
          <div className="flex items-center gap-8">
            {/* Cart */}
            <div className="relative cursor-pointer">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="1.5"
              >
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                <path d="M3 6h18" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>

              <span className="absolute -bottom-1 -right-2 bg-white text-black text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                0
              </span>
            </div>

            {/* CTA */}
            <button className="relative overflow-hidden px-8 py-4 rounded-full border border-white/20 transition hover:scale-[1.02]">
              <div className="absolute inset-0 bg-black" />
              <div
                className="absolute inset-0 opacity-90"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(0,0,0,1) 35%, rgba(88,194,125,1) 100%)",
                }}
              />
              <span className="relative z-10 text-white font-semibold text-[14px]">
                Copy This Site
              </span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
