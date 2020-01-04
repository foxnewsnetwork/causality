import { Graph, getParents } from "./graph";
import { Variable } from '../probability/variable';
import { Measure, Equation, Probability } from '../probability/math';
import { mapValues, get, map } from "./map";
import { T2 } from "./types";

/**
 * This is defintion 2.2.2 on page 44 of the causality book
 */
export type CausalModel = {
  dag: Graph<typeof Variable>,
  parametrization: {
    equations: Map<typeof Variable, Equation>,
    disturbances: Map<typeof Variable, Measure>
  }
}

/**
 * Representation of the standard probability query.
 * Effectively read as:
 * 
 * P(events | conditions)
 */
// type Query = {
//   events: Set<Variable>,
//   conditions: Set<Variable>
// }

// export function query(model: CausalModel, query: Query): Probability {

// }

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
export function* runModel(model: CausalModel): Iterable<Map<typeof Variable, Variable>> {
  mapValues(model.parametrization.equations, ([VarClass, equation]) => {
    const Parents = getParents(model.dag, VarClass);
    const probabilityMeasure = get(model.parametrization.disturbances, VarClass)
    const domain = VarClass.domain()
    
  })
}