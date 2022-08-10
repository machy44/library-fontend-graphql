import React from 'react';
import classNames from 'classnames';
import { AdditionAndChildrenProps } from '../types';

interface ButtonProps extends AdditionAndChildrenProps {
  type?: 'button' | 'submit';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  type = 'button',
  onClick,
  className,
  ...otherProps
}) => {
  return (
    <button
      onClick={onClick}
      className={classNames(
        'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline',
        className,
      )}
      type={type}
      {...otherProps}>
      {children}
    </button>
  );
};
