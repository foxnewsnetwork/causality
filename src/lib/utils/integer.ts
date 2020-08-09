/**
 * Generates a random whole number between lower and upper bounds
 * @param lowerBound 
 * @param upperBound 
 */
export function random(lowerBound: number = 0, upperBound: number = 10): number {
  return Math.floor(Math.random() * (upperBound - lowerBound)) + lowerBound
}