import React from 'react';
import { InputProps, Input } from './Input';

interface FormInputProps extends InputProps {
  error: string | null;
}

export const FormInput: React.FC<FormInputProps> = ({ error, ...props }) => {
  return (
    <>
      <Input {...props} />
      {error && <p className="peer-invalid:visible text-red-700 font-light">{error}</p>}
    </>
  );
};
