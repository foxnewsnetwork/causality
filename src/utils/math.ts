/**
 * Math topics include:
 * 
 * - measure theory
 * - TBD
 */

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
export type Measure<M> = (m: M) => number

export type Equation<Variable> = (disturbance: Variable, ...parents: Variable[]) => Variable;