import React, { useEffect, useState } from "react";
import { TiPencil } from "react-icons/ti";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const getCookie = (name: string)=> {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? match[2] : "";
}

const Settings: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userId = document.cookie.replace(
      /(?:(?:^|.*;\s*)userId\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    const token = getCookie("token");

    if (userId) {
      try {
        setIsSaving(true);
        const response = await fetch(
          `http://localhost:3333/api/v1/riders/editriderprofile/${userId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
          }
        );

        if (response.ok) {
          setTimeout(() => {
            setIsSaving(false);
          }, 1000);
          toast.success("Profile updated successfully");
        } else {
          setIsSaving(false);
          toast.error("Failed to update profile");
        }
      } catch (error) {
        setIsSaving(false);
        console.error("Error:", error);
        toast.error("An error occurred while updating your profile");
      }
    }
  };

  useEffect(() => {
    const firstNameCookie = getCookie("firstName");
    const lastNameCookie = getCookie("lastName");
    const phoneCookie = getCookie("phone");
    const emailCookie = getCookie("email");

    setFormData((prevData) => ({
      ...prevData,
      firstName: firstNameCookie || "",
      lastName: lastNameCookie || "",
      phone: phoneCookie || "",
      email: emailCookie || "",
    }));
  }, []); 

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
                    placeholder={
                      formData.firstName === ""
                        ? "First Name"
                        : formData.firstName
                    }
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
                    placeholder={
                      formData.lastName === "" ? "Last Name" : formData.lastName
                    }
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
                    placeholder={
                      formData.phone === "" ? "Phone Number" : formData.phone
                    }
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
                    placeholder={
                      formData.email === "" ? "Your Email" : formData.email
                    }
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
