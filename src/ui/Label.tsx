import React from 'react';
import { ChildrenProps } from '../types';

interface LabelProps extends ChildrenProps {
  htmlFor: string;
}

export const Label: React.FC<LabelProps> = ({ htmlFor, children }) => {
  return (
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={htmlFor}>
      {children}
    </label>
  );
};
