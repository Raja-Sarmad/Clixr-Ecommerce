import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-black p-5 md:p-8 font-sans">
      {/* Main Capsule Container */}
      <div className="max-w-7xl mx-auto bg-gradient-to-r from-[#0b6472] via-[#042a2f] to-[#050505] rounded-[40px] md:rounded-full px-8 md:px-14 py-8 md:py-10 flex flex-col md:flex-row items-center justify-between border border-white/10 shadow-[0_10px_50px_rgba(11,100,114,0.15)]">
        
        {/* Left Section: Links */}
        <div className="flex flex-row gap-8 md:gap-14 text-left mb-8 md:mb-0">
          {/* Socials */}
          <div className="flex flex-col gap-1.5">
            <h4 className="text-white font-bold text-[13px] mb-2 uppercase tracking-[0.15em]">Socials</h4>
            <a href="#" className="text-gray-400 hover:text-[#8c001d] transition-all duration-300 text-xs font-medium">Twitter</a>
            <a href="#" className="text-gray-400 hover:text-[#8c001d] transition-all duration-300 text-xs font-medium">Facebook</a>
            <a href="#" className="text-gray-400 hover:text-[#8c001d] transition-all duration-300 text-xs font-medium">Instagram</a>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-1.5">
            <h4 className="text-white font-bold text-[13px] mb-2 uppercase tracking-[0.15em]">Contact</h4>
            <a href="#" className="text-gray-400 hover:text-[#8c001d] transition-all duration-300 text-xs font-medium">Address</a>
            <a href="#" className="text-gray-400 hover:text-[#8c001d] transition-all duration-300 text-xs font-medium">Email</a>
            <a href="#" className="text-gray-400 hover:text-[#8c001d] transition-all duration-300 text-xs font-medium">+XXXXXXXXX</a>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-1.5">
            <h4 className="text-white font-bold text-[13px] mb-2 uppercase tracking-[0.15em]">Links</h4>
            <a href="#" className="text-gray-400 hover:text-[#8c001d] transition-all duration-300 text-xs font-medium">License</a>
            <a href="#" className="text-gray-400 hover:text-[#8c001d] transition-all duration-300 text-xs font-medium">YouTube</a>
            <a href="#" className="text-gray-400 hover:text-[#8c001d] transition-all duration-300 text-xs font-medium">TrustPilot</a>
          </div>
        </div>

        {/* Middle Section: Logo instead of button */}
        <div className="relative mb-8 md:mb-0 flex items-center justify-center">
          <img
            src="/Gallery/artlogo.png"
            alt="Art Logo"
            className="w-36 h-36 md:w-40 md:h-40 object-contain"
          />
        </div>

        {/* Right Section: Developed by only */}
        <div className="text-center md:text-right">
          <p className="text-white text-base md:text-[17px] font-bold tracking-tight">
            Developed by <span className="relative inline-block group cursor-pointer">
              <span className="text-white group-hover:text-[#8c001d] transition-colors duration-300">Techxudo</span>
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#8c001d] shadow-[0_0_8px_#8c001d]"></span>
            </span>
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;