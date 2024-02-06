import React, { MouseEventHandler, ReactNode } from "react";

interface ButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset"; 
  disabled?: boolean; 
  children: ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  type = "button",
  disabled = false,
  children,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`bg-[#FB8500] w-full text-white py-2 px-4 hover:bg-[#FB8500] ${
        disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
      }`}
      style={{ width: "110%" }}
    >
      {children}
    </button>
  );
};

export default Button;
