import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ApolloClient, HttpLink, InMemoryCache, ApolloProvider } from '@apollo/client';

import './index.css';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'http://localhost:4000',
  }),
});

const container = document.getElementById('root');
const root = createRoot(container as HTMLElement);
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
);
