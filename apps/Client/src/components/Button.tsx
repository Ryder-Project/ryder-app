import React, { MouseEventHandler, ReactNode } from 'react';

interface ButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset'; // Add type prop with optional values
  children: ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, type = 'button', children }) => {
  return (
    <button type={type} onClick={onClick} className="bg-[#FB8500] w-full text-white border rounded-md py-2 px-4 hover:bg-[#FB8500]" style={{ width: '110%'}}>
      {children}
    </button>
  );
};

export default Button;
