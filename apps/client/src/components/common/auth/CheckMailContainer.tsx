import { FC, ReactNode } from "react";
import { EmailCheckIcon } from "../../../assets/svg";

interface ClassName {
  children: ReactNode;
}

const CheckMailContainer: FC<ClassName> = ({ children }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-neutral-100 "></div>
      <div className="relative lg:px-[140px] bg-white  flex flex-col justify-center items-center lg:py-20">
        <div className="mb-8">
          <EmailCheckIcon />
        </div>
        <div className="flex flex-col justify-center items-center text-justify max-w-[319px] text-blue-950 ">
          <h1 className="text-3xl font-bold">Check your mail</h1>
          {children}
        </div>
      </div>
    </div>
  );
};

export default CheckMailContainer;
