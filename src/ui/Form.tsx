import React, { forwardRef } from 'react';
import { InputProps, Input } from './Input';
import { ChildrenProps } from '../types';

interface FormInputProps extends InputProps {
  error: string | null;
}

const FormInput: React.FC<FormInputProps> = forwardRef(({ error, ...props }, ref) => {
  console.log(props);
  return (
    <>
      {/* @ts-ignore */}
      <Input {...props} ref={ref} />
      {error && <p className="peer-invalid:visible text-red-700 font-light">{error}</p>}
    </>
  );
});

type FormProps = React.FC<ChildrenProps & { onSubmit: React.FormEventHandler<HTMLFormElement> }> & {
  Input: typeof FormInput;
};

export const Form: FormProps = ({ children, onSubmit }) => {
  return (
    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8" onSubmit={onSubmit}>
      {children}
    </form>
  );
};

Form.Input = FormInput;
