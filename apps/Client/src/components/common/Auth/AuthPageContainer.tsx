import { FC, ReactNode } from "react";
import { RyderLogo } from "../../../assets/svg";

interface AuthPageProps {
  title: string;
  children: ReactNode;
}

const AuthPageContainer: FC<AuthPageProps> = ({ title, children }) => {
  return (
    <div className="grid grid-cols-5">
      <div className="authBackground">
        <h1 className="max-w-[474px] w-full text-4xl font-bold">
          Delivery service just got easier, elegant & superb with{" "}
          <span className="text-orange-500">Ryder</span>
        </h1>
      </div>
      <div className="ml-20 mr-32 col-span-2 flex flex-col pt-20">
        <div className="flex items-center mb-10">
          <RyderLogo />
          <span className="font-bold text-3xl text-gray-900 pl-2">Ryder</span>
        </div>
        <h1 className="mb-8 text-xl font-bold  text-sky-950">{title}</h1>
        {children}
      </div>
    </div>
  );
};

export default AuthPageContainer;
