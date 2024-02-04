import { EmailCheckIcon } from "../../../assets/svg";
import { FC } from "react";

const VerifyMailModal: FC = () => {
  const handleVerifyMail = () => {
    // consume endpoint that sends link to verify email to the user email.
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-neutral-100 "></div>
      <div className="relative lg:px-[160px] bg-white  flex flex-col justify-center items-center lg:py-20">
        <div className="mb-8">
          <EmailCheckIcon />
        </div>
        <div className="flex flex-col justify-center items-center text-center max-w-[319px] text-blue-950 ">
          <h1 className="text-3xl font-bold">Verify your email</h1>
          <p className="text-sm py-6 px-8">
            Hi there, use the link below to verify your email and start enjoying
            Ryder
          </p>
          <button
            className="px-10 py-4 bg-orange-500 text-sm text-white"
            onClick={handleVerifyMail}
          >
            Verify email
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyMailModal;
