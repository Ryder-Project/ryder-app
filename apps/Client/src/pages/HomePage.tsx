import { FC } from "react";
import DeliverySection from "../components/homePage/DeliverySection";
import HeroSection from "../components/homePage/HeroSection";
import Footer from "../components/homePage/common/footer/Footer";
import NavBar from "../components/homePage/common/navBar/NavBar";
import Services from "../components/homePage/services/Services";
import Testimonial from "../components/homePage/testimonial/Testimonial";


const HomePage: FC = () => {
  return (
    <div>
     
      <NavBar />
      <HeroSection />
      <Services />
      <DeliverySection/>
      <Testimonial/>
      <Footer />
    </div>
  );
};

export default HomePage;
