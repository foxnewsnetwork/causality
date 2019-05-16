import { Graph, getParents } from "./graph";
import { assert } from "./misc";
import { isEqual, map, union } from "./set";
import { Parameterization, randomStochastic, randomLinearStructural } from "./equation";
import { LatentStructure } from './latent-structure';
import { Variable } from './probability';
import { reduce } from "./iter";
import { T2 } from "./types";

/**
 * This is defintion 2.2.2 on page 44 of the causality book
 */
export type CausalModel = {
  structure: Graph<Variable<any>>,
  parameters: Parameterization<any>
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
 */
export function isPreferred(strA: LatentStructure, strB: LatentStructure): boolean {
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

export function randomLinearCausalModel(structure: LatentStructure): CausalModel {
  // generate stochastic equations
  const stochasticPairs = map(structure.unobservables, unobs => [unobs, randomStochastic(unobs)])
  // generate structural equations
  const structuralPairs = map(structure.observables, obs =>
    [obs, randomLinearStructural(obs, getParents(structure.structure, obs))]
  )

  return {
    structure: structure.structure,
    parameters
  }
}