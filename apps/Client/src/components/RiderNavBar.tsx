import React from "react";
import { Link } from "react-router-dom";

import Logo from "../../src/pages/Auth/Images/Logo.png";
import userImage from "../../src/assets/Ellipse 5.svg";
import notificationIcon from "../../src/assets/Notification.svg";

const Navbar: React.FC = () => {
  return (
    <div className=" bg-white shadow-lg p-4 flex justify-between items-center">
      {/* Left Section */}
      <div className="flex items-center ml-40">
        <img src={Logo} alt="Logo" className="h-full w-full" />
        <h1 className="text-white ml-2 text-lg font-bold">Ryder</h1>
      </div>

      {/* Center Section */}
      <div className="flex-grow flex justify-center">
        <Link to="/my-orders" className="text-[#21334F] mx-4 hover:underline">
          My Orders
        </Link>
        <Link to="/payment" className="text-[#21334F] mx-4 hover:underline">
          Payment
        </Link>
        <Link to="/logout" className="text-[#21334F] mx-4 hover:underline">
          Logout
        </Link>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-[32px]">
        <div className="mr-4">
          {/* Notification Bell Icon */}
          <img
            src={notificationIcon}
            alt="Notification Bell"
            className="h-6 w-6 text-white cursor-pointer"
          />
        </div>

        <div className="flex items-center mr-40">
          {/* User Image Component */}
          <img src={userImage} alt="User" className="h-6 w-6 rounded-full" />

          {/* User Name */}
          <p className="text-[#21334F] ml-2">Babatunde</p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
