import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary";
};

const Button = ({
  children,
  disabled,
  onClick,
  type,
  variant,
}: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type={type}
      className={`w-full h-full px-4 py-2 font-semibold rounded-md flex items-center justify-center gap-2 transition-colors duration-150 enabled:cursor-pointer ${
        variant === "secondary"
          ? "bg-transparent border-2 border-gray-700 hover:bg-gray-800/50"
          : "disabled:bg-gray-700 disabled:text-gray-300 enabled:bg-gray-200 enabled:text-gray-900 hover:enabled:bg-gray-200"
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
