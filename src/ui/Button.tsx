import React from 'react';
import classNames from 'classnames';
import { ClassNameChildrenProps } from '../types';

interface ButtonProps extends ClassNameChildrenProps {
  type?: 'button' | 'submit';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  type = 'button',
  onClick,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={classNames(
        'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline',
        className,
      )}
      type={type}>
      {children}
    </button>
  );
};
