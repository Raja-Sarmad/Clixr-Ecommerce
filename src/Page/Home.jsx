import React from 'react'
import Hero from "../components/Hero";
import GalleryPage from "../components/GalleryPage";
import TextSliderSection from "../components/TextSliderSection";
import AboutSection from "../components/AboutSection";
import ShapingIndustrySection from "../components/ShapingIndustrySection";
import Product from "../components/Product";
import HappilyCustomer from "../components/HappilyCustomer";
import AllInOneProduct from "../components/AllInOneProduct";
import CardStack from "../components/CardStack";
import ThreecardsSection from "../components/ThreecardsSection";
import Audience from "../components/Audience";
import ImageSlider from "../components/ImageSlider";
import Footer from '../components/Footer';

export const Home = () => {
  return (
    <>
     <Hero />
      <GalleryPage />
      <TextSliderSection />
      <AboutSection />
      <ShapingIndustrySection />
      <CardStack />
      <Product />
      <ThreecardsSection />
      <AllInOneProduct />
      <ImageSlider />
      <Audience />
      <HappilyCustomer />
      <Footer />
      </>
  )
}

export default Home;
