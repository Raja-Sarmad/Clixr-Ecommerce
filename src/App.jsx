import { Features } from "tailwindcss";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";

import GalleryPage from "./components/GalleryPage";
import TextSliderSection from "./components/TextSliderSection";
import AboutSection from "./components/AboutSection";
import ShapingIndustrySection from "./components/ShapingIndustrySection";
import Product from "./components/Product";
import HappilyCustomer from "./components/HappilyCustomer";
import AllInOneProduct from "./components/AllInOneProduct";




export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <GalleryPage />
      <TextSliderSection />
      <AboutSection />
      <ShapingIndustrySection />
      <Product />
      <AllInOneProduct />
      <HappilyCustomer />
      
      
    </>
  );
}