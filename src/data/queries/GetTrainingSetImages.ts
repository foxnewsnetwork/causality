import gql from 'graphql-tag.macro';

export const GetTrainingSetImages = gql`
  query GetTrainingSetImages($id: ID!) {
    images(id: $id) {
      id
      path
      label
    }
  }
`

export interface GetTrainingSetImagesResponse {
  images: Array<{
    id: string;
    path: string;
    label?: string;
  }>
}

export interface GetTrainingSetImagesParams {
  id: string;
}
