import React from 'react';
import { createRoot } from 'react-dom/client';
import { setContext } from '@apollo/client/link/context';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';
import App from './App';
import { ApolloClient, HttpLink, InMemoryCache, ApolloProvider, split } from '@apollo/client';

import './index.css';
import { AuthProvider, localStorageAuth } from './auth';

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(localStorageAuth);
  return { headers: { ...headers, authorization: token ? `bearer ${token}` : null } };
});

// http connection
const httpLink = new HttpLink({ uri: 'http://localhost:4000' });

// websocket connection
const wsLink = new GraphQLWsLink(createClient({ url: 'ws://localhost:4000' }));

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  wsLink,
  authLink.concat(httpLink),
);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink,
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
