import { Graph } from "./graph";
import { Variable } from './variable';
import { Measure, Equation } from './math';

/**
 * This is defintion 2.2.2 on page 44 of the causality book
 */
export type CausalModel = {
  dag: Graph<typeof Variable>,
  parametrization: {
    equations: Map<typeof Variable, Equation<Variable>>,
    disturbances: Map<typeof Variable, Measure<Variable>>
  }
}