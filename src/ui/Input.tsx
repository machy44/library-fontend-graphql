import React from 'react';

interface InputProps {
  id: string;
  placeholder: string;
  type?: string;
}

export const Input: React.FC<InputProps> = ({ id, type = 'text', placeholder }) => {
  return (
    <input
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      id={id}
      type={type}
      placeholder={placeholder}
    />
  );
};
