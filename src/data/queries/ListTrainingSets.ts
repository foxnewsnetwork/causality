import gql from 'graphql-tag.macro';

export const ListTrainingSets = gql`
  query ListTrainingSets {
    trainingSets {
      id
      name
    }
  }
`

export interface ListTrainingSetResponse {
  trainingSets: Array<{
    id: string;
    name: string;
  }>
}
