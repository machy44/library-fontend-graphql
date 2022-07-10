import React from 'react';
import { ChildrenProps, ClassNameChildrenProps } from '../types';

export const Text: React.FC<ChildrenProps> = ({ children }) => {
  return <p className="font-sans">{children}</p>;
};

export const Title: React.FC<ClassNameChildrenProps> = ({ children, className }) => {
  return (
    <p className="font-sans font-bold tracking-wide leading-6 text-blue-600/100">{children}</p>
  );
};
