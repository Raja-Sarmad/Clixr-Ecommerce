import React, { useState } from "react";
import { FaEnvelope, FaCommentDots } from "react-icons/fa";

const CustomizePage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Submitted Email:", email);
    console.log("Message:", message);

    setSubmitted(true);
    setEmail("");
    setMessage("");

    setTimeout(() => {
      setSubmitted(false);
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center px-5 py-32 relative overflow-hidden">

      {/* background glow */}
      <div className="absolute w-[500px] h-[500px] bg-[#0b6472] opacity-20 blur-[150px] rounded-full top-10 left-10"></div>
      <div className="absolute w-[400px] h-[400px] bg-[#0b6472] opacity-20 blur-[150px] rounded-full bottom-10 right-10"></div>

      <div className="max-w-xl w-full backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl shadow-[0_0_60px_rgba(11,100,114,0.25)] p-10 relative z-10">

        {/* title */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-4 bg-gradient-to-r from-[#0b6472] to-[#5ce1e6] bg-clip-text text-transparent">
          Customize Your Experience
        </h1>

        <p className="text-gray-300 text-center mb-8 font-mono text-sm">
          Enter your email and message below and we'll create a personalized
          experience for your Art Vault journey.
        </p>

        {submitted && (
          <div className="mb-6 text-center text-green-400 font-bold animate-pulse">
            ✅ Thank you! Your request has been received.
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">

          {/* email */}
          <div className="relative">
            <FaEnvelope className="absolute left-4 top-4 text-gray-400" />
            <input
              type="email"
              required
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-12 pr-5 py-3 rounded-xl bg-black/40 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0b6472] transition"
            />
          </div>

          {/* message */}
          <div className="relative">
            <FaCommentDots className="absolute left-4 top-4 text-gray-400" />
            <textarea
              placeholder="What's in your mind?"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full pl-12 pr-5 py-3 rounded-xl bg-black/40 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0b6472] transition resize-none h-32"
            />
          </div>

          {/* button */}
          <button
            type="submit"
            className="relative overflow-hidden bg-gradient-to-r from-[#0b6472] to-[#0d7a8a] hover:scale-[1.03] rounded-xl py-3 font-bold uppercase text-white shadow-[0_0_30px_rgba(11,100,114,0.6)] transition-all duration-300"
          >
            Send Request
          </button>

        </form>

        <p className="mt-6 text-gray-400 text-center text-xs font-mono">
          We'll never share your email. All messages remain private.
        </p>
      </div>
    </div>
  );
};

export default CustomizePage;