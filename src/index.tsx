import React from 'react';
import { createRoot } from 'react-dom/client';
import { setContext } from '@apollo/client/link/context';
import App from './App';
import { ApolloClient, HttpLink, InMemoryCache, ApolloProvider } from '@apollo/client';

import './index.css';
import { AuthProvider, localStorageAuth } from './auth';

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(localStorageAuth);
  return { headers: { ...headers, authorization: token ? `bearer ${token}` : null } };
});

const httpLink = new HttpLink({ uri: 'http://localhost:4000' });

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

const container = document.getElementById('root');
const root = createRoot(container as HTMLElement);
root.render(
  <ApolloProvider client={client}>
    <AuthProvider>
      <App />
    </AuthProvider>
  </ApolloProvider>,
);
