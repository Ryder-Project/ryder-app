import React from "react";
import { TiPencil } from "react-icons/ti";

const Settings: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="max-w-md w-full  rounded-md pt-2">
        <h1
          className="text-xl text-center font-semibold mb-8"
          style={{ background: "#FFF", color: "#03435F" }}
        >
          Profile Settings
        </h1>
        <div className="border border-gray-300 p-8">
          <div className="mb-6 mt-0 text-start">
            <h1 className="text-sx pb-1">Basic Information</h1>
            <h5 className="text-gray-400">
              Only you can view and edit your information
            </h5>
          </div>

          <form className="max-w-md w-full">
            <div className="mb-4">
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-600"
              >
                First Name
              </label>
              <div className="relative flex items-center">
                <input
                  type="text"
                  id="firstName"
                  placeholder="Matthew"
                  className="bg-gray-100 mt-1 pl-4 pt-2 pr-2 pb-2 w-full border rounded-none focus:outline-none focus:border-orange-500"
                />
                <span className="absolute right-6 text-gray-400">
                  <TiPencil />
                </span>
              </div>
            </div>

           
            <div className="mb-4">
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-600"
              >
                Last Name
              </label>
              <div className="relative flex items-center">
                <input
                  type="text"
                  id="lastName"
                  placeholder="Adebayo"
                  className="bg-gray-100 mt-1 pl-4 pt-2 pr-2 pb-2 w-full border rounded-none focus:outline-none focus:border-orange-500"
                />
                <span className="absolute right-6 text-gray-400">
                  <TiPencil />
                </span>
              </div>
            </div>

            
            <div className="mb-4">
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-600"
              >
                Phone Number
              </label>
              <div className="relative flex items-center">
                <input
                  type="tel"
                  id="phoneNumber"
                  placeholder="07032892347"
                  className="bg-gray-100 mt-1 pl-4 pt-2 pr-2 pb-2 w-full border rounded-none focus:outline-none focus:border-orange-500"
                />
                <span className="absolute right-6 text-gray-400">
                  <TiPencil />
                </span>
              </div>
            </div>

            {/* Email */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-600"
              >
                Email
              </label>
              <div className="relative flex items-center">
                <input
                  type="email"
                  id="email"
                  placeholder="ryder@gmail.com"
                  className="mt-1 pl-4 pt-2 pr-2 pb-2 w-full border rounded-none focus:outline-none focus:border-orange-500 bg-gray-100"
                />
                <span className="absolute right-6 text-gray-400">
                  <TiPencil />
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="bg-orange-500 w-full text-white  mt-4 py-2 px-4 rounded-none hover:bg-orange-600 focus:outline-none focus:ring focus:border-orange-300"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;



