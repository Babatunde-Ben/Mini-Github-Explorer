import React from "react";

type InputFieldProps = {
  type: string;
  placeholder: string;
  value: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputField = ({
  type,
  placeholder,
  value,
  onChange,
  name,
}: InputFieldProps) => {
  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={onChange}
        className="outline-none bg-gray-800 text-gray-200 rounded-md px-4 py-2 inline-block w-full h-full"
      />
    </div>
  );
};

export default InputField;
