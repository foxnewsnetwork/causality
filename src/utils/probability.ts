import { range, map, reduce } from "./iter";
import { over, mapValues } from "./map";

export type DistributionTable<V> = Map<V, ProbabilityTableEntry<V>>

/**
 * A distribution is a function that generates an unique event
 * V with some probability
 */
export type Distribution<V> = () => V

export type ProbabilityTableEntry<Value> = {
  event: Value,
  probability: Probability
}

// Number between 0 and 1
export type Probability = number;

export type ProbabilityTable<Value> = Map<Value, ProbabilityTableEntry<Value>>

export function equal<V>(distA: Distribution<V>, distB: Distribution<V>, threshold: number = 0.01) {

}

/**
 * 
 * @param distFn 
 * @param n 
 */
export function sample<V>(distFn: Distribution<V>, n: number = 100): DistributionTable<V> {
  const weight = 1 / n;
  const countUniq = (hashMap: Map<V, number>, v: V) => over(hashMap, v, (count = 0) => count + weight)
  const _1 = range(0, n)
  const _2 = map(_1, distFn)
  const _3 = reduce(_2, countUniq, new Map())
  return mapValues(_3, ([v, n]) => ({ event: v, probability: n }))
}