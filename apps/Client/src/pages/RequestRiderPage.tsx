// RequestRiderPage.tsx
import React, { useState } from 'react';
import Button from '../components/Button';
import  Line  from '../assets/Line.svg';
import BackArrow from '../assets/BackArrow.svg'

interface FormData {
  pickupLocation: string;
  dropOffLocation: string;
  dropOffPhoneNumber: string;
  offerAmount: string;
}

const RequestRiderPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    pickupLocation: '',
    dropOffLocation: '',
    dropOffPhoneNumber: '',
    offerAmount: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRequestRider = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle the logic for requesting a rider using the form data
    console.log('Requesting rider with data:', formData);
    // Add additional logic such as sending a request to your backend
  };

  return (
    <div  className="bg-white shadow-md p-8 mx-auto max-w-lg">
    <div>
    <div className='flex gap-2'>
      <img src={BackArrow} alt="Arrow" /> 
      <p>Back</p>
      <h1 className='font-bold ml-24'>Request a Rider</h1>
      </div>
      <img className='bg-[#E2E2E2] w-[548px] h-[1px] mt-3' src={Line} alt="line" />
      <form onSubmit={handleRequestRider} className="max-w-md mx-auto my-[30px]">
        {/* Pickup Location */}
        <div className="mb-4 px-[32px]">
          <label htmlFor="pickupLocation" className="block text-gray-700 text-sm font-normal mb-2 mr-[280px]">
            Pickup Location
          </label>
          <input
            type="text"
            id="pickupLocation"
            name="pickupLocation"
            value={formData.pickupLocation}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2"
            required
          />
        </div>

        {/* Drop-off Location */}
        <div className="mb-4 px-[32px]">
          <label htmlFor="dropOffLocation" className="block text-gray-700 text-sm font-normal mb-2 mr-[265px]">
            Drop-off Location
          </label>
          <input
            type="text"
            id="dropOffLocation"
            name="dropOffLocation"
            value={formData.dropOffLocation}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2"
            required
          />
        </div>

        {/* Drop-off Phone Number */}
        <div className="mb-4 px-[32px]">
          <label htmlFor="dropOffPhoneNumber" className="block text-gray-700 text-sm font-normal mb-2 mr-[225px]">
            Drop-off Phone Number
          </label>
          <input
            type="tel"
            id="dropOffPhoneNumber"
            name="dropOffPhoneNumber"
            value={formData.dropOffPhoneNumber}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2"
            required
          />
        </div>

        {/* Offer Amount (NGN) */}
        <div className="mb-4 px-[32px]">
          <label htmlFor="offerAmount" className="block text-gray-700 text-sm font-[400] mb-2 mr-[300px]">
            Offer (NGN)
          </label>
          <input
            type="number"
            id="offerAmount"
            name="offerAmount"
            value={formData.offerAmount}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2"
            required
          />
        </div>

        <div className="mt-10 px-[32px]">
        <Button onClick={handleRequestRider}>Order Ride</Button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default RequestRiderPage;
