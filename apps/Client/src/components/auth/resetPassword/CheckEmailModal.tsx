import { FC } from "react";
import { Link } from "react-router-dom";
import { EmailCheckIcon } from "../../../assets/svg";
import Button from "../../Common/Button/Button";

interface CheckEmailProps {
  onResend: () => void;
}

const CheckEmail: FC<CheckEmailProps> = ({onResend}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-neutral-100 "></div>
      <div className="relative lg:px-[140px] bg-white  flex flex-col justify-center items-center lg:py-20">
        <div className="mb-8">
          <EmailCheckIcon />
        </div>
        <div className="flex flex-col justify-center items-center text-center max-w-[319px] text-blue-950 ">
          <h1 className="text-3xl font-bold">Check your mail</h1>
          <p className="text-sm py-6 px-2">
            We sent a password reset link to your email. Please click the link
            to reset your password
          </p>
          <p className="text-sm text-sky-950">
            Didn’t receive the email?{" "}
            <a href="#" className="text-orange-500 hover:cursor" onClick={onResend}>
              Click to Resend link
            </a>
          </p>
          <Link to="/login">
            <Button className="mt-6 px-12 py-4 bg-orange-500 text-sm border-orange-500">
              Back to Login
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CheckEmail;
