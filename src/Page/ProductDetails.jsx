import React, { useEffect, useState, useMemo, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  FaChevronLeft,
  FaShoppingCart,
  FaPaintBrush,
  FaFingerprint,
  FaCheck,
} from "react-icons/fa";
import { useCart } from "../context/CartContext";

/* ─── tiny helpers ─── */
const Char = ({ char, delay }) => (
  <motion.span
    style={{ display: "inline-block", willChange: "transform, opacity" }}
    initial={{ y: 60, opacity: 0, rotateX: -90 }}
    animate={{ y: 0, opacity: 1, rotateX: 0 }}
    transition={{ delay, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
  >
    {char === " " ? "\u00A0" : char}
  </motion.span>
);

const SplitTitle = ({ text }) => (
  <span style={{ perspective: 800, display: "inline-block" }}>
    {text.split("").map((c, i) => (
      <Char key={i} char={c} delay={0.3 + i * 0.032} />
    ))}
  </span>
);

/* ─── noise svg overlay (atmospheric) ─── */
const NoiseOverlay = () => (
  <svg
    className="pointer-events-none fixed inset-0 w-full h-full opacity-[0.035] z-50"
    style={{ mixBlendMode: "overlay" }}
  >
    <filter id="noise">
      <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch" />
      <feColorMatrix type="saturate" values="0" />
    </filter>
    <rect width="100%" height="100%" filter="url(#noise)" />
  </svg>
);

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const imgRef = useRef(null);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:4080/api/art/${id}`);
        setProduct(res.data?.data || res.data);
      } catch (err) {
        console.error("❌ Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const money = useMemo(() => {
    if (!product?.price && product?.price !== 0) return "";
    const n = Number(product.price);
    return Number.isNaN(n) ? String(product.price) : n.toLocaleString();
  }, [product?.price]);

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  /* ── Loading ── */
  if (loading)
    return (
      <div className="min-h-screen bg-[#030303] flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-10 h-10 rounded-full border-2 border-transparent border-t-[#0b6472]"
        />
      </div>
    );

  if (!product)
    return (
      <div className="min-h-screen bg-[#030303] text-white flex items-center justify-center font-mono tracking-widest text-sm">
        ART NOT FOUND
      </div>
    );

  return (
    <div ref={containerRef} className="min-h-screen bg-[#030303] text-white overflow-x-hidden">
      <NoiseOverlay />

      {/* ── Animated Background ── */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.12, 0.18, 0.12] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full bg-[#0b6472] blur-[160px]"
        />
        <motion.div
          animate={{ scale: [1, 1.05, 1], opacity: [0.06, 0.1, 0.06] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute bottom-[-10%] right-[-15%] w-[60vw] h-[60vw] rounded-full bg-[#0b6472] blur-[200px]"
        />
        {/* scanline */}
        <motion.div
          animate={{ y: ["-100%", "200%"] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear", delay: 2 }}
          className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#0b6472]/30 to-transparent"
        />
      </div>

      {/* ── Page content ── */}
      <div className="max-w-7xl mx-auto px-5 md:px-8 pt-24 pb-24">

        {/* Back button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          onClick={() => navigate(-1)}
          className="group mb-12 flex items-center gap-3 text-gray-500 hover:text-white transition-colors duration-300"
        >
          <span className="relative w-9 h-9 rounded-full border border-white/10 flex items-center justify-center overflow-hidden">
            <motion.span
              className="absolute inset-0 bg-[#0b6472]"
              initial={{ scale: 0 }}
              whileHover={{ scale: 1 }}
              transition={{ duration: 0.3 }}
              style={{ borderRadius: "50%" }}
            />
            <FaChevronLeft className="relative text-[10px] z-10" />
          </span>
          <span className="text-[10px] font-extrabold uppercase tracking-[0.35em]">
            Back to Collection
          </span>
        </motion.button>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* ── LEFT: Image ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Frame */}
            <div className="relative">
              {/* outer glow ring */}
              <motion.div
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -inset-[3px] rounded-[28px] bg-gradient-to-br from-[#0b6472]/50 via-transparent to-[#0b6472]/20 blur-[2px]"
              />

              <div className="relative rounded-3xl border border-white/10 bg-[#0a0a0a] p-3 overflow-hidden">
                {/* Corner accents */}
                {["top-3 left-3", "top-3 right-3", "bottom-3 left-3", "bottom-3 right-3"].map((pos, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + i * 0.08, duration: 0.4 }}
                    className={`absolute ${pos} w-4 h-4 border-[#0b6472]/60 z-10 ${
                      i === 0 ? "border-t border-l" : i === 1 ? "border-t border-r" : i === 2 ? "border-b border-l" : "border-b border-r"
                    }`}
                  />
                ))}

                <div className="rounded-2xl overflow-hidden relative">
                  {/* Loading shimmer */}
                  <AnimatePresence>
                    {!imgLoaded && (
                      <motion.div
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-[#111] z-10"
                      >
                        <motion.div
                          animate={{ x: ["-100%", "100%"] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                          className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.div style={{ y: imgY, scale: imgScale }}>
                    <img
                      ref={imgRef}
                      src={product.imageUrl}
                      alt={product.title}
                      onLoad={() => setImgLoaded(true)}
                      className="w-full h-auto max-h-[75vh] object-contain block"
                    />
                  </motion.div>
                </div>
              </div>

              {/* Seal badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0, rotate: -45 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ delay: 0.9, duration: 0.5, type: "spring", stiffness: 150 }}
                className="absolute -top-4 -right-4 w-14 h-14 rounded-full border border-[#0b6472]/40 bg-[#030303] shadow-[0_0_24px_rgba(11,100,114,0.4)] flex items-center justify-center"
              >
                <FaFingerprint className="text-[#0b6472]" size={20} />
              </motion.div>
            </div>

            {/* Meta row */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.5 }}
              className="mt-5 flex flex-wrap items-center gap-3 text-[10px] text-gray-500"
            >
              <span className="px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] tracking-wider uppercase">
                Original Verified
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="font-mono tracking-widest uppercase opacity-60">
                Ref: {product._id?.slice(-12)}
              </span>
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Info ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-0"
          >
            {/* Category */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.5 }}
              className="flex items-center gap-3 mb-5"
            >
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: 40 }}
                transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
                className="h-[1px] bg-[#0b6472] block"
              />
              <span className="text-[10px] font-extrabold text-[#0b6472] uppercase tracking-[0.4em]">
                {product.category || "Artwork"}
              </span>
            </motion.div>

            {/* Title */}
            <h1
              className="font-black uppercase leading-[0.9] tracking-[-0.03em] text-4xl sm:text-5xl xl:text-6xl mb-5"
              style={{ perspective: "800px" }}
            >
              <SplitTitle text={product.title || ""} />
            </h1>

            {/* Artist */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.55, duration: 0.45 }}
              className="flex items-center gap-3 mb-8"
            >
              <FaPaintBrush size={11} className="text-[#0b6472]" />
              <span className="text-sm uppercase tracking-[0.22em] text-gray-300 font-semibold">
                {product.artist || "Unknown"}
              </span>
            </motion.div>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.6, duration: 0.7, ease: "easeOut" }}
              style={{ originX: 0 }}
              className="h-[1px] bg-gradient-to-r from-[#0b6472]/60 via-white/10 to-transparent mb-8"
            />

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="mb-10"
            >
              <p className="text-[10px] text-gray-600 uppercase tracking-[0.4em] font-extrabold mb-3">
                Description
              </p>
              <div className="relative pl-5 border-l border-[#0b6472]/50">
                <motion.span
                  initial={{ height: 0 }}
                  animate={{ height: "100%" }}
                  transition={{ delay: 0.85, duration: 0.7 }}
                  className="absolute left-0 top-0 w-[2px] bg-[#0b6472] block"
                />
                <p className="text-gray-300 text-[15px] font-light leading-relaxed">
                  {product.description || "—"}
                </p>
              </div>
            </motion.div>

            {/* Price */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="mb-8"
            >
              <p className="text-[10px] text-gray-600 uppercase tracking-[0.4em] font-extrabold mb-2">
                Investment Value
              </p>
              <div className="flex items-baseline gap-3">
                <motion.span
  initial={{ opacity: 0, scale: 0.6 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ delay: 0.95, duration: 0.5, type: "spring", stiffness: 120 }}
  className="text-4xl md:text-5xl font-black tracking-tight"
>
  PKR {money}
</motion.span>
                <span className="text-[#0b6472] font-mono text-xs tracking-widest"></span>
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleAddToCart}
                className="relative w-100 h-14 rounded-2xl overflow-hidden font-extrabold uppercase text-[11px] tracking-[0.35em] flex items-center justify-center gap-3"
              >
                {/* bg layers */}
                <motion.span
                  animate={{ x: added ? "0%" : "-100%" }}
                  transition={{ duration: 0.45, ease: "easeInOut" }}
                  className="absolute inset-0 bg-green-500"
                />
                <motion.span
                  animate={{ x: added ? "100%" : "0%" }}
                  transition={{ duration: 0.45, ease: "easeInOut" }}
                  className="absolute inset-0 bg-white"
                />

                {/* ripple on hover */}
                <span className="absolute inset-0 group">
                  <span className="absolute inset-0 bg-[#0b6472] scale-0 group-hover:scale-100 rounded-2xl transition-transform duration-500 origin-center opacity-0 group-hover:opacity-100" />
                </span>

                <AnimatePresence mode="wait">
                  {added ? (
                    <motion.span
                      key="done"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="relative z-10 flex items-center gap-2 text-white"
                    >
                      <FaCheck /> Added to Collection
                    </motion.span>
                  ) : (
                    <motion.span
                      key="add"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="relative z-10 flex items-center gap-2 text-black"
                    >
                      <FaShoppingCart /> Add to Collection
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.div>

            {/* Footer row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.6 }}
              className="mt-7 pt-6 border-t border-white/5 flex items-center justify-between text-[10px] text-gray-600 uppercase tracking-[0.25em]"
            >
              <span>Authenticity</span>
              <span className="text-gray-400 font-mono tracking-widest flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Verified · Museum Grade
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}