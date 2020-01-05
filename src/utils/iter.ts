import { Fn2 } from './types';

export function reduce<T, X>(iter: Iterable<T>, reduceFn: Fn2<X, T, X>, init: X): X {
  for (const t of iter) {
    init = reduceFn(init, t)
  }
  return init;
}

export function* map<T, O>(iter: Iterable<T>, mapFn: (t: T) => O): Iterable<O> {
  for (const t of iter) {
    yield mapFn(t)
  }
}

export function* filter<T>(iter: Iterable<T>, filterFn: (t: T) => boolean): Iterable<T> {
  for (const t of iter) {
    if (filterFn(t)) {
      yield t;
    }
  }
}

export function* concat<T>(itA: Iterable<T>, itB: Iterable<T>): Iterable<T> {
  for (const a of itA) {
    yield a;
  }
  for (const b of itB) {
    yield b;
  }
}

export function any<T>(it: Iterable<T>, checkFn: (t: T) => boolean): boolean {
  for (const t of it) {
    if (checkFn(t)) {
      return true;
    }
  }
  return false;
}

export function isEmpty<T>(it: Iterable<T>): boolean {
  for (const _ of it) {
    return false
  }
  return true
}

export function all<T>(it: Iterable<T>, isStillTrue: (t: T) => boolean): boolean {
  return reduce(it, (wasTrue: boolean, t) => wasTrue && isStillTrue(t), true)
}

export function has<T>(it: Iterable<T>, t: T): boolean {
  return any(it, x => x === t);
}

export function* push<T>(it: Iterable<T>, t: T): Iterable<T> {
  yield* it
  yield t
}

export function* unshift<T>(it: Iterable<T>, t: T): Iterable<T> {
  yield t
  yield* it
}

export function* zero(): Iterable<any> { }

export function* lift0<T>(t: T): Iterable<T> {
  yield t
}

/**
 * Given two lists like:
 * 
 * a = [1,2,3]
 * b = ["a", "b", "c", "d"]
 * 
 * and a zip function that looks like:
 * 
 * zipFn = (a, b) => `${a}-${b}`
 * 
 * It will return an iterable that would yield out like
 * 
 * ['1-a', '2-b', '3-c']
 * 
 * Before terminating.
 * 
 * The resulting iterable will have the length of the
 * which ever member is shorter
 * 
 * @param itA 
 * @param itB 
 * @param zipFn 
 */
export function* zipWith<A, B, C>(itA: Iterable<A>, itB: Iterable<B>, zipFn: (a: A, b: B) => C): Iterable<C> {
  if (isEmpty(itA) || isEmpty(itB)) {
    return
  } else {
    yield zipFn(first(itA), first(itB))
    const restA = skip(itA, 1)
    const restB = skip(itB, 1)
    yield* zipWith(restA, restB, zipFn)
  }
}

/**
 * Due to limitations with typescript, iterables can't contain nulls
 * @param it 
 */
export function first<T>(it: Iterable<T>): T {
  let output;
  for (const t of it) {
    output = t;
    break;
  }
  if (output != null) {
    return output;
  } else {
    throw new Error('unexpected empty iterator')
  }
}

export function* skip<T>(it: Iterable<T>, n: number): Iterable<T> {
  let i = 0;
  for (const t of it) {
    if (i < n) {
      i++
    } else {
      yield t
    }
  }
}

export function* drop<T>(it: Iterable<T>, n: number): Iterable<T> {
  let i = 0
  for (const t of it) {
    if (i > n) {
      yield t
    } else {
      i++
    }
  }
}

export function* take<T>(it: Iterable<T>, n: number): Iterable<T> {
  let i = 0;
  for (const t of it) {
    if (i >= n) {
      return;
    } else {
      i++;
      yield t;
    }
  }
}

export function* takeWhile<T>(it: Iterable<T>, condFn: (t: T) => boolean): Iterable<T> {
  for (const t of it) {
    if (condFn(t)) {
      yield t;
    } else {
      continue;
    }
  }
}

export function* takeUntil<T>(
  it: Iterable<T>,
  condFn: (t: T) => boolean
): Iterable<T> {
  for (const t of it) {
    if (condFn(t)) {
      yield t;
    } else {
      break;
    }
  }
}

export function* range(start: number, finish: number, step: number = 1): Iterable<number> {
  for (let i = start; i < finish; i += step) {
    yield i
  }
}