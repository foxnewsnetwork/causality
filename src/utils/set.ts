import { Fn2, Fn1 } from "./types";

/**
 * Set helpers
 */

export function union<T>(sA: Set<T>, sB: Set<T>): Set<T> {
  const out = clone(sA)
  for (const b of sB) {
    if (!out.has(b)) {
      out.add(b)
    }
  }
  return out;
}

/**
 * Just like `Set#add` except this is immutable
 * @param sA - Set
 * @param a - a member
 */
export function add<A>(sA: Set<A>, a: A): Set<A> {
  if (sA.has(a)) {
    return sA
  } else {
    return union(sA, lift0(a))
  }
}

/**
 * Just like `Set#delete` except immutable
 * @param sA 
 * @param t 
 */
export function remove<T>(sA: Set<T>, t: T): Set<T> {
  return diff(sA, lift0(t))
}

export function lift0<T>(t: T): Set<T> {
  const out = new Set()
  out.add(t)
  return out
}

export function clone<T>(s: Set<T>): Set<T> {
  return new Set(s)
}

export const empty: () => Set<any> = () => new Set()

export const subset = filter;

export function filter<T>(sA: Set<T>, checkFn: Fn1<T, boolean>): Set<T> {
  return reduce(sA, (sB, a) => checkFn(a) ? sB.add(a) : sB, new Set())
}

export function diff<T>(sA: Set<T>, sB: Set<T>): Set<T> {
  return subset(sA, a => !sB.has(a))
}

export function intersect<T>(sA: Set<T>, sB: Set<T>): Set<T> {
  const aEx = diff(sA, sB)
  const bEx = diff(sB, sA)
  const aUb = union(sA, sB)
  return diff(diff(aUb, aEx), bEx)
}

export function isEmpty(s: Set<any>): boolean {
  return cardinality(s) === 0;
}

export const isPresent: typeof isEmpty = s => !isEmpty(s)

export function reduce<A, T>(sA: Set<T>, rFn: Fn2<A, T, A>, init: A): A {
  for (const a of sA) {
    init = rFn(init, a)
  }
  return init
}

export function map<A, B>(sA: Set<A>, fn: Fn1<A, B>): Set<B> {
  return reduce(sA, (sB, a) => sB.add(fn(a)), new Set())
}

export function flatten<A>(ssA: Set<Set<A>>): Set<A> {
  return reduce(ssA, union, empty())
}

export function flatMap<A, B>(sA: Set<A>, fn: Fn1<A, Set<B>>): Set<B> {
  return flatten(map(sA, fn))
}

export function cardinality(sA: Set<any>): number {
  return sA.size
}

export function isMember<T>(s: Set<T>, t: T): boolean {
  return s.has(t)
}