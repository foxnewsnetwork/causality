import { Variable } from "./variable";
import { map } from "../utils/iter";

/**
 * Probability tables are the core of any engineering
 * enterprise that needs equality and stuff
 */

// Number between 0 and 1
export type Probability = number;

export type Distribution<V = Variable> = Iterable<[V, Probability]>

/**
 * Samples a probability distribution
 * @param distribution
 */
export function sample<V = Variable>(distribution: Distribution<V>): V {
  let position = 0;
  const vRange = map(distribution, ([variable, prob]) => {
    return {
      variable,
      start: position,
      finish: position += prob
    };
  });
  const seed = Math.random();

  for(const { start, finish, variable } of vRange) {
    if (start <= seed && seed < finish) {
      return variable;
    }
  }
  throw new Error("Empty Distribution");
}