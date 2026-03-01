import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaDatabase } from "react-icons/fa";

const ProductsPage = () => {
  const [paintings, setPaintings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPaintings = async () => {
      console.log("📡 Connecting to Backend...");
      try {
        // .env ke mutabiq port 4080 use kar rahe hain
        const res = await axios.get("http://localhost:4080/api/art");

        console.log("✅ Backend Response:", res.data);

        // ✅ FIX 1: paintings state me hamesha array hi set karo
        const arts = Array.isArray(res.data?.data)
          ? res.data.data
          : Array.isArray(res.data)
          ? res.data
          : [];

        // ✅ FIX 2: success field ho ya na ho, data agar array hai to show kar do
        if (arts.length > 0) {
          setPaintings(arts);

          // ✅ FIX 3: cache me bhi array save karo
          localStorage.setItem("cached_art", JSON.stringify(arts));

          // ✅ FIX 4: agar pehle error tha to clear
          setError(null);
        } else {
          // agar backend ne empty array diya hai to empty hi show hoga (valid case)
          setPaintings([]);
        }
      } catch (err) {
        console.error("❌ API Error:", err.message);
        setError("Backend se connection nahi ho paa raha.");

        // ✅ FIX 5: cached data fallback (array)
        const cached = localStorage.getItem("cached_art");
        if (cached) {
          try {
            const parsed = JSON.parse(cached);
            if (Array.isArray(parsed)) setPaintings(parsed);
          } catch (e) {
            // ignore cache parse error
          }
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPaintings();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen bg-black flex items-center justify-center flex-col gap-4">
        <div className="w-12 h-12 border-4 border-[#0b6472] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-white font-mono tracking-widest animate-pulse">
          FETCHING FROM CLOUD...
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-32 pb-20 px-5">
      <div className="max-w-7xl mx-auto">
        {/* Connection Status Indicator */}
        <div className="flex items-center justify-center gap-2 mb-10">
          <div
            className={`w-2 h-2 rounded-full ${
              error ? "bg-red-500" : "bg-green-500"
            } animate-ping`}
          ></div>
          <span className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.3em]">
            {error ? "Offline Mode" : "Live Backend Connected"}
          </span>
        </div>

        <div className="mb-20 text-center">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase italic">
            Art <span className="text-[#0b6472] not-italic">Vault</span>
          </h1>

          {/* ✅ FIX: paintings hamesha array hai, length safe */}
          <p className="text-gray-500 mt-4 font-mono tracking-widest text-xs">
            Total Items in Collection: {paintings.length}
          </p>
        </div>

        {paintings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paintings.map((art) => (
              <motion.div
                key={art._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#0c0c0c] border border-white/5 rounded-[24px] overflow-hidden group hover:border-[#0b6472] transition-all duration-500"
              >
                <div className="h-[400px] overflow-hidden relative">
                  <img
                    src={art.imageUrl}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                    alt={art.title}
                  />
                  <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1 rounded text-[10px] font-bold border border-white/10 tracking-widest uppercase">
                    {art.category}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold tracking-tight">
                      {art.title}
                    </h3>
                    <p className="text-[#0b6472] font-black text-xl">
                      ${art.price}
                    </p>
                  </div>

                  <p className="text-gray-500 text-sm mb-6 line-clamp-2 font-light italic leading-relaxed">
                    {art.description}
                  </p>

                  <div className="flex items-center justify-between border-t border-white/5 pt-5">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#0b6472] to-black flex items-center justify-center text-[10px] font-bold text-white">
                        {(art.artist?.charAt?.(0) || "?")}
                      </div>
                      <span className="text-[11px] font-bold text-gray-400 uppercase tracking-tighter">
                        {art.artist}
                      </span>
                    </div>

                    <button className="text-[11px] font-bold text-white bg-[#0b6472] px-5 py-2 rounded-full hover:scale-105 transition-transform uppercase">
                      View Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white/5 rounded-[40px] border border-dashed border-white/10">
            <FaDatabase className="mx-auto text-gray-700 mb-4 size-10" />
            <p className="text-gray-500 font-mono italic">
              "The gallery is currently empty. Add paintings via
              Postman/Backend to see them here."
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;