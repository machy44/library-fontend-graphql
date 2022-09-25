import { useApolloClient, useQuery } from '@apollo/client';
import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { USER_INFO } from './service/queries';
import { IUserProfile } from './types';

export interface AuthContextProps {
  token: string | null;
  setToken: (token: string) => void;
  logout: () => void;
  userProfile: IUserProfile | undefined;
}

const AuthContext = React.createContext<AuthContextProps>({} as AuthContextProps);

export const localStorageAuth = 'library-user-token';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<AuthContextProps['token']>(
    localStorage.getItem(localStorageAuth),
  );
  const { data } = useQuery<{ me: AuthContextProps['userProfile'] }>(USER_INFO, {
    skip: token === null,
  });

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
    <AuthContext.Provider value={{ token, setToken: handleToken, logout, userProfile: data?.me }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export const ProtectedPage: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { token } = useAuth();
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
