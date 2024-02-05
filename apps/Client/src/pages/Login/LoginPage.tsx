import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import riderPhoto from '../../pages/Auth/Images/image 4.png';
import Button from '../../components/Button';
import riderLogo from '../../pages/Auth/Images/Logo.png';

interface FormData {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const VITE_LOGIN_URL = import.meta.env.VITE_LOGIN_URL;

      if (!VITE_LOGIN_URL) {
        throw new Error('VITE_LOGIN_URL is not defined');
      }

      const response = await fetch(VITE_LOGIN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        // Handle non-successful responses
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      // Login successful, you can perform additional actions if needed
      toast.success('Login successful');
    } catch (error) {
      // Display frontend-specific error message
      if (error instanceof Error) {
        if (error.message === 'Rider not found') {
          toast.error('You are not a registered rider. Please sign up.');
        } else {
          toast.error('An error occurred during login');
        }
      }
    }
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
              <span style={{ marginLeft: '-15rem' }}>with</span> <span style={{ color: 'orange' }}>Ryder</span>
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
              className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:shadow-outline"
              id="email"
              type="text"
              placeholder="Enter your Email"
              style={{ width: '110%' }}
            />
          </div>

          <div className="mb-3 relative">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              {...register('password')}
              className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Enter your password"
              style={{ width: '110%' }}
            />
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
              Don’t have an account?{' '}
              <span
                style={{ color: 'orange', cursor: 'pointer' }}
                onClick={() => {
                  // Redirect to the signup page
                  window.location.href = '/signup/rider';
                }}
              >
                Create account
              </span>
            </span>
          </div>
        </form>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
