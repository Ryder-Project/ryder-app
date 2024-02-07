import { FC } from "react";
import NavLink from "./NavLink";
import { RyderLogo } from "../../../assets/svg";
import MaxContainer from "../MaxContainer";
import { Link } from "react-router-dom";
const NavBar: FC = () => {
  return (
    <nav className="">
      <MaxContainer className="flex justify-between items-center">
        {/* Ryder Logo and Text */}
        <div className="flex items-center bg-none">
          <RyderLogo />
          <span className="font-bold text-3xl pl-2 text-zinc-900">Ryder</span>
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-4">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/services">Services</NavLink>
          <NavLink to="/contact">Contact Us</NavLink>
        </div>

        {/* Login Button */}
        <Link to="/login">
          <button className="text-sky-950 font-normal">Login</button>
        </Link>
      </MaxContainer>
    </nav>
  );
};

export default NavBar;
