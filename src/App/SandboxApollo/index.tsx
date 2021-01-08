import React from 'react';
import { useQuery } from '@apollo/client';
import { CreateModel } from 'data/mutations/CreateModel.graphql';

/**
 * See apollo graph-ql usage docs and examples here:
 * https://www.apollographql.com/docs/react/data/queries/
 */
export default function SandboxApollo() {
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
      <p>{JSON.stringify(data)}</p>
    </div>
  )
}
