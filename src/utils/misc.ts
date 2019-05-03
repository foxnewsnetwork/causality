let _id = 0;

export function guid(): string {
  return `${Math.random()}-${now().toISOString()}-${_id++}`
}

export function now(): Date {
  return new Date()
}

export function assert(shouldBeTrue: boolean, message: string, ...otherJunk: any[]): void {
  if (shouldBeTrue) {
    return
  } else {
    console.error(message, ...otherJunk)
    throw new Error(message)
  }
}