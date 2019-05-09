export type Variable<Enum> = {
  name: string,
  domain: Enum
}
export type Dependencies<Enum> = Record<Variable<Enum>["name"], Variable<Enum>["domain"]>;

export type Distribution<Enum> = Iterable<ProbabilityTableEntry<Enum>>

export type ProbabilityTableEntry<Enum> = {
  event: Enum,
  probability: Probability
}

// Number between 0 and 1
export type Probability = number;

export type ProbabilityTable<Enum, V extends Variable<Enum>> = Record<V["name"], Distribution<Enum>>