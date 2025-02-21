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
  // Creating session cookie if there's no visitor data used for authentication
  const response = NextResponse.next()

  if (!request.cookies.has('visitor')) {
    const result = await apolloClient
      .mutate({
        mutation: REGISTER_VISITOR,
        fetchPolicy: 'no-cache',
      })

    const visitor = result.data?.register
    if (visitor && visitor.isActive) {
      response.cookies.set('visitor', JSON.stringify(visitor))
    }
  }

  return response
}