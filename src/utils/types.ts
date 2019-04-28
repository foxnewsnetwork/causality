export type T2<A, B> = [A, B];

export type Fn0<B> = () => B;

export type Fn1<A, B> = (a: A) => B;

export type Fn2<A1, A2, B> = (a1: A1, a2: A2) => B;

export type Fn3<A1, A2, A3, B> = (a1: A1, a2: A2, a3: A3) => B

// https://github.com/Microsoft/TypeScript/blob/v3.3.1/lib/lib.es5.d.ts#L1474
export type Param1<T extends (...args: any[]) => any> = Parameters<T>[0]

export type Param2<T extends (...args: any[]) => any> = Parameters<T>[1]