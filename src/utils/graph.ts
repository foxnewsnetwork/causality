export type Graph<D> = {
  readonly data: D,
  children: () => Set<D>,
  parents: () => Set<D>
};

type RelationMap<D> = Map<D, Set<Graph<D>>>

export function create<D>(data: D): Graph<D> {
  const _map: RelationMap<D> = new Map()

  const graph = {
    data,
    children: () => _map.get(data),
    parents: () => select(filter(_map, contains(graph)), isKey)
  }
}