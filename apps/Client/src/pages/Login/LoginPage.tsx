import React from 'react';
import { useForm } from 'react-hook-form';

// Import your logo and button here
import riderPhoto from "../Auth/Images/image 4.png";
import Button from '../../components/Button';
import riderLogo from "../Auth/Images/Logo.png";
import Icon from "../Auth/Images/Icon (1).png";
import Vector from "../Auth/Images/Vector (1).png"

const LoginPage: React.FC = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: unknown) => {
    // Handle the logic for requesting a rider using the form data
    console.log('Requesting rider with data:', data);
    // Add additional logic such as sending a request to your backend
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-white">
      {/* Left Half: Image with Text Overlay */}
      <div className="w-full hidden md:flex md:w-4/6 relative bg-cover bg-center h-80 md:h-screen overflow-hidden">
        <img src={riderPhoto} alt="bikeman" className="w-full h-full object-cover" />
        <div className="absolute inset-0 flex items-center justify-center text-white text-center bg-black bg-opacity-50">
          <div>
          <p className="text-lg md:text-xl lg:text-4xl font-bold mt-[720px]">
              Delivery service just got <br />
              easier, elegant & superb <br />
              <span style={{ marginLeft: '-15rem'}}>with</span> <span style={{ color: 'orange' }}>Ryder</span>
            </p>
          </div>
        </div>
      </div>

      {/* Right Half: Form */}
      <div className="w-full md:w-1/2 p-4 md:p-8 flex flex-col justify-center">
        {/* Logo and Title */}
        <div className="text-center mb-40">
          <img src={riderLogo} alt="Logo" className="w-40 mx-auto mt-10 ml-10" />
        </div>


        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto mb-60">
        <div className="text-xl font-bold pb-10 mr-40">Login</div>

          <div className="mb-3 relative">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              {...register('email')}
              className="w-full px-10 py-2 text-gray-700 border rounded-md focus:outline-none focus:shadow-outline"
              id="email"
              type="text"
              placeholder="Enter your Email"
              style={{ width: '110%' }} // Adjust the percentage as needed

            />
                          <img src={Icon} alt="email icon" className="absolute left-2 top-10" />

          </div>

          <div className="mb-3 relative">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              {...register('password')}
              className="w-full px-10 py-2 text-gray-700 border rounded-md focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Enter your password"
              style={{ width: '110%' }} // Adjust the percentage as needed

            />
             <img src={Vector} alt="password icon" className="absolute left-2 top-10" />

          </div>

          {/* Forgot Password */}
          <div className="mb-3 text-center mr-40">
            <a href="#" className="text-blue-500 hover:underline">
              Forgot Password?
            </a>
          </div>

          {/* Login Button */}
          <div>
            <Button type="submit">Log In</Button>
          </div>
          <div className="mt-7 text-center">
            <span>
              Don’t have an account? <span style={{ color: 'orange' }}>Create account</span>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
