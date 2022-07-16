import React, { forwardRef } from 'react';
import classNames from 'classnames';
import { ClassNameProps } from '../types';

interface InputProps extends Partial<ClassNameProps> {
  // id: string;
  placeholder: string;
  type?: string;
  error: string | null;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', error, ...props }, ref) => {
    return (
      <>
        <input
          ref={ref}
          className={classNames(
            'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline',
            className,
          )}
          type={type}
          {...props}
        />
        {error && (
          <p className="peer-invalid:visible text-red-700 font-light">
            Please enter a valid email address
          </p>
        )}
      </>
    );
  },
);
