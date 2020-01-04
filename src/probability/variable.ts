export class Variable {
  static domain: (seed?: number) => Iterable<Variable>;

  static toString() {
    return this.name
  }
}

export type Dependencies = Map<typeof Variable, typeof Variable>;

export class BinaryVariable extends Variable {
  static YES = new BinaryVariable();
  static NO = new BinaryVariable();

  static * domain() {
    yield this.YES;
    yield this.NO;
  }
}

// export class IntVariable extends Variable {
//   static * domain(seed?: number) {
//     let nextSeed = seed ?? Math.round(100 * Math.random()) - 50;
//     while (true) {
//       yield new IntVariable(nextSeed);
//       nextSeed += 1;
//     }
//   }

//   value: number;

//   constructor(value: number) {
//     super();
//     this.value = value;
//   }
// }