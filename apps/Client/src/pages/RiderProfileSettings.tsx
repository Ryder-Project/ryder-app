import React, { useState, useEffect, useRef } from "react";
import { TiPencil } from "react-icons/ti";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  userId: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

const Settings: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });

  const [isSaving, setIsSaving] = useState(false);

  const formDataTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const tokenTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token) as JwtPayload;
      const storedFormData = localStorage.getItem("formData");
      if (storedFormData) {
        setFormData(JSON.parse(storedFormData));
      } else {
        setFormData({
          firstName: decodedToken.firstName,
          lastName: decodedToken.lastName,
          phone: decodedToken.phone,
          email: decodedToken.email,
        });
      }
    }
    return () => {
      if (formDataTimeoutRef.current) clearTimeout(formDataTimeoutRef.current);
      if (tokenTimeoutRef.current) clearTimeout(tokenTimeoutRef.current);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);

    const token = localStorage.getItem("token");

    if (token) {
      const decodedToken = jwtDecode(token) as JwtPayload;
      const userId = decodedToken.userId;

      try {
        const VITE_BE_BASE_URL = import.meta.env.VITE_BE_BASE_URL;

        if (!VITE_BE_BASE_URL) {
          throw new Error('VITE_LOGIN_URL is not defined');
        }
        const response = await fetch(
          `${VITE_BE_BASE_URL}/api/v1/riders/editriderprofile/${userId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
            credentials: "include",
          }
        );

        if (response.ok) {
          const updatedFormData = { ...formData };
          for (const key in formData) {
            updatedFormData[key as keyof typeof formData] =
              formData[key as keyof typeof formData] ||
              updatedFormData[key as keyof typeof formData];
          }
          setFormData(updatedFormData);
          localStorage.setItem("formData", JSON.stringify(updatedFormData));

          setTimeout(() => {
            toast.success("Profile updated successfully");
            setIsSaving(false);
          }, 1000);

          if (formDataTimeoutRef.current)
            clearTimeout(formDataTimeoutRef.current);
          if (tokenTimeoutRef.current) clearTimeout(tokenTimeoutRef.current);

          formDataTimeoutRef.current = setTimeout(() => {
            localStorage.removeItem("formData");
          }, 10 * 60 * 60 * 1000);

          tokenTimeoutRef.current = setTimeout(() => {
            localStorage.removeItem("token");
          }, 10 * 60 * 60 * 1000);
        } else {
          setIsSaving(false);
          toast.error("Failed to update profile");
        }
      } catch (error) {
        setIsSaving(false);
        console.error("Error:", error);
        toast.error("An error occurred while updating your profile");
      }
    } else {
      setIsSaving(false);
    }
  };

  return (
    <>
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

            <form className="max-w-md w-full" onSubmit={handleSubmit}>
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
                    placeholder={formData.firstName}
                    className="bg-gray-100 mt-1 pl-4 pt-2 pr-2 pb-2 w-full border rounded-none focus:outline-none focus:border-orange-500"
                    onChange={handleChange}
                    value={formData.firstName}
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
                    placeholder={formData.lastName}
                    className="bg-gray-100 mt-1 pl-4 pt-2 pr-2 pb-2 w-full border rounded-none focus:outline-none focus:border-orange-500"
                    onChange={handleChange}
                    value={formData.lastName}
                  />
                  <span className="absolute right-6 text-gray-400">
                    <TiPencil />
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-600"
                >
                  Phone Number
                </label>
                <div className="relative flex items-center">
                  <input
                    type="tel"
                    id="phone"
                    placeholder={formData.phone}
                    className="bg-gray-100 mt-1 pl-4 pt-2 pr-2 pb-2 w-full border rounded-none focus:outline-none focus:border-orange-500"
                    onChange={handleChange}
                    value={formData.phone}
                  />
                  <span className="absolute right-6 text-gray-400">
                    <TiPencil />
                  </span>
                </div>
              </div>

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
                    placeholder={formData.email}
                    className="mt-1 pl-4 pt-2 pr-2 pb-2 w-full border rounded-none focus:outline-none focus:border-orange-500 bg-gray-100"
                    onChange={handleChange}
                    value={formData.email}
                  />
                  <span className="absolute right-6 text-gray-400">
                    <TiPencil />
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className={`bg-orange-500 w-full text-white mt-4 py-2 px-4 rounded-none hover:bg-orange-600 focus:outline-none focus:ring focus:border-orange-300 ${
                  isSaving ? "saving-animation" : ""
                }`}
              >
                {isSaving ? "Saving..." : "Save"}
              </button>
            </form>
          </div>
        </div>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </>
  );
};

export default Settings;
