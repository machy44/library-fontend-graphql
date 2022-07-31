import React, { forwardRef } from 'react';
import classNames from 'classnames';
import { ChildrenProps, ClassNameChildrenProps } from '../types';

export const Text = forwardRef<HTMLParagraphElement, ChildrenProps>(
  ({ children, ...props }, ref) => {
    return (
      <p {...props} className="font-sans font-bold tracking-wide" ref={ref}>
        {children}
      </p>
    );
  },
);

export const Title: React.FC<ClassNameChildrenProps> = ({ children, className }) => {
  return (
    <p
      className={classNames(
        'font-sans font-bold tracking-wide leading-6 text-blue-600/100',
        className,
      )}>
      {children}
    </p>
  );
};
