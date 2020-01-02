import {
  CausalModel
} from './causal-model'
import { BinaryVariable } from './variable';
import { create, connect } from './graph';
import { reduce } from "./iter";

class Gene extends BinaryVariable {
  static Smoking = new Gene();
  static Healthy = new Gene();
  static * domain() {
    yield this.Smoking;
    yield this.Healthy;
  }
}

class Smoke extends BinaryVariable {
  static Yes = new Smoke();
  static No = new Smoke();
  static *domain() {
    yield this.Yes;
    yield this.No;
  }
}

class Cancer extends BinaryVariable {
  static Yes = new Cancer();
  static No = new Cancer();
  static *domain() {
    yield this.Yes;
    yield this.No;
  }
}

class Tar extends BinaryVariable {
  static Yes = new Tar();
  static No = new Tar();
  static *domain() {
    yield this.Yes;
    yield this.No;
  }
}

const Verticies = [
  [Gene, Cancer],
  [Gene, Smoke],
  [Smoke, Tar],
  [Tar, Cancer]
];

describe('utils/causal-model.ts', () => {
  const graph = reduce(
    Verticies, 
    (graph, [Parent, Child]) => connect(graph, Parent, Child), 
    create()
  );
  
  test('should be an ok graph', () => {
    expect(graph).toBeDefined()
  })
})