import { Variable } from "../probability";
import { Query, isDoQuery, getQueryDependencies } from "../probability/query";
import { Graph } from "../utils/graph";
import { VarClass } from "../probability/variable";
import { isSubset } from "../utils/set";

export type LatentStructure<V> = {
  dag: Graph<VarClass<V>>,
  observables: Set<VarClass<V>>
}

/**
 * A do-calculus query is considered identifiable if 
 * we can calculate the probability using data we have
 * on the observable portions of the causal model
 * 
 * @param strcture 
 * @param query 
 */
export function isIdentifiable<V = Variable>(structure: LatentStructure<V>, query: Query<V>): boolean {
  if (!isDoQuery(query)) {
    const deps = getQueryDependencies(query);
    return isSubset(structure.observables, deps);
  }

  // TODO: expand this so that we can reduce do expression to see expressions
}