import { useRef, useEffect, useCallback } from 'react';

type Suspender<T> = {
  read(): T;
  rerun(): void;
}

const enum Status {
  PENDING,
  ERROR,
  SUCCESS
}

export default function useSuspense<T>(asyncFn: () => Promise<T>): Suspender<T> {
  const promiseRef = useRef<Promise<void>>();
  const resultRef = useRef<T>();
  const errorRef = useRef<Error>();
  const statusRef = useRef<Status>(Status.PENDING);

  const rerun = useCallback(() => {
    statusRef.current = Status.PENDING;
    promiseRef.current = asyncFn()
      .then(result => {
        resultRef.current = result;
        statusRef.current = Status.SUCCESS;
      })
      .catch(error => {
        errorRef.current = error;
        statusRef.current = Status.ERROR;
      });
  }, [])

  useEffect(rerun);

  const read = useCallback(() => {
    switch (statusRef.current) {
      case Status.ERROR:
        throw errorRef.current;
      case Status.PENDING:
        throw promiseRef.current;
      case Status.SUCCESS:
        return resultRef.current as T;
      default:
        throw new Error('unknown error')
    }
  }, [statusRef])

  return { read, rerun };
}
