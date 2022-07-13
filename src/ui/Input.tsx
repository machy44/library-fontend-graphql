import React from 'react';
import classNames from 'classnames';
import { ClassNameProps } from '../types';

interface InputProps extends Partial<ClassNameProps> {
  id: string;
  placeholder: string;
  type?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export const Input: React.FC<InputProps> = ({
  id,
  type = 'text',
  placeholder,
  onChange,
  className,
  value,
  ...otherProps
}) => {
  return (
    <input
      className={classNames(
        'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline',
        className,
      )}
      id={id}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      {...otherProps}
    />
  );
};
