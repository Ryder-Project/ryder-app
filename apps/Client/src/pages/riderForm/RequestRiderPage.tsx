import React from "react";
import { useForm } from "react-hook-form";
import Button from "../../components/Button";
import Line from "../../assets/Line.svg";
import BackArrow from "../../assets/BackArrow.svg";
import Navbar from "../../components/RiderNavBar";

interface FormData {
  pickupLocation: string;
  dropOffLocation: string;
  dropOffPhoneNumber: string;
  offerAmount: string;
}

const RequestRiderPage: React.FC = () => {
  const { register, handleSubmit, setValue } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    // Handle the logic for requesting a rider using the form data
    console.log("Requesting rider with data:", data);
    // Add additional logic such as sending a request to your backend
  };

  return (
    <>
      {/* Include the Navbar component */}
      <Navbar />

      <div className="bg-white shadow-md mt-20 p-8 mx-auto max-w-lg">
        <div>
          <div className="flex gap-2">
            <img src={BackArrow} alt="Arrow" />
            <p>Back</p>
            <h1 className="font-bold ml-24">Request a Rider</h1>
          </div>
          <img
            className="bg-[#E2E2E2] w-[548px] h-[1px] mt-3"
            src={Line}
            alt="line"
          />
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-md mx-auto my-[30px]"
          >
            {/* Pickup Location */}
            <div className="mb-4 px-[32px]">
              <label
                htmlFor="pickupLocation"
                className="block text-gray-700 text-sm font-normal mb-2 mr-[200px]"
              >
                Pickup Location
              </label>
              <input
                type="text"
                id="pickupLocation"
                placeholder="Enter pickup location"
                {...register("pickupLocation", { required: true })}
                onChange={(e) => setValue("pickupLocation", e.target.value)}
                className="w-full border border-gray-300 p-2"
              />
            </div>

            {/* Drop-off Location */}
            <div className="mb-4 px-[32px]">
              <label
                htmlFor="dropOffLocation"
                className="block text-gray-700 text-sm font-normal mb-2 mr-[265px]"
              >
                Drop-off Location
              </label>
              <input
                type="text"
                id="dropOffLocation"
                placeholder="Enter drop off location"
                {...register("dropOffLocation", { required: true })}
                onChange={(e) => setValue("dropOffLocation", e.target.value)}
                className="w-full border border-gray-300 p-2"
              />
            </div>

            {/* Drop-off Phone Number */}
            <div className="mb-4 px-[32px]">
              <label
                htmlFor="dropOffPhoneNumber"
                className="block text-gray-700 text-sm font-normal mb-2 mr-[200px]"
              >
                Drop-off Phone Number
              </label>
              <input
                type="tel"
                id="dropOffPhoneNumber"
                placeholder="Enter drop off phone number"
                {...register("dropOffPhoneNumber", { required: true })}
                onChange={(e) => setValue("dropOffPhoneNumber", e.target.value)}
                className="w-full border border-gray-300 p-2"
              />
            </div>

            {/* Offer Amount (NGN) */}
            <div className="mb-4 px-[32px]">
              <label
                htmlFor="offerAmount"
                className="block text-gray-700 text-sm font-[400] mb-2 mr-[300px]"
              >
                Offer (NGN)
              </label>
              <input
                type="number"
                id="offerAmount"
                placeholder="Enter an amount (NGN)"
                {...register("offerAmount", { required: true })}
                onChange={(e) => setValue("offerAmount", e.target.value)}
                className="w-full border border-gray-300 p-2"
              />
            </div>

            <div className="mt-10 px-[32px]">
              <Button type="submit">Order Ride</Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RequestRiderPage;
