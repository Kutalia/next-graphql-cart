import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { ApolloClient, InMemoryCache } from '@apollo/client';

import { BACKEND_URL } from './constants';
import { REGISTER_VISITOR } from './queries';

const apolloBackendClient = new ApolloClient({
  uri: BACKEND_URL,
  cache: new InMemoryCache(),
});

export async function middleware(request: NextRequest) {
  // Creating session cookie if there's no visitor token used for authentication
  const response = NextResponse.next()

  if (!request.cookies.has('visitorToken')) {
    const result = await apolloBackendClient
      .mutate({
        mutation: REGISTER_VISITOR,
        fetchPolicy: 'no-cache',
      })

    const visitor = result.data?.register
    if (visitor && visitor.isActive) {
      response.cookies.set('visitorToken', visitor.token)
    }
  }

  return response
}