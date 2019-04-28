let _id = 0;

export function guid(): string {
  return `${Math.random()}-${now().toISOString()}-${_id++}`
}

export function now(): Date {
  return new Date()
}