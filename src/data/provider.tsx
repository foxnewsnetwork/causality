import React from 'react';
import type { ReactNode } from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './client'

export default function CausalityDataProvider(props: { children: ReactNode }) {
  return (
    <ApolloProvider client={client}>
      {props.children}
    </ApolloProvider>
  )
}
