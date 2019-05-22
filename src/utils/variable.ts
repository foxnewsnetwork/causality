import { Showable } from './types'

export type Variable<Value> = Showable & {
  name: string,
  domain: Set<Value>
}
export type Dependencies<Value> = Map<Variable<Value>["name"], Value>;