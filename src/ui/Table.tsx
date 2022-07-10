import React from 'react';
import { ChildrenProps } from '../types';

export const Table: React.FC<ChildrenProps> = ({ children }) => {
  return <table className="border-collapse table-auto w-full text-sm">{children}</table>;
};

export const Tbody: React.FC<ChildrenProps> = ({ children }) => {
  return <tbody className="bg-white dark:bg-slate-800">{children}</tbody>;
};

export const THead: React.FC<ChildrenProps> = ({ children }) => {
  return <thead>{children}</thead>;
};

export const Tr: React.FC<ChildrenProps> = ({ children }) => {
  return <tr>{children}</tr>;
};

export const Th: React.FC<Partial<ChildrenProps>> = ({ children }) => {
  return (
    <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
      {children}
    </th>
  );
};

export const Td: React.FC<ChildrenProps> = ({ children }) => {
  return (
    <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
      {children}
    </td>
  );
};
