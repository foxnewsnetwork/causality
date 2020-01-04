import {
  CausalModel
} from './causal-model'
import { BinaryVariable, Variable } from '../probability/variable';
import { create, connect } from './graph';
import { reduce } from "./iter";
import { Equation, Probability, Measure } from '../probability/math';

class Gene extends BinaryVariable {
  static SMOKING = new Gene();
  static HEALTHY = new Gene();
  static * domain() {
    yield this.SMOKING;
    yield this.HEALTHY;
  }
}

class Smoke extends BinaryVariable {
  static IS_SMOKER = new Smoke();
  static NOT_SMOKER = new Smoke();
  static *domain() {
    yield this.IS_SMOKER;
    yield this.NOT_SMOKER;
  }
}

class Cancer extends BinaryVariable {
  static METASTATIC = new Cancer();
  static NONE = new Cancer();
  static *domain() {
    yield this.METASTATIC;
    yield this.NONE;
  }
}

class Tar extends BinaryVariable {
  static DIRTY = new Tar();
  static CLEAN = new Tar();
  static *domain() {
    yield this.DIRTY;
    yield this.CLEAN;
  }
}

const Verticies = [
  [Gene, Cancer],
  [Gene, Smoke],
  [Smoke, Tar],
  [Tar, Cancer]
];

const graph = reduce(
  Verticies, 
  (graph, [Parent, Child]) => connect(graph, Parent, Child), 
  create<typeof Variable>()
);

const smokesGivenSmokingGene = (d: Probability) => d > 0.05 ? Smoke.IS_SMOKER : Smoke.NOT_SMOKER;
const smokesGivenHealthyGene = (d: Probability) => d > 0.90 ? Smoke.IS_SMOKER : Smoke.NOT_SMOKER;
const tarGivenSmoker = (d: Probability) => d > 0.1 ? Tar.DIRTY : Tar.CLEAN;
const tarGivenNonSmoker = (d: Probability) => d > 0.85 ? Tar.DIRTY : Tar.CLEAN;

const equations = new Map<typeof Variable, Equation>([
  [Gene, (d) => d > 0.5 ? Gene.SMOKING : Gene.HEALTHY],
  [Smoke, (d, parents) => parents.get(Gene) === Gene.SMOKING ? smokesGivenSmokingGene(d) : smokesGivenHealthyGene(d)],
  [Tar, (d, parents) => parents.get(Smoke) === Smoke.IS_SMOKER ? tarGivenSmoker(d) : tarGivenNonSmoker(d)],
  [Cancer, (d, parents) => {
    if (parents.get(Tar) === Tar.DIRTY) {
      if (parents.get(Gene) === Gene.SMOKING) {
        return d > 0.05 ? Cancer.METASTATIC : Cancer.NONE;
      } else {
        return d > 0.75 ? Cancer.METASTATIC : Cancer.NONE;
      }
    } else {
      if (parents.get(Gene) === Gene.SMOKING) {
        return d > 0.01 ? Cancer.METASTATIC : Cancer.NONE;
      } else {
        return d > 0.95 ? Cancer.METASTATIC : Cancer.NONE;
      }
    }
  }]
])

const disturbances = new Map<typeof Variable, Measure>([
  [Gene, () => 0.5],
  [Smoke, () => 0.5],
  [Tar, () => 0.2],
  [Cancer, () => 0.4]
])

const model: CausalModel = {
  dag: graph,
  parametrization: {
    equations,
    disturbances
  }
}
describe('utils/causal-model.ts', () => {
  test('should be an ok graph', () => {
    expect(graph).toBeDefined()
  })
})