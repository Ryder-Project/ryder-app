import { FC, ReactNode } from 'react';

interface ClassName {
  className?: string;
  children: ReactNode;
}
const MaxContainer: FC<ClassName> = ({ className, children }) => {
  return (
    <div className={`max-w-[1138px] w-full mx-auto ${className}`}>
      {children}
    </div>
  );
};

export default MaxContainer;
