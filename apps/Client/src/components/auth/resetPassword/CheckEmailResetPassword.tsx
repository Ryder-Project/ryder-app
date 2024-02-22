import { FC } from "react";
import { Link } from "react-router-dom";
import Button from "../../Common/Button/Button";
import CheckMailContainer from "../../common/Auth/CheckMailContainer";

interface CheckEmailProps {
  onResend: () => void;
}

const CheckEmailResetPassword: FC<CheckEmailProps> = ({ onResend }) => {
  return (
    <CheckMailContainer>
      <p className="text-sm py-6 px-2">
        We sent a password reset link to your email. Please click the link to
        reset your password
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
    </CheckMailContainer>
  );
};

export default CheckEmailResetPassword;
