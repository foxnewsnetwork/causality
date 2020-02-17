import { LatentStructure } from "./structure";
import { isMember } from "../utils/set";
import { VarClass } from "../probability/variable";

/**
 * Given a graph, finds all the variables that must be
 * blocked such that we can d-separate x and y
 * 
 * In other words, we're looking for Z such that
 * x // y when given Z
 *
 * @param graph 
 * @param x 
 * @param y 
 */
export function* blockingSets<V>(struct: LatentStructure<V>, x: VarClass<V>, y: VarClass<V>): Iterable<Set<V>> {
  const isBlockCandidate = (z: VarClass<V>) => isMember(struct.observables, z);

  // TODO: somehow calculate this
}