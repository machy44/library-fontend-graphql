import { useApolloClient } from '@apollo/client';
import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const AuthContext = React.createContext<any>(null);

export const localStorageAuth = 'library-user-token';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem(localStorageAuth));
  const client = useApolloClient();

  useEffect(() => {
    const localStorageToken = localStorage.getItem(localStorageAuth);
    if (localStorageToken) {
      setToken(localStorageToken);
    }
  }, []);

  const handleToken = (token: string) => {
    setToken(token);
    localStorage.setItem(localStorageAuth, token);
  };

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  return (
    <AuthContext.Provider value={{ token, setToken: handleToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export const ProtectedPage: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { token } = useAuth();
  console.log({ token });
  if (!token) {
    return <Navigate to="/" />;
  }
  return <>{children}</>;
};

export const LoginPage: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { token } = useAuth();
  if (token) {
    return <Navigate to="/" />;
  }
  return <>{children}</>;
};
