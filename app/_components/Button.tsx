import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
};

const Button = ({ children, disabled, onClick }: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className="w-full h-full cursor-pointer text-gray-900 px-4 py-2 font-medium rounded-lg transition-colors duration-150 disabled:bg-gray-400 enabled:bg-gray-100"
    >
      {children}
    </button>
  );
};

export default Button;
