import { FC, ReactNode } from "react";
import { RyderLogo } from "../../../assets/svg";

interface AuthPageProps {
  children: ReactNode;
  className?: string;
  title: string;
}

const AuthPageContainer: FC<AuthPageProps> = ({ title, children, className }) => {
  return (
    <div className="grid grid-cols-5">
      <div className="authBackground">
        <h1 className="max-w-[474px] w-full text-4xl font-bold">
          Delivery service just got easier, elegant & superb with{" "}
          <span className="text-orange-500">Ryder</span>
        </h1>
      </div>
      <div className="col-span-2 overflow-y-auto max-h-[calc(100vh-121px)]">
        <div className={`ml-20 mr-32  flex flex-col pt-20 ${className}`}>
          <div className="flex items-center mb-10">
            <RyderLogo />
            <span className="font-bold text-3xl text-gray-900 pl-2">Ryder</span>
          </div>
          <h1 className="mb-8 text-xl font-bold  text-sky-950">{title}</h1>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthPageContainer;
