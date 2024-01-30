import { FC } from "react";
import {Link} from 'react-router-dom'
const HeroSection: FC = () => {
  return (
    <div className="hero-background">
      <div className="text-center">
        <h1 className="text-6xl font-bold leading-tight mb-4">
          Fast, Reliable & Quality <br />
          Dispatch Service
        </h1>
        <p className="font-normal mb-8 text-lg">Send. Track. Receive.</p>
      </div>

      <div className="flex space-x-4">
        <Link to="/signup/rider">
          <button className="border-2 border-white hover:bg-orange-400 px-8 py-4 rounded-md transition duration-300">
            Register as a Rider
          </button>
        </Link>
        <Link to="/signup/rider">
          <button className="border-2 border-white hover:bg-orange-400 px-8 py-4 rounded-md transition duration-300">
            Register as a Customer
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;
