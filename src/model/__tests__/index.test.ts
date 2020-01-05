import {
  CausalModel,
  sample,
  runModel
} from '..'
import { create, connect } from '../../utils/graph';
import { reduce, take } from "../../utils/iter";
import { Equation, Measure, Variable } from '../../probability';
import { get } from '../../utils/map';

class Gene extends Variable {
  static SMOKING = new Gene();
  static HEALTHY = new Gene();
  static * domain() {
    yield this.SMOKING;
    yield this.HEALTHY;
  }
}

class Smoke extends Variable {
  static IS_SMOKER = new Smoke();
  static NOT_SMOKER = new Smoke();
  static *domain() {
    yield this.IS_SMOKER;
    yield this.NOT_SMOKER;
  }
}

class Cancer extends Variable {
  static METASTATIC = new Cancer();
  static NONE = new Cancer();
  static *domain() {
    yield this.METASTATIC;
    yield this.NONE;
  }
}

class Tar extends Variable {
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

const smokesGivenSmokingGene = (d: Smoke) => Smoke.IS_SMOKER;
const smokesGivenHealthyGene = (d: Smoke) => d;
const tarGivenSmoker = (d: Tar) => Tar.DIRTY;
const tarGivenNonSmoker = (d: Tar) => d;

const equations = new Map<typeof Variable, Equation>([
  [Gene, (luckGene: Gene) => luckGene],
  [Smoke, (d: Smoke, parents) => parents.get(Gene) === Gene.SMOKING ? smokesGivenSmokingGene(d) : smokesGivenHealthyGene(d)],
  [Tar, (d: Tar, parents) => parents.get(Smoke) === Smoke.IS_SMOKER ? tarGivenSmoker(d) : tarGivenNonSmoker(d)],
  [Cancer, (d: Cancer, parents) => {
    if (parents.get(Tar) === Tar.DIRTY) {
      if (parents.get(Gene) === Gene.SMOKING) {
        return Cancer.METASTATIC;
      } else {
        return d;
      }
    } else {
      if (parents.get(Gene) === Gene.SMOKING) {
        return d;
      } else {
        return Cancer.NONE;
      }
    }
  }]
])

const disturbances = new Map<typeof Variable, Measure>([
  [Gene, () => 0.5],
  [Smoke, (smoke: Smoke) => smoke === Smoke.IS_SMOKER ? 0.1 : 0.9],
  [Tar, (tar: Tar) => tar === Tar.CLEAN ? 0.8 : 0.2],
  [Cancer, (cancer: Cancer) => cancer === Cancer.METASTATIC ? 0.01 : 0.99]
])

const model: CausalModel = {
  dag: graph,
  parametrization: {
    equations,
    disturbances
  }
}
describe('model/index.ts', () => {
  test('should be an ok graph', () => {
    expect(graph).toBeDefined()
  })
  describe('function sample', () => {
    const row = sample(model);

    describe('should be a map of size 4', () => {
      expect(row.size).toEqual(4)
    })
  })

  describe('function runModel', () => {
    const SAMPLE_SIZE = 500;
    const dataStream = runModel(model);
    let smokeGene = 0;
    let goodGene = 0;
    for (const data of take(dataStream, SAMPLE_SIZE)) {
      if (Gene.SMOKING === get(data, Gene)) {
        smokeGene += 1
      } else {
        goodGene += 1
      }
    }
    test('the ratio of smoking to non-smoking gene should match', () => {
      expect(smokeGene / goodGene).toBeCloseTo(1, 1)
    })
  })
})