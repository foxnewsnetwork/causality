import { useCallback, useMemo } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { ListTrainingSets } from 'data/queries/ListTrainingSets';
import type { ListTrainingSetResponse } from 'data/queries/ListTrainingSets';
import { CurrentTrainingSet } from 'data/queries/CurrentTrainingSet';
import type { CurrentTrainingSetResponse } from 'data/queries/CurrentTrainingSet';
import { ActivateTrainingSet } from 'data/mutations/ActivateTrainingSet';
import type { ActivateTrainingSetParams, ActivateTrainingSetResponse } from 'data/mutations/ActivateTrainingSet';

interface TrainingSetListAPI {
  state: {
    trainingSets: ListTrainingSetResponse['trainingSets'];
    activeTrainingSet?: CurrentTrainingSetResponse['session']['trainingSet'];
    loading: boolean;
    error: Error;
  };
  actions: {
    activateTrainingSet: (trainingSetId: string) => Promise<any>
  };
}

export default function useTrainingSetListAPI(): TrainingSetListAPI {
  const listQ = useQuery<ListTrainingSetResponse>(ListTrainingSets)
  const [
    activateTrainingSet,
  ] = useMutation<ActivateTrainingSetResponse, ActivateTrainingSetParams>(ActivateTrainingSet)
  const sessionQ = useQuery<CurrentTrainingSetResponse>(CurrentTrainingSet)

  const state = useMemo(() => {
    let trainingSets = [];
    if (!listQ.loading && !listQ.error) {
      trainingSets = listQ.data.trainingSets
    }
    let activeTrainingSet;
    if (!sessionQ.loading && !sessionQ.error) {
      activeTrainingSet = sessionQ.data.session?.trainingSet
    }
    return {
      trainingSets,
      loading: listQ.loading || sessionQ.loading,
      error: listQ.error || sessionQ.error,
      activeTrainingSet,
    };
  }, [listQ.loading, sessionQ.loading])

  const actions = useMemo(() => ({
    async activateTrainingSet(trainingSet: string) {
      await activateTrainingSet({
        variables: { trainingSet }
      })
      await sessionQ.refetch()
    }
  }), [activateTrainingSet, sessionQ])

  return { state, actions }
}
