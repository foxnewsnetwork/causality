import { Variable } from './variable';
/**
 * For whatever reason, we need slightly more metadata
 */

/**
 * Alias or a number between 0 and 1
 */
export type Probability = number;
/**
 * The `measure` is a way to assign size to
 * members of a set
 * 
 * See wikipedia for more details
 * 
 * https://en.wikipedia.org/wiki/Measure_(mathematics)
 * 
 * We use this concept heavily in probability
 */
export type Measure = (v: Variable) => Probability

export type Equation= (disturbance: Probability, parents: Map<typeof Variable, Variable>) => Variable;