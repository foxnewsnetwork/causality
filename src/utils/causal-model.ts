import { Fn0 } from "./types";

export type Probability<V> = Fn0<V>

export type Equation<V> = (params: { [key: string]: any }) => V

export type CausalModel = {
  [key: string]: Equation<any> | Probability<any>
}