import { useCallback, useEffect, useMemo } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { ListTrainingSets } from 'data/queries/ListTrainingSets';
import type { ListTrainingSetResponse } from 'data/queries/ListTrainingSets';
import { CurrentTrainingSet } from 'data/queries/CurrentTrainingSet';
import type { CurrentTrainingSetResponse } from 'data/queries/CurrentTrainingSet';
import { ActivateTrainingSet } from 'data/mutations/ActivateTrainingSet';
import type { ActivateTrainingSetParams, ActivateTrainingSetResponse } from 'data/mutations/ActivateTrainingSet';

interface TrainingSetListState {
  trainingSets: ListTrainingSetResponse['trainingSets'];
  activeTrainingSet?: CurrentTrainingSetResponse['session']['trainingSet'];
  isLoadingTrainingSet: boolean;
  isLoadingActiveTrainingSet: boolean;
  isLoadingActivate: boolean;
  errorActivate?: Error;
  errorTrainingSet?: Error;
  errorActiveTrainingSet?: Error;
}

interface TrainingSetListAPI {
  state: TrainingSetListState;
  actions: {
    activateTrainingSet: (trainingSetId: string) => Promise<any>
  };
  isLoading: boolean;
  error?: Error;
}

function* product<A, B>(itA: Iterable<A>, itB: Iterable<B>) {
  for (const a of itA) {
    for (const b of itB) {
      yield [a, b]
    }
  }
}

function* map<A, B>(it: Iterable<A>, fn: (a: A) => B) {
  for (const i of it) {
    yield fn(i)
  }
}

function allKeysOf(objs: Array<any>, keys: Array<string>): Array<any> {
  return [...map(product(objs, keys), ([obj, key]) => obj[key])]
}

export default function useTrainingSetListAPI(): TrainingSetListAPI {
  const listQ = useQuery<ListTrainingSetResponse>(ListTrainingSets)
  const [
    activateTrainingSet,
    activeM,
  ] = useMutation<ActivateTrainingSetResponse, ActivateTrainingSetParams>(ActivateTrainingSet)
  const sessionQ = useQuery<CurrentTrainingSetResponse>(CurrentTrainingSet, {
    variables: {}
  })

  const state: TrainingSetListState = useMemo(() => {
    return {
      isLoadingActivate: activeM.loading,
      errorActivate: activeM.error,
      isLoadingTrainingSet: listQ.loading,
      isLoadingActiveTrainingSet: sessionQ.loading,
      errorLoadingTrainingSet: listQ.error,
      errorActiveTrainingSet: sessionQ.error,
      activeTrainingSet: sessionQ.data?.session?.trainingSet,
      trainingSets: listQ.data?.trainingSets ?? [],
    }
  }, allKeysOf([listQ, sessionQ, activeM], ['loading', 'error', 'data']))

  const actions = useMemo(() => ({
    activateTrainingSet: async (trainingSet: string) => {
      await activateTrainingSet({
        variables: { trainingSet }
      })
      await sessionQ.refetch()
    }
  }), [activateTrainingSet, sessionQ])

  return {
    state,
    actions,
    get isLoading() {
      return state.isLoadingActivate ||
        state.isLoadingActiveTrainingSet ||
        state.isLoadingTrainingSet;
    },
    get error() {
      return state.errorActivate ??
        state.errorActiveTrainingSet ??
        state.errorTrainingSet
    },
  }
}
