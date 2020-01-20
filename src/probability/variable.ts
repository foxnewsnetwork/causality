export type VarClass<V = Variable> = {
  domain: (seed?: number) => Iterable<V>
  toString: () => string
}

export class Variable {
  static domain: (seed?: number) => Iterable<Variable>;

  static toString() {
    return this.name
  }
}

export class BinaryVariable extends Variable {
  static YES = new BinaryVariable();
  static NO = new BinaryVariable();

  static * domain() {
    yield this.YES;
    yield this.NO;
  }
}