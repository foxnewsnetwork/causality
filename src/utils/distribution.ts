import { range, map, reduce } from "./iter";
import { over } from "./map";
import { Table, equal as tableEq } from "./probability";

/**
 * A distribution is a function that generates an unique event
 * V with some probability
 */
export type Distribution<V> = () => V

/**
 * 
 * @param distA 
 * @param distB 
 * @param sampleSize - presumably, we'd want this to be a confidence value
 */
export function equal1<V>(distA: Distribution<V>, distB: Distribution<V>, sampleSize: number = 100) {
  return tableEq(sample(distA, sampleSize), sample(distB, sampleSize))
}

/**
 * 
 * @param distFn 
 * @param n 
 */
export function sample<V>(distFn: Distribution<V>, n: number = 100): Table<V> {
  const weight = 1 / n;
  const countUniq = (hashMap: Map<V, number>, v: V) => over(hashMap, v, (count = 0) => count + weight)
  const _1 = range(0, n)
  const _2 = map(_1, distFn)
  const _3 = reduce(_2, countUniq, new Map())
  return _3
}