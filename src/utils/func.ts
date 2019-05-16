import { Fn2, Fn1 } from './types';
import { get } from './map';

export type CachedOutput2<A, B, C> = {
  cachedFn: Fn2<A, B, C>,
  bustFn: Fn2<A, B, void>
}

export type CacheMetaFn2 = typeof cache2
/**
 * Takes a function and returns a function that
 * caches its results based upon the results of
 * a cache
 * @param fn - function to cache
 * @param hashFn - expiration checker
 */
export function cache2<In1, In2, Out>(
  fn: (i1: In1, i2: In2) => Out,
  hashFn: (i1: In1, i2: In2) => string,
): CachedOutput2<In1, In2, Out> {
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