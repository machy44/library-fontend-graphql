import React from 'react';

interface TextProps {
  children: React.ReactNode;
}

export const Text: React.FC<TextProps> = ({ children }) => {
  return <p className="font-sans">{children}</p>;
};

export const Title: React.FC<TextProps> = ({ children }) => {
  return (
    <p className="font-sans font-bold tracking-wide leading-6 text-blue-600/100">{children}</p>
  );
};
