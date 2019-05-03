import { T2 } from "./types";

export type Dependencies = Record<string, Variable>;

export abstract class StochasticVariable {
  protected seed?: number

  static eq(vA: StochasticVariable, vB: StochasticVariable): boolean {
    return vA.constructor.name === vB.constructor.name &&
      vA.seed === vB.seed
  }

  constructor(seed?: number) {
    this.seed = seed
  }
}

export abstract class Variable extends StochasticVariable {
  protected inputs: Dependencies

  constructor(inputs: Dependencies) {
    super()
    this.inputs = inputs;
  }
}

export type Distribution = Iterable<T2<Variable, Probability>>

// Number between 0 and 1
export type Probability = number;