export type Distribution<V> = Iterable<ProbabilityTableEntry<V>>

export type ProbabilityTableEntry<Value> = {
  event: Value,
  probability: Probability
}

// Number between 0 and 1
export type Probability = number;

export type ProbabilityTable<Value> = Map<Value, ProbabilityTableEntry<Value>>