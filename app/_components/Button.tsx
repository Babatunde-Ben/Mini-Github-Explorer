import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  disabled?: boolean;
  onClick: () => void;
};

const Button = ({ children, disabled, onClick }: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className="w-full h-full cursor-pointer bg-gray-400 text-gray-900 px-4 py-2 rounded-lg"
    >
      {children}
    </button>
  );
};

export default Button;
