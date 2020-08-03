import { useState, useCallback } from 'react';

type AsyncStatus = 'prerun' | 'pending' | 'success' | 'failure';

type AsyncAPI<E, T> = [T | undefined, AsyncStatus, (e: E) => Promise<T>];

export default function useAsyncAction<E, T>(action: (e: E) => Promise<T>): AsyncAPI<E, T> {
  const [status, setStatus] = useState<AsyncStatus>('prerun');
  const [value, setValue] = useState<T>();
  const fn = useCallback((e: E) => {
    return action(e).then(result => {
      setValue(result)
      setStatus('success')
      return result
    }).catch(error => {
      setStatus('failure');
      throw error;
    })
  }, []);
  return [value, status, fn];
}
