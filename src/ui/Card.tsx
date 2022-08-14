import React from 'react';
import classNames from 'classnames';
import { ClassNameChildrenProps } from '../types';

export const Card: React.FC<ClassNameChildrenProps> = ({ children, className }) => {
  return (
    <div className={classNames('rounded-xl bg-slate-100 shadow-xl my-auto p-6', className)}>
      {children}
    </div>
  );
};

export const CardWithBorder: React.FC<ClassNameChildrenProps> = ({ className, ...props }) => {
  return <Card className={`${className} ring-2`} {...props} />;
};
