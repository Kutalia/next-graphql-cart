import { ApolloClient, InMemoryCache } from '@apollo/client';

export const apolloClient = new ApolloClient({
  uri: 'https://take-home-be.onrender.com/api',
  cache: new InMemoryCache(),
});
