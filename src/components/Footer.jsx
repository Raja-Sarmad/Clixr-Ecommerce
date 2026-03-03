import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black p-6 md:p-10 font-sans">
      {/* Main Capsule Container */}
      <div className="max-w-7xl mx-auto bg-gradient-to-r from-[#2b2b8c] via-[#050505] to-black rounded-[50px] md:rounded-[100px] p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10 border border-white/5">
        
        {/* Left Side: Links Columns */}
        <div className="flex flex-wrap gap-10 md:gap-16 text-left">
          {/* Socials */}
          <div className="flex flex-col gap-3">
            <h4 className="text-white font-bold text-lg mb-2">Socails</h4>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Twitter</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Facebook</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Instagtam</a>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-3">
            <h4 className="text-white font-bold text-lg mb-2">Contact</h4>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Address</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Email</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">+xxxxxxxxx</a>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-3">
            <h4 className="text-white font-bold text-lg mb-2">Links</h4>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">License</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">YouTube</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">TrustPilot</a>
          </div>
        </div>

        {/* Center: Get Clixr Circle */}
        <div className="relative group cursor-pointer">
          <div className="w-40 h-40 md:w-56 md:h-56 rounded-full bg-gradient-to-br from-[#4d4dbf] to-black flex items-center justify-center border border-white/10 shadow-2xl shadow-blue-900/20 group-hover:scale-105 transition-transform duration-500">
            <span className="text-white text-2xl md:text-3xl font-bold tracking-tight">
              Get Clixr
            </span>
          </div>
        </div>

        {/* Right Side: Credits */}
        <div className="text-center md:text-right space-y-2">
          <p className="text-white text-lg md:text-xl font-medium">
            Design & Development by <span className="underline decoration-green-400 underline-offset-4 cursor-pointer hover:text-green-400 transition-colors">Deveb</span>
          </p>
          <p className="text-gray-500 text-sm">
            Powered by Webflow
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;