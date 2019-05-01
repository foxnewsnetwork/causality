import { Graph } from "./graph";

export type CausalModel<V> = {
  observables: Set<V>,
  hiddenVars: Set<V>,
  skeleton: Graph<V>,
  equations: Map<V, StructuralEquation<V>>
}