import { FC } from "react";
import CheckMailContainer from "../../common/Auth/CheckMailContainer";

const CheckEmailVerify: FC = () => {
  return (
    <CheckMailContainer>
      <p className="text-md py-6 text-green-700">
        A verification link has been sent to your email. Kindly check your inbox
        for further instructions. If you cannot locate the email in your inbox,
        we recommend checking your spam or junk folder as well.
      </p>
    </CheckMailContainer>
  );
};

export default CheckEmailVerify;
