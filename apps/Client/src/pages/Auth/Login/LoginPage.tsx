import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../../../components/Button";
import riderLogo from "../Images/Logo.png";
import riderPhoto from "../Images/image 4.png";
import { useNavigate } from "react-router-dom";

type LoginFormValues = {
  email: string;
  password: string;
};

const LoginPage: React.FC = () => {
  const { register, handleSubmit } = useForm<LoginFormValues>();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    try {
      const VITE_BE_BASE_URL = import.meta.env.VITE_BE_BASE_URL;

      if (!VITE_BE_BASE_URL) {
        throw new Error('VITE_LOGIN_URL is not defined');
      }
      setIsLoading(true);
      const response = await fetch(
        `${VITE_BE_BASE_URL}/api/v1/riders/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
          credentials: "include",
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        localStorage.setItem("token", responseData.token);
        toast.success("Login successful");
        setTimeout(() => {
          navigate("/riderprofilesettings");
        }, 2000);
      } else {
        const errorData = await response.json();
        console.error("Login failed:", errorData.message);
        toast.error("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("Error during login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-white">
      <div className="w-full hidden md:flex md:w-4/6 relative bg-cover bg-center h-80 md:h-screen overflow-hidden">
        <img
          src={riderPhoto}
          alt="bikeman"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center text-white text-center bg-black bg-opacity-50">
          <div>
            <p className="text-lg md:text-xl lg:text-4xl font-bold mt-[720px]">
              Delivery service just got <br />
              easier, elegant & superb <br />
              <span style={{ marginLeft: "-15rem" }}>with</span>{" "}
              <span style={{ color: "orange" }}>Ryder</span>
            </p>
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/2 p-4 md:p-8 flex flex-col justify-center">
        <div className="text-center mb-40">
          <img
            src={riderLogo}
            alt="Logo"
            className="w-40 mx-auto mt-10 ml-10"
          />
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-md mx-auto mb-60"
        >
          <div className="text-xl font-bold pb-10 mr-40">Login</div>

          <div className="mb-3 relative">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              {...register("email")}
              className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:shadow-outline"
              id="email"
              type="text"
              placeholder="Enter your Email"
              style={{ width: "110%" }}
            />
          </div>

          <div className="mb-3 relative">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              {...register("password")}
              className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Enter your password"
              style={{ width: "110%" }}
            />
          </div>

          <div className="mb-3 text-center mr-40">
            <a href="#" className="text-blue-500 hover:underline">
              Forgot Password?
            </a>
          </div>

          <div>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Loading..." : "Log In"}
            </Button>
          </div>
          <div className="mt-7 text-center">
            <span>
              Don’t have an account?{" "}
              <span style={{ color: "orange" }}>Create account</span>
            </span>
          </div>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default LoginPage;