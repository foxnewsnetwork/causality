import { getWithDefault, over } from './map';
import { filter, map, concat } from './iter';

export type Graph<P> = Map<P, Set<P>>;

export function addChild<P>(g: Graph<P>, start: P, finish: P): Graph<P> {
  return over(g, start, (children = new Set()) => {
    if (!children.has(finish)) {
      children.add(finish)
    }
    return children;
  })
}

export function getNeighbors<P>(g: Graph<P>, me: P): Set<P> {
  const children = getChildren(g, me)
  const parents = getParents(g, me)

  return new Set(concat(parents, children))
}

export function getChildren<P>(g: Graph<P>, parent: P): Set<P> {
  return getWithDefault(g, parent, () => new Set());
}

export function getParents<P>(g: Graph<P>, child: P): Set<P> {
  const _parents = filter(g, ([_, children]) => children.has(child))
  const _parentNames = map(_parents, ([key]) => key)
  return new Set(_parentNames)
}

export function getNodes<P>(g: Graph<P>): Set<P> {
  return new Set(g.keys())
}