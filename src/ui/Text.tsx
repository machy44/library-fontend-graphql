import React from 'react';

interface TextProps {
  children: React.ReactNode;
}

export const Text: React.FC<TextProps> = ({ children }) => {
  return <p className="font-sans">{children}</p>;
};
