import React from 'react';
import { ChildrenProps } from '../types';

type TableProps = React.FC<ChildrenProps> & {
  Tbody: typeof Tbody;
  Thead: typeof Thead;
  Th: typeof Th;
  Tr: typeof Tr;
  Td: typeof Td;
};

export const Table: TableProps = ({ children }): JSX.Element => {
  return <table className="border-collapse table-auto w-full text-sm">{children}</table>;
};

const Tbody: React.FC<ChildrenProps> = ({ children }): JSX.Element => {
  return <tbody className="bg-white dark:bg-slate-800">{children}</tbody>;
};

const Thead: React.FC<ChildrenProps> = ({ children }) => {
  return <thead>{children}</thead>;
};

const Tr: React.FC<ChildrenProps> = ({ children }) => {
  return <tr>{children}</tr>;
};

const Th: React.FC<Partial<ChildrenProps>> = ({ children }) => {
  return (
    <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
      {children}
    </th>
  );
};

const Td: React.FC<ChildrenProps> = ({ children }) => {
  return (
    <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
      {children}
    </td>
  );
};

Table.Tbody = Tbody;
Table.Thead = Thead;
Table.Th = Th;
Table.Tr = Tr;
Table.Td = Td;
