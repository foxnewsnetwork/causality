import { Dependencies, Distribution, ProbabilityTableEntry } from './probability'

export type StochasticEquation<Enum> = () => Distribution<Enum>

export type StructuralEquation<Enum> = (parents: Dependencies<any>) => Enum

export type Equation<Enum> = StochasticEquation<Enum> | StructuralEquation<Enum>

export type Parameterization<Enum> = Map<Enum, Equation<Enum>>

type Enum = Record<string, number>

export function randomLinear<E extends Enum>(Enum: E, parents?: Iterable<Enum>): Equation<E[keyof E]> {
  if (parents != null) {
    return randomStochastic(Enum)
  } else {
    return randomLinearStructural(Enum, parents)
  }
}

// Running into problems with enum types not being open to meta typing
// might need to use a Map type of some sort

export function* randomStochastic<E extends Enum>(Enum: E): StochasticEquation<E[keyof E]> {
  for (const key of Object.getOwnPropertyNames(Enum)) {
    const tableEntry = {
      event: Enum[key],
      probability: Math.random()
    }
    yield tableEntry
  }
}