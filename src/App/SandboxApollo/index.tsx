import React from 'react';
import { useQuery } from '@apollo/client';
import { HelloWorld } from 'data/queries/HelloWorld';
import { Container } from '@material-ui/core';

/**
 * See apollo graph-ql usage docs and examples here:
 * https://www.apollographql.com/docs/react/data/queries/
 */
function SandboxApollo() {
  const {
    loading,
    error,
    data,
  } = useQuery(HelloWorld);
  if (loading) {
    return (
      <p>Now Loading...</p>
    )
  }
  if (error) {
    return (
      <div>
        <p>{error.name}</p>
        <p>ERROR!: {error.message}</p>
      </div>
    )
  }
  return (
    <div>
      <p>Hello Sandbox Apollo</p>
      <p>{JSON.stringify(data)}</p>
    </div>
  )
}

export default function WrappedSandbox() {
  return (
    <Container>
      <SandboxApollo />
    </Container>
  )
}
