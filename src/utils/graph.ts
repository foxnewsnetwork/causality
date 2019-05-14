import { getWithDefault, over } from './map';
import { guid } from './misc';
import { filter as iFilter, map as iMap } from './iter';
import { empty, isMember, add, union, isEmpty, lift0, map, flatMap } from './set';
import { cache2 } from './func';

export type Graph<P> = {
  id: string,
  parent2children: Map<P, Set<P>>
};

type BustCacheFn = <P>(g: Graph<P>, name: P) => void;

type GetParents = typeof _getParents
function _hashParents<P>(g: Graph<P>, child: P): string {
  return `${g.id}--${child}`
}
const cached = cache2(_getParents, _hashParents);
export const getParents: GetParents = cached.cachedFn;
const bustCache: BustCacheFn = cached.bustFn

export function create<P>(): Graph<P> {
  const id = guid()
  const parent2children: Map<P, Set<P>> = new Map()

  const me = {
    id,
    parent2children
  }
  return me;
}

export function connect<P>(g: Graph<P>, parent: P, child: P): Graph<P> {
  const _parent2children = over(g.parent2children, parent, (children = empty()) => {
    if (!isMember(children, child)) {
      bustCache(g, parent)
      return add(children, child)
    } else {
      return children
    }
  })
  bustCache(g, child)
  const parent2children = over(_parent2children, child, (grandchildren = empty()) => grandchildren)
  return {
    ...g,
    parent2children
  }
}

export function getNeighbors<P>(g: Graph<P>, me: P): Set<P> {
  const children = getChildren(g, me)
  const parents = getParents(g, me)

  return union(parents, children)
}

export function getChildren<P>(g: Graph<P>, parent: P): Set<P> {
  return getWithDefault(g.parent2children, parent, empty);
}

export function getDescendants<P>(g: Graph<P>, parent: P): Set<P> {
  const children = getChildren(g, parent);
  if (isEmpty(children)) {
    return lift0(parent)
  } else {
    return flatMap(children, child => getDescendants(g, child))
  }
}

function _getParents<P>(g: Graph<P>, child: P): Set<P> {
  const _parents = iFilter(asIterator(g), ([_, children]) => isMember(children, child))
  const _parentNames = iMap(_parents, ([key]) => key)
  return new Set(_parentNames)
}

export function getNodes<P>(g: Graph<P>): Set<P> {
  return new Set(iMap(asIterator(g), ([p]) => p))
}

export function* asIterator<P>(g: Graph<P>): Iterable<[P, Set<P>]> {
  yield* g.parent2children
}

export function* asIterator2<P>(g: Graph<P>): Iterable<[Set<P>, P, Set<P>]> {
  for (const [self, children] of asIterator(g)) {
    yield [getParents(g, self), self, children]
  }
}