import { Graph, getParents } from "./graph";
import { assert } from "./misc";
import { isEqual, map } from "./set";
import { Parameterization, randomStochastic, randomLinearStructural, Equation } from "./equation";
import { LatentStructure } from './latent-structure';
import { Variable } from './probability';
import { reduce } from "./iter";
import { mutSet } from './map';

/**
 * This is defintion 2.2.2 on page 44 of the causality book
 */
export type CausalModel = {
  structure: Graph<Variable<any>>,
  parameterization: Parameterization<any>
}

/**
 * Checks if `strA` is preferred over `strB`.
 * 
 * As per Definition 2.3.3, this means that if
 * `strA` is preferred to `strB`, then `strA`
 * must have a less complex probability distribution
 * over all its observables than B.
 * 
 * Obviously, `strA` and `strB` must have the same
 * set of observables, otherwise, we're comparing apples
 * to oranges
 * @param strA 
 * @param strB 
 * @param confidence
 */
export function isPreferred(strA: LatentStructure, strB: LatentStructure, confidence: number = 0.95): boolean {
  assert(
    isEqual(strA.observables, strB.observables),
    "Can't prefer models with different observables"
  )

  // Somehow implement that every `CausalModel` of `strA`
  // has a distribution that can be equivalent some
  // CausalModel of `strB`

  
}

export function* genLinearCausalModels(struct: LatentStructure): Iterable<CausalModel> {
  while(true) {
    yield randomLinearCausalModel(struct)
  }
}

type EqPair<T> = {
  variable: Variable<T>,
  equation: Equation<T>
}
const reduceParam = <T>(map: Parameterization<T>, pair: EqPair<T>) => mutSet(map, pair.variable, pair.equation)
export function randomLinearCausalModel(structure: LatentStructure): CausalModel {
  // generate stochastic equations
  const stochasticPairs = map(structure.unobservables, variable => ({
    variable, 
    equation: randomStochastic(variable)
  }))

  // generate structural equations
  const structuralPairs = map(structure.observables, variable => ({
    variable,
    equation: randomLinearStructural(variable, getParents(structure.structure, variable))
  }))
  
  // Put the pairs into a parameterization
  const _para = reduce(stochasticPairs, reduceParam, new Map())
  const parameterization = reduce(structuralPairs, reduceParam, _para)

  return {
    structure: structure.structure,
    parameterization
  }
}