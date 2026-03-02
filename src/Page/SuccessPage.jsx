import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function SuccessPage() {
  const { lastOrder } = useCart();

  return (
    <div className="min-h-screen bg-[#050505] text-white px-6 pt-28 pb-16">
      {/* ✅ pt-28 = fixed navbar se neeche */}
      <div className="min-h-[calc(100vh-7rem)] flex items-start justify-center">
        {/* ✅ items-start so it doesn't push into navbar */}
        <div className="max-w-xl w-full text-center p-8 sm:p-10 rounded-3xl border border-white/10 bg-white/[0.03] mt-6">
          {/* ✅ extra top gap for clean look */}
          <p className="text-[#0b6472] font-black uppercase tracking-[0.35em] text-xs">
            Request Sent Successfully
          </p>

          <h1 className="mt-4 text-3xl md:text-4xl font-black uppercase tracking-tight">
            Thank You!
          </h1>

          <p className="mt-4 text-gray-400 text-sm leading-relaxed">
            Your order request has been submitted. We will contact you shortly.
          </p>

          {lastOrder && (
            <div className="mt-6 text-left p-5 rounded-2xl border border-white/10 bg-black/30">
              <p className="text-xs uppercase tracking-widest text-gray-500">
                Order ID
              </p>
              <p className="font-mono mt-1 text-sm text-white/90 break-all">
                {lastOrder.id}
              </p>

              <p className="text-xs uppercase tracking-widest text-gray-500 mt-4">
                Payment
              </p>
              <p className="mt-1 text-sm text-white/90">
                {lastOrder.payment?.method?.toUpperCase()} •{" "}
                {lastOrder.payment?.status}
              </p>
            </div>
          )}

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/paintings"
              className="h-12 px-6 rounded-2xl bg-white text-black font-black uppercase tracking-widest text-[11px] flex items-center justify-center hover:bg-[#0b6472] hover:text-white transition"
            >
              Continue Shopping
            </Link>

            <Link
              to="/cart"
              className="h-12 px-6 rounded-2xl border border-white/15 text-white font-black uppercase tracking-widest text-[11px] flex items-center justify-center hover:border-white/30 transition"
            >
              View Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}