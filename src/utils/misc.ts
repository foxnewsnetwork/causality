let _id = 0;

export function guid(): string {
  return `${Math.random()}-${now().toISOString()}-${_id++}`;
}

export function now(): Date {
  return new Date();
}

export function assert(
  shouldBeTrue: boolean,
  message: string,
  ...otherJunk: any[]
): void /* asserts shouldBeTrue is boolean */ {
  if (shouldBeTrue) {
    return;
  } else {
    console.error(message, ...otherJunk);
    throw new Error(message);
  }
}

export function assertPresent<T>(
  notNull: T
): void /* asserts notNull is NonNullable<T> */ {
  if (notNull != null) {
    return;
  } else {
    throw new Error('Null assertion failed')
  }
}