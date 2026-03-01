// src/App.jsx
import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Page/Home"; // Tumhara existing home
import ProductsPage from "./Page/ProductsPage"; // Paintings page

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/paintings" element={<ProductsPage />} />
      </Routes>
    </Router>
  );
}