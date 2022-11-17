import React, { forwardRef } from 'react';
import { InputProps, Input } from './Input';
import { ChildrenProps, DateTestIdProps } from '../types';
import { Error } from './Error';
import type { ErrorProps } from './Error';

type FormInputProps = InputProps & ErrorProps;

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(({ error, ...props }, ref) => {
  return (
    <>
      <Input {...props} ref={ref} />
      <Error error={error} />
    </>
  );
});

type FormProps = React.FC<
  ChildrenProps & DateTestIdProps & { onSubmit: React.FormEventHandler<HTMLFormElement> }
> & {
  Input: typeof FormInput;
};

export const Form: FormProps = ({ children, onSubmit, ...otherProps }) => {
  return (
    <form
      {...otherProps}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 min-w-[50%]"
      onSubmit={onSubmit}>
      {children}
    </form>
  );
};

Form.Input = FormInput;
