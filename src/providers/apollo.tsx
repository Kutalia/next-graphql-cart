'use client';

import { BACKEND_URL } from '@/constants';
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
  split,
} from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { setContext } from '@apollo/client/link/context';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { useEffect, useState } from 'react';

export const getVisitorTokenFromCookies = () => {
  const token = document.cookie
    .split('; ')
    .find((row) => row.startsWith('visitorToken='))
    ?.split('=')[1];

  if (token) {
    return decodeURIComponent(token);
  }

  return null;
};

const httpLink = createHttpLink({
  uri: BACKEND_URL,
});

const authLink = setContext((_, { headers }) => {
  const token = getVisitorTokenFromCookies();

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const httpLinkWithAuth = authLink.concat(httpLink);

export const CustomApolloProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const [client, setClient] = useState<ApolloClient<any>>();

  useEffect(() => {
    // defining here since window context not available during prerendering, hence the token in cookie unavailable too
    const wsLink = new GraphQLWsLink(
      createClient({
        url: BACKEND_URL,
        connectionParams: {
          authToken: getVisitorTokenFromCookies(),
        },
      }),
    );

    // The split function takes three parameters:
    //
    // * A function that's called for each operation to execute
    // * The Link to use for an operation if the function returns a "truthy" value
    // * The Link to use for an operation if the function returns a "falsy" value
    const splitLink = split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === 'OperationDefinition' &&
          definition.operation === 'subscription'
        );
      },
      wsLink,
      httpLinkWithAuth,
    );

    setClient(
      new ApolloClient({
        link: splitLink,
        cache: new InMemoryCache(),
      }),
    );
  }, []);

  if (!client) {
    return;
  }

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
