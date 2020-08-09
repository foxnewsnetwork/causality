import { Variable, VarClass } from "./variable";
import { all, filter, any, map } from "../utils/iter";
import { Probability } from ".";
import { union } from "../utils/set";

export type SeeEvent<V> = {
  VarClass: VarClass<V>,
  value: V
}

export type DoEvent<V> = SeeEvent<V> & {
  isDo: true
}

export function isDoEvent(event: DoEvent<any> | SeeEvent<any>): event is DoEvent<any> {
  return (event as DoEvent<any>).isDo;
}

export type Query<V = Variable> = {
  events: Iterable<SeeEvent<V>>,
  given: Iterable<SeeEvent<V> | DoEvent<V>>
}

export function isDoQuery(query: Query<any>): boolean {
  return any(query.given, isDoEvent)
}

export function inferProbability<V = Variable>(dataTable: Iterable<Map<VarClass<V>, V>>, query: Query<V>): Probability {
  const conditionedDataTable = filter(dataTable, entry => entryMatches(entry, query.given));
  let totalCount = 0;
  let trueCount = 0;
  for (const entry of conditionedDataTable) {
    totalCount++;
    if (entryMatches(entry, query.events)) {
      trueCount++;
    }
  }
  return trueCount / totalCount;
}

function entryMatches<V>(entry: Map<VarClass<V>, V>, jointEvents: Iterable<SeeEvent<V>>): boolean {
  return all(jointEvents, ({ VarClass, value }) => entry.has(VarClass) && entry.get(VarClass) === value);
}

export function getQueryDependencies<V = Variable>(query: Query<V>): Set<VarClass<V>> {
  const topDeps = map(query.events, ({ VarClass }) => VarClass)
  const botDeps = map(query.given, ({ VarClass }) => VarClass)

  return union(new Set(topDeps), new Set(botDeps))
}
