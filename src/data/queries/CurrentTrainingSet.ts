import gql from 'graphql-tag.macro';

export const CurrentTrainingSet = gql`
  query CurrentTrainingSet {
    session {
      trainingSet {
        id
        name
      }
    }
  }
`

export interface CurrentTrainingSetResponse {
  session: {
    trainingSet: {
      id: string;
      name: string;
    }
  }
}
