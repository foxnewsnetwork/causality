import { Distribution } from './probability'
import { Dependencies, Variable } from './variable'
import { map, reduce, enumerate, isEmpty } from './set';
import { reduce as mReduce, getWithDefault } from './map';
import { random } from './integer';

export type StochasticEquation<V> = Distribution<V>

export type StructuralEquation<V> = (parents: Dependencies<any>) => V

export type Equation<V> = StochasticEquation<V> | StructuralEquation<V>

export type Parameterization<Value> = Map<Variable<Value>, Equation<Value>>

export function randomLinear<V, Var extends Variable<V>>(
  variable: Var, 
  parents?: Set<Variable<any>>
): Equation<V> {
  if (parents == null || isEmpty(parents)) {
    return randomStochastic(variable)
  } else {
    return randomLinearStructural(variable, parents)
  }
}

// Running into problems with enum types not being open to meta typing
// might need to use a Map type of some sort

export function* randomStochastic<V>(variable: Variable<V>): StochasticEquation<V> {
  const _x = map(variable.domain, event => ({ event, odds: Math.random() }))
  const _odds = map(_x, ({ odds }) => odds )
  const total = reduce(_odds, (a, b) => a + b, 0)
  yield* map(_x, ({ event, odds }) => ({
    event,
    probability: odds / total
  }))
}

export function randomLinearStructural<V>(variable: Variable<V>, parents: Set<Variable<any>>): StructuralEquation<V> {
  const valueMap = new Map(map(parents, v => [v.name, {
    domainMap: enumerate(v.domain),
    weight: random()
  }]))

  const myDomain = [...variable.domain]

  return deps => {

    const unwrappedIndex = mReduce(
      deps, 
      (indexAcc, [name, valueKey]) => {
        const valMap = getWithDefault(valueMap, name, () => ({ domainMap: new Map(), weight: 0 }))
        const value = getWithDefault(valMap.domainMap, valueKey, () => 0)
        return indexAcc + value * valMap.weight
      },
      0
    )

    return myDomain[unwrappedIndex % myDomain.length]
  }
}