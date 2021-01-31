import {
  useState,
  useCallback,
  useMemo,
} from 'react';
import { useMutation } from '@apollo/client';
import { CreateTrainingSet } from 'data/mutations/CreateTrainingSet';
import type {
  CreateTrainingSetParams,
  CreateTrainingSetResponse,
} from 'data/mutations/CreateTrainingSet';

export interface TrainingSetCreateAPI {
  state: {
    name: string;
    isRunning: boolean;
    data?: CreateTrainingSetResponse;
    error?: Error;
  };
  actions: {
    submitForm: () => Promise<any>;
    changeName: (name: string) => void;
  }
}

export default function useTrainingSetCreateAPI(): TrainingSetCreateAPI {
  const [name, changeName] = useState('my training set');
  const [
    createTrainingSet,
    { loading: isRunning, error, data },
  ] = useMutation<CreateTrainingSetResponse, CreateTrainingSetParams>(CreateTrainingSet);
  const submitForm = useCallback(() => {
    return createTrainingSet({
      variables: { name }
    })
  }, [name, createTrainingSet])

  const state = useMemo(() => ({
    name, isRunning, error, data
  }), [name, isRunning, error])

  return {
    state,
    actions: {
      changeName, submitForm
    }
  }
}
