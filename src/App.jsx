import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./Page/Home";
import ProductsPage from "./Page/ProductsPage";
import ProductDetails from "./Page/ProductDetails"; // Naya page
import { CartProvider } from "./context/CartContext"; // Cart setup
import CartPage from "./Page/CartPage";
import CheckoutPage from "./Page/CheckoutPage";
import SuccessPage from "./Page/SuccessPage";
import Contact from "./Page/Contact";

// ✅ Naya import for Reviews page
import Reviews from "./components/Reviews";

export default function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/paintings" element={<ProductsPage />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/contact" element={<Contact />} />

          {/* ✅ Naya route for Reviews */}
          <Route path="/reviews" element={<Reviews />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}