import { getWithDefault, over } from './map';
import { guid } from './misc';
import { filter as iFilter, map as iMap } from './iter';
import { empty, isMember, add, union, isEmpty, lift0, flatMap } from './set';
import { cache2, CachedOutput2 } from './func';
import { Showable } from './types';

export type Graph<P extends Showable> = {
  id: string,
  parent2children: Map<P, Set<P>>
};

function _getParents<Sh>(g: Graph<Sh>, child: Sh): Set<Sh> {
  const _parents = iFilter(asIterator(g), ([_, children]) => isMember(children, child))
  const _parentNames = iMap(_parents, ([key]) => key)
  return new Set(_parentNames)
}
type GetParents = typeof _getParents
function _hashParents(g: Graph<Showable>, child: Showable): string {
  return `${g.id}--${child.toString()}`
}
type _P0 = Parameters<GetParents>[0]
type _P1 = Parameters<GetParents>[1]
type _R0 = ReturnType<GetParents>
const cached: CachedOutput2<_P0, _P1, _R0> = cache2(_getParents, _hashParents);
export const getParents = cached.cachedFn as GetParents;
const bustCache = cached.bustFn

export function create<P extends Showable>(): Graph<P> {
  const id = guid()
  const parent2children: Map<P, Set<P>> = new Map()

  const me = {
    id,
    parent2children
  }
  return me;
}

export function connect<Sh>(g: Graph<Sh>, parent: Sh, child: Sh): Graph<Sh> {
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

export function getNeighbors<Sh>(g: Graph<Sh>, me: Sh): Set<Sh> {
  const children = getChildren(g, me)
  const parents = getParents(g, me)

  return union(parents, children)
}

export function getChildren<Sh>(g: Graph<Sh>, parent: Sh): Set<Sh> {
  return getWithDefault(g.parent2children, parent, empty);
}

export function getDescendants<Sh>(g: Graph<Sh>, parent: Sh): Set<Sh> {
  const children = getChildren(g, parent);
  if (isEmpty(children)) {
    return lift0(parent)
  } else {
    return flatMap(children, child => getDescendants(g, child))
  }
}

export function getNodes<Sh>(g: Graph<Sh>): Set<Sh> {
  return new Set(iMap(asIterator(g), ([p]) => p))
}

export function* asIterator<Sh>(g: Graph<Sh>): Iterable<[Sh, Set<Sh>]> {
  yield* g.parent2children
}

export function* asIterator2<Sh>(g: Graph<Sh>): Iterable<[Set<Sh>, Sh, Set<Sh>]> {
  for (const [self, children] of asIterator(g)) {
    yield [getParents(g, self), self, children]
  }
}