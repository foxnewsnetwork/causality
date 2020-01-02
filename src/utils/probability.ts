import { intersect, diff } from "./set";
import { map, all } from "./iter";

/**
 * Probability tables are the core of any engineering
 * enterprise that needs equality and stuff
 */

// Number between 0 and 1
export type Probability = number;

export type Table<A> = Map<A, Probability>

export function equal<T>(tA: Table<T>, tB: Table<T>, threshold: number = 0.01): boolean {
  const keysA = new Set(tA.keys())
  const keysB = new Set(tB.keys())
  const sharedKeys = intersect(keysA, keysB)

  const _1 = map(sharedKeys, key => [tA.get(key), tB.get(key)])
  const sharedProps = map(_1, ([vA = 0, vB = 0]) => Math.abs(vA - vB))

  const aOnlyKeys = diff(keysA, keysB)
  const aOnlyProps = map(aOnlyKeys, key => tA.get(key) || 0)

  const bOnlyKeys = diff(keysB, keysA)
  const bOnlyProps = map(bOnlyKeys, key => tB.get(key) || 0)

  const isBelowThreshold = (n: number) => n < threshold
  return all(sharedProps, isBelowThreshold) && all(aOnlyProps, isBelowThreshold) && all(bOnlyProps, isBelowThreshold)
}