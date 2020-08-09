import { ApolloClient, InMemoryCache } from '@apollo/client';
import typeDefs from './schema.gql';

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  typeDefs
})
