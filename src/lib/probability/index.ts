import { Variable, VarClass } from "./variable";
import { map } from "../utils/iter";

/**
 * Probability tables are the core of any engineering
 * enterprise that needs equality and stuff
 */
export { Variable };

export { inferProbability } from './query';

// Number between 0 and 1
export type Probability = number;

export type Distribution<V = Variable> = Iterable<[V, Probability]>

export type Dependencies<V> = Map<VarClass<V>, VarClass<V>>;
/**
 * The `measure` is a way to assign size to
 * members of a set
 * 
 * See wikipedia for more details
 * 
 * https://en.wikipedia.org/wiki/Measure_(mathematics)
 * 
 * We use this concept heavily in probability
 */
export type Measure<V = Variable> = (v: V) => Probability

export type Equation<V = Variable> = (disturbance: V, parents: Map<VarClass<V>, V>) => V;

/**
 * Samples a probability distribution
 * @param distribution
 */
export function sample<V = Variable>(distribution: Distribution<V>): V {
  let position = 0;
  const vRange = map(distribution, ([variable, prob]) => {
    const start = position;
    position += prob;
    return {
      variable,
      start,
      finish: position
    };
  });
  const seed = Math.random();

  for (const { start, finish, variable } of vRange) {
    if (start < seed && seed <= finish) {
      return variable;
    }
  }
  throw new Error("Empty Distribution");
}
