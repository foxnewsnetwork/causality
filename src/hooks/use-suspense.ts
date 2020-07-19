import { useCallback } from 'react';

type Suspender<T> = {
  read(): T;
  rerun(): void;
  purge(): void;
}

enum Status {
  PRERUN = "PRERUN",
  PENDING = "PENDING",
  ERROR = "ERROR",
  SUCCESS = "SUCCESS"
}

type State<T> = {
  status: Status,
  promise: Promise<void>,
  error?: Error,
  result?: T
}

const refMap: Map<Function, State<any>> = new Map();

export default function useSuspense<T>(asyncFn: () => Promise<T>): Suspender<T> {
  const state = refMap.get(asyncFn) || {
    status: Status.PRERUN,
    promise: Promise.resolve(),
  };

  const rerun = useCallback(() => {
    state.status = Status.PENDING;
    state.promise = asyncFn()
      .then(result => {
        state.result = result;
        state.status = Status.SUCCESS;
      })
      .catch(error => {
        state.error = error;
        state.status = Status.ERROR;
      });
    refMap.set(asyncFn, state)
  }, [asyncFn])

  const read = useCallback(() => {
    switch (state.status) {
      case Status.PRERUN:
        rerun();
        throw state.promise;
      case Status.ERROR:
        throw state.error;
      case Status.PENDING:
        throw state.promise;
      case Status.SUCCESS:
        return state.result as T;
      default:
        throw new Error('unknown error')
    }
  }, [state.status])

  const purge = useCallback(() => {
    refMap.delete(asyncFn);
  }, [asyncFn])

  return { read, rerun, purge };
}
