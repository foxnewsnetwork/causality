import { Variable } from "../probability";
import { Query, isDoQuery, isDoEvent, getQueryDependencies } from "../probability/query";
import { Graph, disownParents, disownChildren } from "../utils/graph";
import { VarClass } from "../probability/variable";
import { isSubset, empty, isMember } from "../utils/set";
import { dSeparated } from "../utils/d-separation";
import { first, filter } from "../utils/iter";

export type LatentStructure<V> = {
  dag: Graph<VarClass<V>>,
  observables: Set<VarClass<V>>
}

/**
 * A do-calculus query is considered identifiable if 
 * we can calculate the probability using data we have
 * on the observable portions of the causal model
 * 
 * From theorem 4.3.3 in Judea Pearl's causality 
 * 
 * @param strcture 
 * @param query 
 */
export function isIdentifiable<V = Variable>(structure: LatentStructure<V>, query: Query<V>): boolean {
  if (!isDoQuery(query)) {
    const deps = getQueryDependencies(query);
    return isSubset(structure.observables, deps);
  }

  const emptySet = empty();
  const { dag: graph } = structure;
  const { events, given } = query;
  // TODO: figure out what to do when X and Y are joint distributions
  const seeX = first(filter(given, isDoEvent));
  const seeY = first(events);
  const graphDoX = disownParents(graph, seeX.VarClass)
  // When X and Y are independent in the graph where X has no parents
  if (dSeparated(graphDoX, emptySet, seeX.VarClass, seeY.VarClass)) {
    // And the probability is just p(seeY.value)
    return isMember(structure.observables, seeY.VarClass);
  }

  // When X and Y are independent in the graph where X has no children
  const graphChildlessX = disownChildren(graph, seeX.VarClass);
  if (dSeparated(graphChildlessX, emptySet, seeX.VarClass, seeY.VarClass)) {
    // The probability is p(seeY.value | seeX.value)
    return isMember(structure.observables, seeY.VarClass) && isMember(structure.observables, seeX.VarClass)
  }

  // const blockers = blockingSet(graph, seeX.VarClass, seeY.VarClass);
  // TODO: continue this, probably rename to `ClosedForm`
  return false;
}
