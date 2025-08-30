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
      className="w-full h-full cursor-pointer px-4 py-2 font-semibold rounded-lg transition-colors duration-150 disabled:bg-gray-600 disabled:text-gray-300 enabled:bg-gray-100 enabled:text-gray-900 hover:enabled:bg-gray-200"
    >
      {children}
    </button>
  );
};

export default Button;
