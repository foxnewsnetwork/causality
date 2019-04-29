import { Fn2, Fn1 } from './types';
import { get } from './map';

export type CachedOutput2<A, B, C> = {
  cachedFn: Fn2<A, B, C>,
  bustFn: Fn2<A, B, void>
}

export type CacheMetaFn2<A1, A2, R> = (
  fn2Cache: (a1: A1, a2: A2) => R,
  hashFn: (a1: A1, a2: A2) => string
) => CachedOutput2<A1, A2, R>
/**
 * Takes a function and returns a function that
 * caches its results based upon the results of
 * a cache
 * @param fn - function to cache
 * @param hashFn - expiration checker
 */
export const cache2: CacheMetaFn2<any, any, any> = (fn, hashFn) => {
  const storage: Map<string, any> = new Map()

  const cachedFn = (a: any, b: any) => {
    const hashKey = hashFn(a, b)
    if (storage.has(hashKey)) {
      return get(storage, hashKey)
    } else {
      const result = fn(a, b)
      storage.set(hashKey, result)
      return result
    }
  }

  const bustFn = (a: any, b: any) => {
    const hashKey = hashFn(a, b)
    storage.delete(hashKey)
  }

  return { cachedFn, bustFn }
}

export function pipe<A, B, C>(inFn: Fn1<A, B>, outFn: Fn1<B, C>): Fn1<A, C> {
  return a => outFn(inFn(a))
}