// Button.tsx
import React, { MouseEventHandler } from 'react';

interface ButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
  return (
    <button type="button" onClick={onClick} className="bg-[#FB8500] w-full text-white py-2 px-4 hover:bg-[#FB8500]">
      {children}
    </button>
  );
};

export default Button;
