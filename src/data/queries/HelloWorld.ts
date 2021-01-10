import gql from 'graphql-tag.macro';

export const HelloWorld = gql`
  query HelloWorld {
    dogs {
      id
      breed
    }
  }
`
