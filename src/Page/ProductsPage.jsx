import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaDatabase } from "react-icons/fa";
import { Link } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;

const ProductsPage = () => {
  const [paintings, setPaintings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPaintings = async () => {
      console.log("📡 Connecting to Backend...");
      try {
        const res = await axios.get(`${apiUrl}/api/art`);
        console.log("✅ Backend Response:", res.data);

        let arts = Array.isArray(res.data?.data)
          ? res.data.data
          : Array.isArray(res.data)
          ? res.data
          : [];

        // ✅ Sorting Logic: Art Work titles ko numerical order mein lane ke liye
        const sortedArts = arts.sort((a, b) => 
          a.title.localeCompare(b.title, undefined, { numeric: true, sensitivity: 'base' })
        );

        setPaintings(sortedArts);
        setError(null);
      } catch (err) {
        console.error("❌ API Error:", err.message);
        setError("Backend server is offline.");
        setPaintings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPaintings();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen bg-black flex items-center justify-center flex-col gap-4">
        <div className="w-10 h-10 border-4 border-[#0b6472] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-white font-mono tracking-widest text-xs animate-pulse">
          CONNECTING TO SERVER...
        </p>
      </div>
    );

  return (
    /* ✅ Navbar overlap fix ke liye pt-36 md:pt-48 kiya gaya hai */
    <div className="min-h-screen bg-[#050505] text-white pt-36 md:pt-48 pb-16 px-5">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="mb-14 text-center">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-tight">
            Art <span className="text-[#0b6472]">Vault</span>
          </h1>
          <p className="text-gray-500 mt-3 font-mono tracking-widest text-[11px]">
            Total Paintings: {paintings.length}
          </p>
        </div>

        {/* Grid */}
        {paintings.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {paintings.map((art, i) => (
              <motion.div
                key={art._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="bg-[#0c0c0c] border border-white/5 rounded-2xl overflow-hidden group hover:border-[#0b6472]/60 transition-all duration-400 hover:shadow-lg hover:shadow-[#0b6472]/10"
              >
                {/* Image Section */}
                <div className="aspect-[3/4] overflow-hidden relative bg-[#111]">
                  <img
                    src={art.imageUrl}
                    className="w-full h-full object-cover object-center transition-transform duration-600 group-hover:scale-105"
                    alt={art.title}
                  />
                  {/* Category Badge */}
                  <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm px-2.5 py-1 rounded-full text-[9px] font-bold border border-white/10 tracking-widest uppercase text-gray-300">
                    {art.category}
                  </div>
                </div>

                {/* Info Section */}
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2 gap-2">
                    <h3 className="text-sm font-bold tracking-tight leading-tight line-clamp-1 text-white">
                      {art.title}
                    </h3>
                    <p className="text-[#0b6472] font-black text-sm shrink-0">
                      PKR {art.price}
                    </p>
                  </div>

                  <p className="text-gray-500 text-[11px] mb-4 line-clamp-2 font-light leading-relaxed">
                    {art.description}
                  </p>

                  <div className="flex items-center justify-between border-t border-white/5 pt-3">
                    {/* Artist */}
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#0b6472] to-[#031e22] flex items-center justify-center text-[9px] font-bold text-white shrink-0">
                        {art.artist?.charAt(0) || "?"}
                      </div>
                      <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-tight line-clamp-1">
                        {art.artist}
                      </span>
                    </div>

                    {/* View Details Button */}
                    <Link
                      to={`/product/${art._id}`}
                      className="text-[10px] font-bold text-white bg-[#0b6472] px-3.5 py-1.5 rounded-full hover:bg-[#0d7a8a] hover:scale-105 transition-all uppercase shrink-0"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white/5 rounded-3xl border border-dashed border-white/10">
            <FaDatabase className="mx-auto text-gray-700 mb-4 size-8" />
            <p className="text-gray-500 font-mono text-sm">
              {error
                ? "Try Again After A Few Minutes."
                : "The gallery is currently empty."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};


export default ProductsPage;