import React from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { Container } from '@material-ui/core';

const CreateModel = gql`
  query HelloWorld {
    dogs {
      id
      type
    }
  }
`

/**
 * See apollo graph-ql usage docs and examples here:
 * https://www.apollographql.com/docs/react/data/queries/
 */
function SandboxApollo() {
  const {
    loading,
    error,
    data,
  } = useQuery(CreateModel);
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
