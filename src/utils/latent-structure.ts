import { Graph, asIterator } from "./graph";
import { Variable } from "./probability";
import { map } from "./set";
import { all } from "./iter";

/**
 * Definition 2.3.2
 */
export type LatentStructure = {
  structure: Graph<string>,
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
  const obs = map(struct.observables, ({ name }) => name)
  const unobs = map(struct.unobservables, ({ name }) => name)
  return all(asIterator(struct.structure), ([name]) => obs.has(name) || unobs.has(name))
}
