import { FC, FormEvent, useState } from "react";
import CheckEmail from "./CheckEmail";
import PasswordContainer from "./PasswordContainer";

const ForgotPassword: FC = () => {
  
  const [showModal, setShowModal] = useState(false);
  const handleResetPassword = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowModal(true);
    // Add reset password logic here
  };
  
  return (
    <PasswordContainer className="lg:px-[100px]">
      <div className="max-w-[432px]">
        <div className="flex flex-col justify-center items-center text-center  ">
          <h1 className="text-3xl font-bold text-blue-950">Forgot Password</h1>
          <p className="text-sm py-4 text-stone-300 mx-8">
            Enter the email associated with your account and we’ll send an email
            with instruction to reset your password
          </p>
        </div>
        <form className="mx-10" onSubmit={handleResetPassword}>
          <div className="mb-6">
            <label htmlFor="email" className="block mb-1 text-sm">
              Email
            </label>
            <div className="email-input-container">
              <input
                type="email"
                name="email"
                id="email"
                className="pl-10 border border-black text-sm rounded block w-full px-4 py-2  "
                placeholder="Enter your email"
              />
            </div>
          </div>
          <button
            type="submit"
            className="flex items-center justify-center w-full text-white bg-orange-500 hover:bg-orange-800 focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition duration-300 ease-in-out rounded-md text-sm py-3"
          >
            Reset password
          </button>
        </form>
        {showModal && <CheckEmail/>}
      </div>
      <a href="/login" className="mt-12 px-4 py-2 bg-stone-200 text-sm border">
        Back to Login
      </a>
    </PasswordContainer>
  );
};

export default ForgotPassword;
