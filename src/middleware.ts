import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { ApolloClient, InMemoryCache } from '@apollo/client';

import { gql } from './__generated__'
import { BACKEND_URL } from './constants';

const apolloBackendClient = new ApolloClient({
  uri: BACKEND_URL,
  cache: new InMemoryCache(),
});

const REGISTER_VISITOR = gql(`
mutation RegisterVisitor {
    register {
      token
      isActive
    }
  }
`)

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