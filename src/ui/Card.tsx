import React from 'react';
import { ChildrenProps } from '../types';

export const Card: React.FC<ChildrenProps> = ({ children }) => {
  return <div className="rounded-xl bg-slate-100 shadow-xl ring-1 my-auto p-6">{children}</div>;
};
