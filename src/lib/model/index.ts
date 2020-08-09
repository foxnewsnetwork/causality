import { Graph, getParents } from "../utils/graph";
import { Variable, Measure, Equation, sample as sampleDistribution, Distribution } from '../probability';
import { get, reduce, mutSet, clone } from "../utils/map";
import { map, all } from "../utils/iter";
import { VarClass } from "../probability/variable";

/**
 * This is defintion 2.2.2 on page 44 of the causality book
 */
export type CausalModel<V = Variable> = {
  dag: Graph<VarClass<V>>,
  parametrization: {
    equations: Map<VarClass<V>, Equation<V>>,
    disturbances: Map<VarClass<V>, Measure<V>>
  }
}

/**
 * Representation of the standard probability query.
 * Effectively read as:
 * 
 * P(events | conditions)
 */

/**
 * Takes a causal model and generates data for it.
 * We attempt to get something that looks like:
 * 
 * | v1 | v2 | v3 | ... |
 * |----|----|----|-----|
 * | 1  | 0  | 1  | 1   |
 * | 0  | 0  | 0  | 1   |
 * ...
 * onwards to infinity
 * @param model 
 */
export function* runModel<V = Variable>(model: CausalModel<V>): Iterable<Map<VarClass<V>, V>> {
  while (true) {
    yield sample(model);
  }
}

/**
 * Runs a causal model simulation once and gets one
 * row of results where each column corresponds to the
 * actual value of an variable
 * @param model 
 */
export function sample<V = Variable>(model: CausalModel<V>): Map<VarClass<V>, V> {
  const disturbedTable: Map<VarClass<V>, V> = reduce(
    model.parametrization.disturbances,
    (table, [VarKlass, probMeasure]) => {
      const distribution: Distribution = map(VarKlass.domain(), iVar => [iVar, probMeasure(iVar)])
      return mutSet(table, VarKlass, sampleDistribution(distribution))
    }, new Map()
  )

  const dataTable = new Map<VarClass<V>, V>();

  let unsolvedEquations = clone(model.parametrization.equations);
  while (unsolvedEquations.size > 0) {
    const solvedEqs = new Set<VarClass<V>>();
    for (const [VarKlass, equation] of unsolvedEquations) {
      if (isSolvable(model.dag, dataTable, VarKlass)) {
        const disturbance = get(disturbedTable, VarKlass);
        mutSet(dataTable, VarKlass, equation(disturbance, dataTable))
        solvedEqs.add(VarKlass);
      }
    }
    if (solvedEqs.size > 0) {
      for (const VarKlass of solvedEqs) {
        unsolvedEquations.delete(VarKlass)
      }
    } else {
      throw new Error('Inconsistent causal model detected')
    }
  }
  return dataTable;
}

function isSolvable<K, V>(graph: Graph<K>, table: Map<K, V>, key: K): boolean {
  const Parents = getParents(graph, key);
  return all(Parents, (Parent) => table.has(Parent))
}