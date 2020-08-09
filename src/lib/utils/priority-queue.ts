import {
  Nullable, mbind, fmap, LiftA1
} from './nullable';

export type PQueue<T> = {
  payload: T,
  priority: number,
  left: Nullable<PQueue<T>>,
  right: Nullable<PQueue<T>>
};

function _first<T>(p: PQueue<T>): Nullable<T> {
  return p.payload;
}
export const first: LiftA1<typeof _first> = fmap(_first)

function _pop<T>(p: PQueue<T>): Nullable<PQueue<T>> {
  return merge(p.left, p.right)
}
export const pop: LiftA1<typeof _pop> = mbind(_pop) as LiftA1<typeof _pop>

export function push<T>(p: PQueue<T>, priority: number, payload: T): PQueue<T> {
  const newQueue = create(payload, priority);
  const nextQueue = merge(p, newQueue);
  if (isPresent(nextQueue)) {
    return nextQueue
  } else {
    throw new Error('Unexpected null queue after adding')
  }
}
export function create<T>(payload: T, priority: number = Infinity): PQueue<T> {
  return { payload, priority, left: null, right: null }
}
export function isBlank<T>(x: Nullable<PQueue<T>>): x is PQueue<T> {
  return x === null || x === undefined;
}
export function isPresent<T>(x: Nullable<PQueue<T>>): x is PQueue<T> {
  return !isBlank(x);
}
export function merge<T>(qLeft: Nullable<PQueue<T>>, qRight: Nullable<PQueue<T>>): Nullable<PQueue<T>> {
  if (isBlank(qLeft) && isPresent(qRight)) {
    return qRight;
  } else if (isBlank(qRight) && isPresent(qLeft)) {
    return qLeft;
  } else if (isPresent(qLeft) && isPresent(qRight) && priority(qLeft) >= priority(qRight)) {
    const { left, right } = qRight;

    if (priority(right) <= priority(qLeft)) {
      return {
        ...qRight,
        right: merge(right, qLeft)
      }
    } else {
      return {
        ...qRight,
        left: merge(left, qLeft)
      }
    }
  } else if (isPresent(qLeft) && isPresent(qRight) && priority(qLeft) < priority(qRight)) {
    return merge(qRight, qLeft)
  } else {
    return null;
  }
}
export function priority<T>(q: Nullable<PQueue<T>>): number {
  return isPresent(q) ? q.priority : Infinity
}
