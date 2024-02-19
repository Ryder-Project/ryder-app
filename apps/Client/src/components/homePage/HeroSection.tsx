import { FC } from "react";
import {Link} from 'react-router-dom'
import Button from "../Common/Button/Button";
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

      <div className="grid grid-cols-2 space-x-4">
        <Link to="/signup/customer">
          <Button className="border-2 border-white hover:bg-orange-400 hover:border-orange-400 px-8 py-4 rounded-md ">
            Register as a Customer
          </Button>
        </Link>
        <Link to="/signup/rider">
          <Button className=" border-2 border-white hover:bg-orange-400 hover:border-orange-400 px-8 py-4 rounded-md ">
            Register as a Rider
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;
