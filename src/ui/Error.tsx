import React from 'react';

export type ErrorProps = { error: string | null };

export const Error: React.FC<ErrorProps> = ({ error }) => {
  return error ? <p className="peer-invalid:visible text-red-700 font-light">{error}</p> : null;
};
