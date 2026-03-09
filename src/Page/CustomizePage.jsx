import React, { useState } from "react";

const CustomizePage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Yahan backend integration ho sakta hai
    console.log("Submitted Email:", email);
    console.log("Message:", message);
    setSubmitted(true);
    setEmail("");
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-start pt-36 md:pt-48 px-5">
      <div className="max-w-xl w-full bg-gradient-to-br from-[#0b6472] via-[#022227] to-[#031e22] rounded-3xl shadow-[0_0_50px_rgba(11,100,114,0.3)] p-10">
        
        <h1 className="text-4xl font-extrabold tracking-tight text-center mb-6">
          Customize Your Experience
        </h1>
        <p className="text-gray-300 text-center mb-8 font-mono text-sm">
          Enter your email and message below. We'll get back to you with custom options and updates for your Art Vault experience.
        </p>

        {submitted && (
          <div className="mb-6 text-center text-green-400 font-bold">
            Thank you! We received your request.
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Email */}
          <input
            type="email"
            required
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-5 py-3 rounded-xl bg-black/40 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0b6472] transition"
          />

          {/* Message */}
          <textarea
            placeholder="Whats in your mind"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-5 py-3 rounded-xl bg-black/40 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0b6472] transition resize-none h-32"
          />

          {/* Submit */}
          <button
            type="submit"
            className="bg-[#0b6472] hover:bg-[#0d7a8a] rounded-xl py-3 font-bold uppercase text-white shadow-[0_0_25px_rgba(11,100,114,0.5)] transition-all"
          >
            Submit
          </button>
        </form>

        <p className="mt-6 text-gray-400 text-center text-xs font-mono">
          We'll never share your email. All messages are private.
        </p>
      </div>
    </div>
  );
};

export default CustomizePage;