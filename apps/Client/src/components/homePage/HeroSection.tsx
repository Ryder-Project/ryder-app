import { FC } from "react";
import { useNavigate } from "react-router-dom";

const HeroSection: FC = () => {
  const navigate = useNavigate();
  const handleRegisterRiderClick = () => {
    navigate("/signup");
  };
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
        <button
          onClick={handleRegisterRiderClick}
          className="border-2 border-white hover:bg-orange-400 px-8 py-4 rounded-md transition duration-300"
        >
          Register as a Rider
        </button>
        <button className="border-2 border-white hover:bg-orange-400 px-8 py-4 rounded-md transition duration-300">
          Register as a Customer
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
