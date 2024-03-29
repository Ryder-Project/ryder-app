import { FC } from 'react';
import HeroSection from '../components/homePage/HeroSection';
import Footer from '../components/common/footer/Footer';
import NavBar from '../components/common/navBar/NavBar';
import Services from '../components/homePage/services/Services';
import Testimonial from '../components/homePage/testimonial/Testimonial';
import DeliverySection from '../components/homePage/DeliverySection';

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
