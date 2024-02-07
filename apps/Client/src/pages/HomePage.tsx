import { FC } from "react";
import HeroSection from "../components/HomePage/HeroSection";
import Footer from "../components/Common/Footer/Footer";
import NavBar from "../components/Common/NavBar/NavBar";
import Services from "../components/HomePage/Services/Services";
import Testimonial from "../components/HomePage/Testimonial/Testimonial";
import DeliverySection from "../components/HomePage/DeliverySection";

const HomePage: FC = () => {
  return (
    <div>
      <NavBar />
      <HeroSection />
      <Services />
      <DeliverySection />
      <Testimonial />
      <Footer />
    </div>
  );
};

export default HomePage;
