type PQueue<T> = {
  payload: T,
  priority?: number, // theoretically anything Ord will do
  left?: PQueue<T>,
  right?: PQueue<T>
}

export function first<T>(p: PQueue<T>): T {
  return p.payload;
}
export function pop<T>(p: PQueue<T>): PQueue<T> | void {
  return merge(p.left, p.right)
}
export function push<T>(p: PQueue<T>, priority: number, payload: T): PQueue<T> {
  const newQueue = create(payload, priority);
  return merge(p, newQueue);
}
export function create<T>(payload: T, priority: number = 0): PQueue<T> {
  return { payload, priority }
}
export function isBlank<T>(x?: PQueue<T>): x is PQueue<T> {
  return x === null || x === undefined;
}
export function isPresent<T>(x?: PQueue<T>): x is PQueue<T> {
  return !isBlank(x);
}
export function merge<T>(qLeft?: PQueue<T>, qRight?: PQueue<T>): PQueue<T> {
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
    throw new Error("YOU SHOULD NOT MERGE TWO EMPTY QUEUES")
  }
}
export function priority<T>(q?: PQueue<T>): number {
  return (isPresent(q) && q.priority != null) ? q.priority : Infinity
}