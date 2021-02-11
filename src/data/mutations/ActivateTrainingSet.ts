import gql from 'graphql-tag.macro';

export const ActivateTrainingSet = gql`
  mutation ActivateTrainingSet($trainingSet: ID!) {
    updateSession(trainingSet: $trainingSet) {
      trainingSet {
        id
        name
      }
    }
  }
`

export interface ActivateTrainingSetResponse {
  updateSession: {
    trainingSet: {
      id: string;
      name: string;
    }
  }
}

export interface ActivateTrainingSetParams {
  trainingSet: string
}
