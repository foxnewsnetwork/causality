import {
  Graph,
  getNodes,
  getNeighbors,
  getParents
} from './graph';
import {
  over, getWithDefault
} from './map';
import {
  create, MailServer, getMail, spamMail, spamBulkMail
} from './mail-server';

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

type Postcard<V> = {
  direction: Direction,
  landmark: V
}

export function visitableGraph<V>(g: Graph<V>, quaratine: Set<V>): GraphVisitableMap<V> {
  let server: MailServer<V, Postcard<V>> = create()
  let visitableMap: GraphVisitableMap<V> = new Map()

  let notSettled = true;
  while (notSettled) {
    notSettled = false;
    for (const [me, children] of g) {
      const parents = getParents(g, me)
      const receivedMail = getMail(server, me)
      const visitedLandmarks = getWithDefault(visitableMap, me, () => new Set())

      for (const postcard of receivedMail) {
        if (visitedLandmarks.has(postcard.landmark)) {
          continue;
        } else {
          notSettled = true
          visitableMap = over(
            visitableMap,
            me,
            (landmarks = new Set()) => landmarks.add(postcard.landmark)
          )
        }
      }

      // Spam children about me unless I'm under quarantine
      if (!quaratine.has(me)) {
        server = spamMail(server, children, {
          direction: Direction.Causal,
          landmark: me
        })
      }
      // Spam parents about me unless I'm under quarantine
      if (!quaratine.has(me)) {
        server = spamMail(server, parents, {
          direction: Direction.Anticausal,
          landmark: me
        })
      }
      // Forward my parents mail to children unless I'm under quarantine
      if (!quaratine.has(me)) {
        server = spamBulkMail(server, children, parentsMail)
      }
      // Forward my children's mail to parents
      // Forward my children's mail to my other children
      // Forward my parents' mail to my other parents if I'm under quarantine
      // Forward my parents' mail to my other parents if any of my children are under quarantine
    }
  }

  return visitableMap
}

enum Direction {
  Causal,
  Anticausal
}

type VisitRecord<V> = [Direction, V]
type GraphVisitableMap<V> = Map<V, Set<V>>