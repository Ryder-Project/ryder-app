import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
    children,
    className = "",
    disabled = false,
    onClick,
    type = "button",
}) => {
  return (
    <button
    className={`flex items-center justify-center w-full text-white bg-orange-500 hover:bg-orange-800 focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition duration-300 ease-in-out ${className}`}
    disabled={disabled}
    onClick={onClick}
    type={type}
    >
      {children}
    </button>
  );
};

export default Button;
