import { Graph, asIterator } from "./graph";
import { Variable } from "./variable";
import { map } from "./set";
import { all } from "./iter";

/**
 * Definition 2.3.2
 */
export type LatentStructure = {
  structure: Graph<Variable<any>>,
  observables: Set<Variable<any>>,
  unobservables: Set<Variable<any>>
}

/**
 * A structure is only valid if:
 * 
 * - every node is either observable or unobservable
 * 
 * @param struct 
 */
export function isValid(struct: LatentStructure): boolean {
  const {
    observables,
    unobservables
  } = struct;
  return all(asIterator(struct.structure), ([variable]) => observables.has(variable) || unobservables.has(variable))
}
