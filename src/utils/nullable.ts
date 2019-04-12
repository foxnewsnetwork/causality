export type Nullable<T> = T | null;

export type LiftA1<F extends Fn<any, any>> = (a: Nullable<ArgumentType<F>>) => Nullable<ReturnType<F>>

type ArgumentType<F extends Function> = F extends (arg: infer A) => any ? A : never;

type Fn<A, B> = (a: A) => B;

type NFn<A, B> = LiftA1<Fn<A, B>>;

export function fmap<A, B>(mapFn: Fn<A, B>): NFn<A, B> {
  return x => x != null ? mapFn(x) : null;
}

export function ap<A, B>(fn: Nullable<Fn<A, B>>): NFn<A, B> {
  const ffn = fn != null ? fn : () => null;
  return fmap(ffn);
}

export function mbind<A, B>(fn: Fn<A, Nullable<B>>): NFn<A, B> {
  return fmap(fn);
}