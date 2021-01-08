import { ApolloClient, InMemoryCache } from '@apollo/client';

const URI_MAP = {
  development: 'http://localhost:5555',
  test: 'tbd',
  production: 'tbd',
};

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: URI_MAP[process.env.NODE_ENV],
})

export default client;
