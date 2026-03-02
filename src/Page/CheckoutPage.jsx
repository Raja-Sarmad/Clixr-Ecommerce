import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { 
  FaUser, FaPhone, FaEnvelope, FaCity, FaMapMarkerAlt, 
  FaStickyNote, FaMoneyBillWave, FaCreditCard, FaUniversity, 
  FaShoppingBag, FaLock, FaChevronRight 
} from "react-icons/fa";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, subtotal, placeOrder } = useCart();

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    note: "",
  });

  const shipping = useMemo(() => (subtotal > 0 ? 0 : 0), [subtotal]);
  const total = subtotal + shipping;

  const onChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    if (!cart.length) return;
    if (!form.name || !form.phone || !form.address || !form.city) {
      alert("Please fill: Name, Phone, Address, City");
      return;
    }
    placeOrder({
      customer: form,
      payment: { method: paymentMethod, status: "requested" },
      totals: { subtotal, shipping, total },
    });
    navigate("/success");
  };

  if (!cart.length) {
    return (
      <div className="min-h-screen bg-[#050505] text-white pt-28 px-6">
        <div className="max-w-4xl mx-auto p-10 rounded-3xl border border-white/10 bg-white/[0.03] text-center">
          <FaShoppingBag className="mx-auto text-gray-700 mb-4 size-10" />
          <p className="text-gray-300 uppercase tracking-[0.35em] text-xs font-bold">
            Cart is empty
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-28 px-6 pb-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Form */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:p-10 backdrop-blur-sm">
            <div className="flex items-center gap-4 mb-8">
               <div className="w-12 h-12 rounded-2xl bg-[#0b6472]/20 flex items-center justify-center text-[#0b6472]">
                  <FaLock size={20} />
               </div>
               <div>
                  <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight">Checkout</h1>
                  <p className="text-gray-500 text-[10px] uppercase tracking-widest mt-1 font-bold">Secure Acquisition Portal</p>
               </div>
            </div>

            <form onSubmit={onSubmit} className="space-y-8">
              {/* Customer Details */}
              <div className="space-y-4">
                <p className="text-[10px] text-[#0b6472] uppercase tracking-[0.4em] font-black flex items-center gap-2">
                  <FaUser size={10} /> Customer Information
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative group">
                    <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-[#0b6472] transition-colors" />
                    <input
                      className="h-14 w-full rounded-2xl bg-black/40 border border-white/5 pl-12 pr-4 outline-none focus:border-[#0b6472]/50 transition-all text-sm"
                      placeholder="Full Name"
                      name="name"
                      value={form.name}
                      onChange={onChange}
                    />
                  </div>
                  <div className="relative group">
                    <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-[#0b6472] transition-colors" />
                    <input
                      className="h-14 w-full rounded-2xl bg-black/40 border border-white/5 pl-12 pr-4 outline-none focus:border-[#0b6472]/50 transition-all text-sm"
                      placeholder="Phone Number"
                      name="phone"
                      value={form.phone}
                      onChange={onChange}
                    />
                  </div>
                  <div className="relative group">
                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-[#0b6472] transition-colors" />
                    <input
                      className="h-14 w-full rounded-2xl bg-black/40 border border-white/5 pl-12 pr-4 outline-none focus:border-[#0b6472]/50 transition-all text-sm"
                      placeholder="Email Address"
                      name="email"
                      value={form.email}
                      onChange={onChange}
                    />
                  </div>
                  <div className="relative group">
                    <FaCity className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-[#0b6472] transition-colors" />
                    <input
                      className="h-14 w-full rounded-2xl bg-black/40 border border-white/5 pl-12 pr-4 outline-none focus:border-[#0b6472]/50 transition-all text-sm"
                      placeholder="City"
                      name="city"
                      value={form.city}
                      onChange={onChange}
                    />
                  </div>
                </div>

                <div className="relative group">
                  <FaMapMarkerAlt className="absolute left-4 top-5 text-gray-600 group-focus-within:text-[#0b6472] transition-colors" />
                  <textarea
                    className="w-full min-h-[80px] rounded-2xl bg-black/40 border border-white/5 pl-12 pr-4 py-4 outline-none focus:border-[#0b6472]/50 transition-all text-sm"
                    placeholder="Complete Delivery Address"
                    name="address"
                    value={form.address}
                    onChange={onChange}
                  />
                </div>

                <div className="relative group">
                  <FaStickyNote className="absolute left-4 top-5 text-gray-600 group-focus-within:text-[#0b6472] transition-colors" />
                  <textarea
                    className="w-full min-h-[80px] rounded-2xl bg-black/40 border border-white/5 pl-12 pr-4 py-4 outline-none focus:border-[#0b6472]/50 transition-all text-sm"
                    placeholder="Order Note (Special Instructions)"
                    name="note"
                    value={form.note}
                    onChange={onChange}
                  />
                </div>
              </div>

              {/* Payment Selection */}
              <div className="space-y-4 pt-4">
                <p className="text-[10px] text-[#0b6472] uppercase tracking-[0.4em] font-black flex items-center gap-2">
                   <FaCreditCard size={10} /> Payment Architecture
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    { id: "cod", label: "Cash On Delivery", icon: <FaMoneyBillWave /> },
                    { id: "card", label: "Online Card", icon: <FaCreditCard /> },
                    { id: "bank", label: "Bank Wire", icon: <FaUniversity /> },
                  ].map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setPaymentMethod(m.id)}
                      className={[
                        "flex flex-col items-center justify-center gap-3 p-5 rounded-2xl border transition-all duration-300",
                        paymentMethod === m.id
                          ? "border-[#0b6472] bg-[#0b6472]/10 text-white shadow-[0_0_20px_rgba(11,100,114,0.15)]"
                          : "border-white/5 bg-white/[0.02] text-gray-500 hover:border-white/20",
                      ].join(" ")}
                    >
                      <span className={paymentMethod === m.id ? "text-[#0b6472]" : "text-gray-600"}>{m.icon}</span>
                      <span className="text-[9px] font-black uppercase tracking-widest">{m.label}</span>
                    </button>
                  ))}
                </div>

                {paymentMethod === "bank" && (
                  <div className="p-5 rounded-2xl border border-[#0b6472]/20 bg-[#0b6472]/5 animate-in fade-in slide-in-from-top-2 duration-500">
                    <p className="text-[10px] font-black uppercase text-[#0b6472] tracking-widest flex items-center gap-2">
                      <FaUniversity /> Bank Repository Details
                    </p>
                    <div className="mt-3 text-xs text-gray-400 space-y-1 font-mono">
                      <p>ACCOUNT: 0422-983321-01</p>
                      <p>BANK: STANDARD VAULT LTD.</p>
                      <p>BENEFICIARY: RED ART GALLERY</p>
                    </div>
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="group w-full h-16 rounded-2xl bg-white text-black font-black uppercase tracking-[0.4em] text-[11px] hover:bg-[#0b6472] hover:text-white transition-all duration-500 flex items-center justify-center gap-3"
              >
                Place Official Order <FaChevronRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>

        {/* Right: Summary */}
        <div className="lg:col-span-5">
          <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-sm sticky top-28">
            <p className="text-[10px] text-[#0b6472] uppercase tracking-[0.4em] font-black mb-6 flex items-center gap-2">
               <FaShoppingBag size={10} /> Your Selection
            </p>

            <div className="space-y-5 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {cart.map((it) => (
                <div key={it._id} className="flex items-center gap-4 group">
                  <div className="w-14 h-16 rounded-xl overflow-hidden bg-black/40 border border-white/5 shrink-0">
                    <img src={it.imageUrl} alt={it.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-black uppercase truncate tracking-widest">{it.title}</p>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">
                      Qty: <span className="text-white">{it.qty || 1}</span>
                    </p>
                  </div>
                  <p className="text-[#0b6472] font-black text-sm italic">
                    ${(Number(it.price) || 0).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-white/5 space-y-4">
              <div className="flex justify-between text-[10px] uppercase tracking-widest text-gray-500 font-bold">
                <span>Value Subtotal</span>
                <span className="text-gray-300">${Number(subtotal).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[10px] uppercase tracking-widest text-gray-500 font-bold">
                <span>Insurance & Shipping</span>
                <span className="text-[#0b6472]">FREE</span>
              </div>
              <div className="flex justify-between text-white pt-4">
                <span className="text-xs uppercase tracking-[0.4em] font-black">Total Investment</span>
                <span className="text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
                  ${Number(total).toLocaleString()}
                </span>
              </div>
            </div>

            <div className="mt-8 p-4 rounded-xl border border-white/5 bg-black/20">
               <p className="text-[8px] text-gray-600 uppercase tracking-[0.2em] leading-relaxed">
                  By placing this order, you agree to our terms of artistic acquisition and secure delivery protocols.
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}