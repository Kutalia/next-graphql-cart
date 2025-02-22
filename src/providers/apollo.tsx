"use client"

import { BACKEND_URL } from '@/constants';
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

export const getVisitorTokenFromCookies = () => {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("visitorToken="))
    ?.split("=")[1];

  if (token) {
    return decodeURIComponent(token)
  }

  return null
}

const httpLink = createHttpLink({
  uri: BACKEND_URL,
});

const authLink = setContext((_, { headers }) => {
  const token = getVisitorTokenFromCookies()

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

export const CustomApolloProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => <ApolloProvider client={client}>
  {children}
</ApolloProvider>
