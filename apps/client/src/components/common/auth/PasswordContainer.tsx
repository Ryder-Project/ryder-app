import { FC, ReactNode } from 'react';

interface ClassName {
  className: string;
  children: ReactNode;
}

const PasswordContainer: FC<ClassName> = ({ className, children }) => {
  return (
    <div
      style={{ height: '100vh', width: '100%' }}
      className="flex justify-center items-center bg-neutral-100"
    >
      <div
        className={`bg-white flex flex-col justify-center items-center lg:py-20 ${className}`}
      >
        {children}
      </div>
    </div>
  );
};

export default PasswordContainer;
