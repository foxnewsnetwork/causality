import gql from 'graphql-tag.macro';

export const CreateTrainingSet = gql`
  mutation CreateTrainingSet($name: String!) {
    createTrainingSet(data: { name: $name }) {
      id
      name
    }
  }
`

export interface CreateTrainingSetResponse {
  createTrainingSet: {
    id: string;
    name: string;
  }
}

export interface CreateTrainingSetParams {
  name: string
}
