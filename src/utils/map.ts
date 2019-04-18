import { T2 } from './types';

export function getWithDefault<K, V>(map: Map<K, V>, key: K, defValFn: () => V): V {
  const val = map.get(key)
  if (val != null) {
    return val
  } else {
    return defValFn()
  }
}

export function over<K, V>(map: Map<K, V>, key: K, mapFn: (v?: V) => V): Map<K, V> {
  let nextVal;
  if (map.has(key)) {
    nextVal = mapFn(map.get(key))
  } else {
    nextVal = mapFn()
  }
  map.set(key, nextVal)
  return map;
}

export function mapValues<K, V, V2>(mapObj: Map<K, V>, mapFn: (x: T2<K, V>) => V2): Map<K, V2> {
  let output = new Map();
  for (const [key, val] of mapObj) {
    output.set(key, mapFn([key, val]))
  }
  return output;
}