import React, { forwardRef } from 'react';
import classNames from 'classnames';
import { AdditionalProps } from '../types';

export interface InputProps extends Partial<AdditionalProps> {
  id?: string;
  placeholder: string;
  type?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', ...props }, ref) => {
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
      </>
    );
  },
);
