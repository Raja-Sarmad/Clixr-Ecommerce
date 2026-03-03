import React from 'react';
import { FaEnvelope, FaPhoneAlt, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Contact = () => {
  return (
    // pt-32 or pt-40 will push the content down below the fixed navbar
    <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center pt-32 md:pt-40 pb-20 px-5">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-10 items-start">
        
        {/* Left Side: Text & Info */}
        <div className="space-y-8 mt-4">
          <div>
            <h2 className="text-[#0b6472] font-mono tracking-[0.3em] uppercase text-sm mb-3">Contact Us</h2>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">
              LET'S <br /> <span className="text-[#0b6472]">CONNECT.</span>
            </h1>
            <p className="text-gray-500 mt-6 max-w-sm font-light leading-relaxed">
              Have an idea or a project in mind? Reach out and let's build something extraordinary together.
            </p>
          </div>

          {/* Contact Details */}
          <div className="space-y-6">
            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-full bg-[#0b6472]/10 border border-[#0b6472]/20 flex items-center justify-center group-hover:bg-[#0b6472] transition-all duration-500">
                <FaEnvelope className="text-[#0b6472] group-hover:text-white" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-gray-500">Email Me</p>
                <p className="text-sm font-bold">hello@clixr.com</p>
              </div>
            </div>

            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-full bg-[#0b6472]/10 border border-[#0b6472]/20 flex items-center justify-center group-hover:bg-[#0b6472] transition-all duration-500">
                <FaPhoneAlt className="text-[#0b6472] group-hover:text-white" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-gray-500">Call Us</p>
                <p className="text-sm font-bold">+92 300 1234567</p>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex gap-4 pt-4">
            {[FaTwitter, FaInstagram, FaLinkedin].map((Icon, i) => (
              <a key={i} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:border-[#0b6472] hover:text-[#0b6472] transition-all">
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="relative">
          <div className="absolute -inset-4 bg-[#0b6472]/20 blur-3xl rounded-full opacity-30"></div>
          
          <div className="relative bg-[#0c0c0c] border border-white/5 p-8 md:p-10 rounded-[40px] shadow-2xl">
            <form className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-gray-400 ml-1">Name</label>
                  <input type="text" placeholder="John Doe" className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-sm focus:outline-none focus:border-[#0b6472] transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-gray-400 ml-1">Email</label>
                  <input type="email" placeholder="john@example.com" className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-sm focus:outline-none focus:border-[#0b6472] transition-colors" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] text-gray-400 ml-1">Subject</label>
                <input type="text" placeholder="Project Inquiry" className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-sm focus:outline-none focus:border-[#0b6472] transition-colors" />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] text-gray-400 ml-1">Message</label>
                <textarea rows="4" placeholder="Tell us about your project..." className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-sm focus:outline-none focus:border-[#0b6472] transition-colors resize-none"></textarea>
              </div>

              <button className="w-full bg-[#0b6472] hover:bg-[#0d7a8a] text-white font-bold py-4 rounded-2xl shadow-[0_10px_30px_rgba(11,100,114,0.3)] hover:shadow-[#0b6472]/50 transition-all duration-300 uppercase text-xs tracking-[0.2em] mt-4">
                Send Message
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;