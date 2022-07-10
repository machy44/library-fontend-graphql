import React from 'react';
import classNames from 'classnames';
import { ClassNameChildrenProps } from '../types';

export const Card: React.FC<ClassNameChildrenProps> = ({ children, className }) => {
  return (
    <div className={classNames('rounded-xl bg-slate-100 shadow-xl ring-2 my-auto p-6', className)}>
      {children}
    </div>
  );
};
