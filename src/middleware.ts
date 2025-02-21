import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { apolloClient } from './providers/apollo'
import { gql } from './__generated__'

const REGISTER_VISITOR = gql(`
mutation RegisterVisitor {
    register {
      token
      isActive
      createdAt
      updatedAt
    }
  }
`)

export async function middleware(request: NextRequest) {
  // Creating session cookie if there's no visitor token used for authentication
  const response = NextResponse.next()

  if (!request.cookies.has('visitorToken')) {
    const result = await apolloClient
      .mutate({
        mutation: REGISTER_VISITOR,
        fetchPolicy: 'no-cache',
      })

    const token = result.data?.register?.token
    if (token) {
      response.cookies.set('visitorToken', token)
    }
  }

  return response
}