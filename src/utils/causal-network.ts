import {
  Graph,
  getNodes,
  getNeighbors
} from './graph';
import {
  over
} from './map';

/**
 * Is there a path between two points on a graph given a set of
 * control variables?
 * 
 * There are (at least) two ways of implementing this function,
 *
 * one I can do a best-first-search
 * two I can do some custom message passing thing
 * 
 * We'll probably implement both one day, but for today, this is
 * a message-passing implementation
 * 
 * 1. Associate with each node a `visitable: Set<V>`
 * 2. Each node msgs its neighbors a filtered version of its current 
 * `visitable` based upon d-separation rules
 * 3. Each node unions all the incoming `visitable` messages
 * 4. Stop iteration when no node's `visitable` set changes
 * 5. Check if the `effect` node's `visitable` set contains `cause`
 * 
 * @param g - Graph<V> : `V` needs to be a unique variable name
 * @param ctrlVars 
 * @param cause 
 * @param effect 
 */
export function dSeparated<V>(g: Graph<V>, ctrlVars: Set<V>, cause: V, effect: V): boolean {
  const visitableMap: Map<V, Set<VisitRecord<V>>> = new Map()
  let changeFlag = true;
  
  while(changeFlag) {
    for(const me of getNodes(g)) {
      const myVisitables = visitableMap.get(me)

      for (const neighbor of getNeighbors(g, me)) {
        
      }
    }
  }
}

enum Direction {
  Causal,
  Anticausal
}

type VisitRecord<V> = [Direction, V]