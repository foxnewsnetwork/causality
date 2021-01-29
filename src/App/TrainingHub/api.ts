import { useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { ListTrainingSets } from 'data/queries/ListTrainingSets';
import type { ListTrainingSetResponse } from 'data/queries/ListTrainingSets';

interface TrainingHubAPI {
  state: {
    trainingSets: ListTrainingSetResponse['trainingSets'];
    loading: boolean;
    error: Error;
  };
  actions?: any;
}

export default function useTrainingHubAPI(): TrainingHubAPI {
  const {
    data,
    loading,
    error,
    // fetchMore,
  } = useQuery<ListTrainingSetResponse>(ListTrainingSets)

  const state = useMemo(() => {
    let trainingSets = [];
    if (!loading && !error) {
      trainingSets = data.trainingSets
    }
    return { trainingSets, loading, error };
  }, [data, loading, error])

  return { state }
}
