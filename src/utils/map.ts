import { T2, Fn1, Fn2 } from './types';

export function getWithDefault<K, V>(map: Map<K, V>, key: K, defValFn: () => V): V {
  const val = map.get(key)
  if (val != null) {
    return val
  } else {
    return defValFn()
  }
}

export function get<K, V>(map: Map<K, V>, key: K): V {
  if (map.has(key)) {
    const possibleResult = map.get(key) as V;
    return possibleResult
  } else {
    throw new Error('Map does not have expected key')
  }
}

export function clone<K, V>(map: Map<K, V>): Map<K, V> {
  return new Map(map)
}

/**
 * Immutable variant of `Map#set`
 * @param record 
 * @param key 
 * @param value 
 */
export function set<K, V>(record: Map<K, V>, key: K, value: V): Map<K, V> {
  return clone(record).set(key, value)
}

/**
 * Mutable variant of the set method, but returns the map
 * @param record 
 * @param key 
 * @param value 
 */
export function mutSet<K, V>(record: Map<K, V>, key: K, value: V): Map<K, V> {
  return record.set(key, value)
}

export function remove<K, V>(record: Map<K, V>, key: K): Map<K, V> {
  const out = clone(record)
  out.delete(key)
  return out
}

export function over<K, V>(record: Map<K, V>, key: K, mapFn: (v?: V) => V): Map<K, V> {
  return set(record, key, mapFn(record.get(key)))
}

export function mapValues<K, V, V2>(mapObj: Map<K, V>, mapFn: (x: T2<K, V>) => V2): Map<K, V2> {
  let output = new Map();
  for (const [key, val] of mapObj) {
    output.set(key, mapFn([key, val]))
  }
  return output;
}

export function reduce<K, Ts, Tf>(mapObj: Map<K, Ts>, rFn: Fn2<Tf, T2<K, Ts>, Tf>, init: Tf): Tf {
  for (const keyVal of mapObj) {
    init = rFn(init, keyVal)
  }
  return init
}

export function map<K1, V1, K2, V2>(mapObj: Map<K1, V1>, mFn: Fn1<T2<K1, V1>, T2<K2, V2>>): Map<K2, V2> {
  return reduce(
    mapObj,
    (outMap, oldVal) => {
      const [key2, val2] = mFn(oldVal)
      outMap.set(key2, val2)
      return outMap
    },
    new Map()
  )
}