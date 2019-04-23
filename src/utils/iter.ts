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

export function all<T>(it: Iterable<T>, isStillTrue: (t: T) => boolean): boolean {
  return reduce(it, (wasTrue: boolean, t) => wasTrue && isStillTrue(t), true)
}