import { useApolloClient } from '@apollo/client';
import React, { useContext, useEffect, useState } from 'react';

const AuthContext = React.createContext<any>(null);

export const localStorageAuth = 'library-user-token';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const client = useApolloClient();

  useEffect(() => {
    const localStorageToken = localStorage.getItem(localStorageAuth);
    console.log({ localStorageToken });
    if (localStorageToken !== 'null') {
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
