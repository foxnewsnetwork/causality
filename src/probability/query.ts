import { Variable } from "./variable";
import { all, filter } from "../utils/iter";

export type Query<VC = typeof Variable, V = Variable> = {
  events: Array<{
    VarClass: VC,
    value: V
  }>,
  given: Array<{
    VarClass: VC,
    value: V
  }>
}

export function inferProbability<VC = typeof Variable, V = Variable>(dataTable: Iterable<Map<VC, V>>, query: Query<VC, V>): Probability {
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

function entryMatches<VC, V>(entry: Map<VC, V>, jointEvents: Array<{ VarClass: VC, value: V }>): boolean {
  return all(jointEvents, ({ VarClass, value }) => entry.has(VarClass) && entry.get(VarClass) === value);
}