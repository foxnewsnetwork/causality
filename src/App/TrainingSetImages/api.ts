import {
  useParams,
} from "react-router-dom";
import { GetTrainingSetImages } from 'data/queries/GetTrainingSetImages';
import type {
  GetTrainingSetImagesResponse,
  GetTrainingSetImagesParams
} from 'data/queries/GetTrainingSetImages';
import { useQuery } from '@apollo/client';
import { useMemo } from "react";

export interface TrainingSetImagesAPI {
  state: {
    images: GetTrainingSetImagesResponse['images'];
    loading: boolean;
    error: Error;
  }
}

interface TrainingSetURLParams {
  trainingSetId: string;
}

export default function useTrainingSetImagesAPI(): TrainingSetImagesAPI {
  const { trainingSetId } = useParams<TrainingSetURLParams>();
  const {
    data,
    loading,
    error,
    // fetchMore,
  } = useQuery<GetTrainingSetImagesResponse, GetTrainingSetImagesParams>(GetTrainingSetImages, {
    variables: {
      id: trainingSetId
    }
  })

  const state = useMemo(() => {
    let images = []
    if (!(loading || error)) {
      images = data.images
    }
    return { images, loading, error }
  }, [data, loading, error])

  return { state }
}
