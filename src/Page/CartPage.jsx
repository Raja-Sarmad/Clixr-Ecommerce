import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import { FaTrash, FaArrowRight, FaShoppingBag } from "react-icons/fa";

/* ── Noise texture overlay ── */
const Noise = () => (
  <svg className="pointer-events-none fixed inset-0 w-full h-full opacity-[0.03] z-50" style={{ mixBlendMode: "overlay" }}>
    <filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch" /><feColorMatrix type="saturate" values="0" /></filter>
    <rect width="100%" height="100%" filter="url(#n)" />
  </svg>
);

export default function CartPage() {
  const { cart, removeFromCart, increaseQty, decreaseQty, subtotal, clearCart } = useCart();
  const [removing, setRemoving] = useState(null);

  const handleRemove = (id) => {
    setRemoving(id);
    setTimeout(() => {
      removeFromCart(id);
      setRemoving(null);
    }, 350);
  };

  const shipping = subtotal > 500 ? 0 : 25;
  const total = subtotal + shipping;

  /* ── Empty State ── */
  if (!cart.length)
    return (
      <div className="min-h-screen bg-[#030303] text-white flex flex-col items-center justify-center px-6 relative overflow-hidden">
        <Noise />
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.08, 0.15, 0.08] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute w-[600px] h-[600px] rounded-full bg-[#0b6472] blur-[180px] -z-10"
        />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="w-20 h-20 rounded-full border border-white/10 bg-white/[0.03] flex items-center justify-center mx-auto mb-6">
            <FaShoppingBag className="text-[#0b6472]" size={28} />
          </div>
          <h2 className="text-2xl font-black uppercase tracking-tight mb-2">Your Vault is Empty</h2>
          <p className="text-gray-500 text-xs uppercase tracking-[0.35em] mb-8">No artworks added yet</p>
          <Link
            to="/paintings"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#0b6472] font-black uppercase tracking-widest text-[11px] hover:bg-[#0d7a8a] transition-all hover:scale-105"
          >
            Browse Collection <FaArrowRight size={10} />
          </Link>
        </motion.div>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#030303] text-white pt-24 pb-24 px-5 md:px-8 relative overflow-x-hidden">
      <Noise />

      {/* Background orbs */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div animate={{ scale: [1, 1.06, 1], opacity: [0.1, 0.16, 0.1] }} transition={{ duration: 9, repeat: Infinity }} className="absolute top-[-10%] right-[-5%] w-[50vw] h-[50vw] rounded-full bg-[#0b6472] blur-[160px]" />
        <motion.div animate={{ scale: [1, 1.04, 1], opacity: [0.05, 0.09, 0.05] }} transition={{ duration: 12, repeat: Infinity, delay: 4 }} className="absolute bottom-[-5%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-[#0b6472] blur-[200px]" />
      </div>

      <div className="max-w-6xl mx-auto">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <p className="text-[10px] font-extrabold text-[#0b6472] uppercase tracking-[0.4em] mb-2">Your Selection</p>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-none">
              Art <span className="text-[#0b6472]">Vault</span>
            </h1>
            <p className="text-gray-500 text-[11px] uppercase tracking-widest mt-2 font-mono">
              {cart.reduce((s, i) => s + (i.qty || 1), 0)} item{cart.reduce((s, i) => s + (i.qty || 1), 0) !== 1 ? "s" : ""} in collection
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={clearCart}
            className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-bold text-gray-500 hover:text-red-400 transition-colors border border-white/10 hover:border-red-400/30 px-4 py-2.5 rounded-full"
          >
            <FaTrash size={9} /> Clear All
          </motion.button>
        </motion.div>

        {/* ── Main Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-start">

          {/* ── Cart Items ── */}
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {cart.map((item, i) => (
                <motion.div
                  key={item._id}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: removing === item._id ? 0 : 1, x: removing === item._id ? 40 : 0, y: 0 }}
                  exit={{ opacity: 0, x: 60, transition: { duration: 0.3 } }}
                  transition={{ delay: i * 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative flex gap-4 p-4 rounded-3xl border border-white/5 bg-white/[0.02] hover:border-[#0b6472]/30 hover:bg-white/[0.04] transition-all duration-400 overflow-hidden"
                >
                  {/* Hover glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0b6472]/0 via-[#0b6472]/0 to-[#0b6472]/0 group-hover:from-[#0b6472]/5 transition-all duration-500 rounded-3xl pointer-events-none" />

                  {/* Image */}
                  <div className="relative w-20 h-24 md:w-24 md:h-28 rounded-2xl overflow-hidden bg-black/40 shrink-0">
                    <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="font-black uppercase tracking-tight text-sm md:text-base truncate text-white">{item.title}</h3>
                        <p className="text-gray-500 text-[10px] uppercase tracking-widest mt-1">
                          {item.artist || "Unknown"} &nbsp;·&nbsp; {item.category || "Artwork"}
                        </p>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleRemove(item._id)}
                        className="w-8 h-8 rounded-full border border-white/10 hover:border-red-400/50 hover:text-red-400 text-gray-500 flex items-center justify-center transition-all shrink-0"
                      >
                        <FaTrash size={9} />
                      </motion.button>
                    </div>

                    <div className="flex items-center justify-between gap-4 mt-3">
                      {/* Qty controls */}
                      <div className="flex items-center gap-1.5 bg-white/[0.04] border border-white/10 rounded-xl p-1">
                        <motion.button
                          whileTap={{ scale: 0.85 }}
                          onClick={() => decreaseQty(item._id)}
                          className="w-7 h-7 rounded-lg bg-white/5 hover:bg-[#0b6472]/30 transition-colors text-sm font-bold"
                        >−</motion.button>
                        <span className="w-8 text-center font-mono text-sm font-bold">{item.qty || 1}</span>
                        <motion.button
                          whileTap={{ scale: 0.85 }}
                          onClick={() => increaseQty(item._id)}
                          className="w-7 h-7 rounded-lg bg-white/5 hover:bg-[#0b6472]/30 transition-colors text-sm font-bold"
                        >+</motion.button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="text-[#0b6472] font-black text-base">${((Number(item.price) || 0) * (item.qty || 1)).toLocaleString()}</p>
                        <p className="text-gray-600 text-[10px] font-mono">${(Number(item.price) || 0).toLocaleString()} each</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* ── Order Summary ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:sticky lg:top-28"
          >
            <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 relative overflow-hidden">
              {/* Corner accents */}
              {["top-4 left-4 border-t border-l","top-4 right-4 border-t border-r","bottom-4 left-4 border-b border-l","bottom-4 right-4 border-b border-r"].map((cls, i) => (
                <div key={i} className={`absolute ${cls} w-4 h-4 border-[#0b6472]/40`} />
              ))}

              <p className="text-[10px] font-extrabold text-[#0b6472] uppercase tracking-[0.4em] mb-6">Order Summary</p>

              {/* Line items */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400 text-[11px] uppercase tracking-widest">Subtotal</span>
                  <span className="font-bold font-mono">${Number(subtotal).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400 text-[11px] uppercase tracking-widest">Shipping</span>
                  <span className={`font-bold font-mono ${shipping === 0 ? "text-green-400" : ""}`}>
                    {shipping === 0 ? "FREE" : `$${shipping}`}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-[10px] text-gray-600 font-mono">Free shipping on orders over $500</p>
                )}
              </div>

              {/* Divider */}
              <div className="h-[1px] bg-gradient-to-r from-[#0b6472]/40 via-white/10 to-transparent mb-6" />

              {/* Total */}
              <div className="flex justify-between items-end mb-8">
                <span className="text-[11px] uppercase tracking-[0.35em] text-gray-400 font-extrabold">Total</span>
                <motion.span
                  key={total}
                  initial={{ scale: 0.85, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-3xl font-black tracking-tight"
                >
                  ${Number(total).toLocaleString()}
                </motion.span>
              </div>

              {/* CTA */}
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/checkout"
                  className="w-full h-13 py-4 rounded-2xl bg-white text-black font-black uppercase tracking-[0.3em] text-[11px] flex items-center justify-center gap-3 hover:bg-[#0b6472] hover:text-white transition-all duration-300 shadow-[0_18px_45px_-20px_rgba(11,100,114,0.5)]"
                >
                  Proceed to Checkout <FaArrowRight size={10} />
                </Link>
              </motion.div>

              <p className="mt-4 text-center text-gray-600 text-[9px] uppercase tracking-widest">
                Shipping &amp; taxes calculated at checkout
              </p>

              {/* Trust badges */}
              <div className="mt-6 pt-5 border-t border-white/5 grid grid-cols-3 gap-2 text-center">
                {["Secure Pay", "Verified Art", "Easy Returns"].map((t) => (
                  <div key={t} className="flex flex-col items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#0b6472] animate-pulse" />
                    <span className="text-[9px] text-gray-600 uppercase tracking-widest font-bold">{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}