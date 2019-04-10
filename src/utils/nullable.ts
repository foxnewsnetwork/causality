export type Nullable<T> = T | null;

export function lift<T>(x: T): Nullable<T> {
  return x;
}

type Fn<A, B> = (a: A) => B;

export const fmap = <A, B>(mapFn: Fn<A, B>) => (x: Nullable<A>): Nullable<B> =>
  x != null ? mapFn(x) : null;

export const ap = <A, B>(fn: Nullable<Fn<A,B>>) => (x: Nullable<A>): Nullable<B> =>
  fn != null ? fmap(fn)(x) : null;

export const mbind = <A, B>(fn: Fn<A, Nullable<B>>) => (x: Nullable<A>): Nullable<B> =>
  fmap(fn)(x)