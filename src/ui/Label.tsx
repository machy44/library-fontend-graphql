import React from 'react';
import classNames from 'classnames';
import { ClassNameChildrenProps } from '../types';

interface LabelProps extends ClassNameChildrenProps {
  htmlFor: string;
}

export const Label: React.FC<LabelProps> = ({ htmlFor, children, className }) => {
  return (
    <label
      className={classNames('block text-gray-700 text-sm font-bold mb-2', className)}
      htmlFor={htmlFor}>
      {children}
    </label>
  );
};
