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
  const map = visitableGraph(g, ctrlVars);

  const effects = map.get(cause)
  if (effects != null) {
    return effects.has(effect)
  } else {
    throw new Error(`Node '${cause}' not in the graph`)
  }
}

export function visitableGraph<V>(g: Graph<V>, ctrlVars: Set<V>): GraphVisitableMap<V> {
  let hasSettled = true
  for (const me of g) {
    const receivedMsgs = messagesForNode(me)
    const nextMe = updateNode(me, receivedMsgs)
    if (hasChanged(nextMe, me)) {
      hasSettled = false
    }
    sendMessages(messagesToNeighbors(nextMe))
  }
}

enum Direction {
  Causal,
  Anticausal
}

type VisitRecord<V> = [Direction, V]
type GraphVisitableMap<V> = Map<V, Set<V>>