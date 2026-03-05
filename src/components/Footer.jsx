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

        {/* Middle Section: The Circle Button */}
        <div className="relative mb-8 md:mb-0">
          <Link
            to="/paintings"
            className="w-36 h-36 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-[#0b6472] via-[#084d57] to-black flex items-center justify-center border border-white/20 shadow-[0_0_40px_rgba(11,100,114,0.3)] hover:scale-105 hover:border-[#8c001d]/50 transition-transform duration-500 cursor-pointer group"
          >
            <span className="text-white text-xl md:text-2xl font-black tracking-tighter group-hover:tracking-normal transition-all duration-500">
              View Gallery
            </span>
          </Link>
        </div>

        {/* Right Section: Credits */}
        <div className="text-center md:text-right">
          <p className="text-white text-base md:text-[17px] font-bold tracking-tight">
            Design & Developed by <span className="relative inline-block group cursor-pointer">
              <span className="text-white group-hover:text-[#8c001d] transition-colors duration-300">Techxudo</span>
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#8c001d] shadow-[0_0_8px_#8c001d]"></span>
            </span>
          </p>
          <p className="text-gray-500 text-[10px] mt-1.5 uppercase tracking-[0.3em] font-medium">
            Powered by Creativity
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;