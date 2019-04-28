import { getWithDefault, over } from './map';
import { filter, map, concat, reduce, has, push, ZERO, isEmpty, lift0 } from './iter';
import { cache2 } from './func';
import { guid } from './misc';

export type Graph<P> = {
  id: string,
  parent2child: Map<P, Iterable<P>>
};

type BustCacheFn = <P>(g: Graph<P>, name: P) => void;

const cached = cache2(_getParents, _hashParents);
export const getParents: GetParents = cached.cachedFn;
const bustCache: BustCacheFn = cached.bustFn

export function create<P>(name: P): Graph<P> {
  const id = guid()
  const parent2child: Map<P, Iterable<P>> = over(new Map(), name, () => ZERO)

  return { id, parent2child }
}

export function addChild<P>(g: Graph<P>, start: P, finish: P): Graph<P> {
  const parent2child = over(g.parent2child, start, (children = ZERO) => {
    if (!has(children, finish)) {
      bustCache(g, finish)
      return push(children, finish)
    } else {
      return children;
    }
  })
  return {
    ...g,
    parent2child
  }
}

export function getNeighbors<P>(g: Graph<P>, me: P): Iterable<P> {
  const children = getChildren(g, me)
  const parents = getParents(g, me)

  return concat(parents, children)
}

export function getChildren<P>(g: Graph<P>, parent: P): Iterable<P> {
  return getWithDefault(g.parent2child, parent, () => ZERO);
}

export function getDescendants<P>(g: Graph<P>, parent: P): Iterable<P> {
  const children = getChildren(g, parent);
  if (isEmpty(children)) {
    return lift0(parent)
  } else {
    return reduce(
      children,
      (descs, child) => concat(descs, getDescendants(g, child)),
      lift0(parent)
    )
  }
}

function _getParents<P>(g: Graph<P>, child: P): Iterable<P> {
  const _parents = filter(g.parent2child, ([_, children]) => has(children, child))
  const _parentNames = map(_parents, ([key]) => key)
  return _parentNames
}

type GetParents = typeof _getParents

function _hashParents<P>(g: Graph<P>, child: P): string {
  return `${g.id}--${child}`
}

export function* getNodes<P>(g: Graph<P>): Iterable<P> {
  yield* g.parent2child.keys()
}

export function* asIterable<P>(g: Graph<P>): Iterable<[P, Iterable<P>]> {
  yield* g.parent2child
}