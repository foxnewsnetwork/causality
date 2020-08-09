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

const equations = new Map<typeof Variable, Equation>([
  [Gene, (d: Gene) => d],
  [Smoke, (d: Smoke, parents) => parents.get(Gene) === Gene.SMOKING ? Smoke.IS_SMOKER : d],
  [Tar, (d: Tar, parents) => parents.get(Smoke) === Smoke.IS_SMOKER ? Tar.DIRTY : d],
  [Cancer, (d: Cancer, parents) => {
    if (!parents.has(Tar)) {
      throw new Error('missing tar')
    }
    if (!parents.has(Gene)) {
      throw new Error('missing gene')
    }
    const tar = parents.get(Tar);
    const gene = parents.get(Gene);
    if (tar === Tar.DIRTY && gene === Gene.SMOKING) {
      return Cancer.METASTATIC
    }
    if (tar === Tar.CLEAN && gene === Gene.SMOKING) {
      throw new Error('all smokers should have tar')
    }
    if (tar === Tar.DIRTY && gene === Gene.HEALTHY) {
      return d
    }
    if (tar === Tar.CLEAN && gene === Gene.HEALTHY) {
      return Cancer.NONE
    }
    throw new Error('should never get here')
  }]
])

const condProps = {
  gene: () => 0.5,
  smoke: (g: Gene) => g === Gene.SMOKING ? 1 : 0.1,
  notSmoke: (g: Gene) => g === Gene.SMOKING ? 0 : 0.9,
  tar: (s: Smoke) => s === Smoke.IS_SMOKER ? 1 : 0.2,
  notTar: (s: Smoke) => s === Smoke.IS_SMOKER ? 0 : 0.8,
  cancer: (t: Tar, g: Gene) => {
    if (g === Gene.SMOKING) {
      if (t === Tar.DIRTY) {
        return 1
      } else {
        return 0
      }
    } else if (t === Tar.DIRTY) {
      return 0.05
    } else {
      return 0
    }
  },
  notCancer: (t: Tar, g: Gene) => {
    if (g === Gene.SMOKING) {
      return 0;
    }
    if (t === Tar.DIRTY) {
      return 0.95;
    }
    return 1
  }
}

const ConditionalProbability = {
  gene: (g: Gene) => 0.5,
  smoke: (s: Smoke, g: Gene) => {
    if (s === Smoke.IS_SMOKER) {
      return condProps.smoke(g)
    } else {
      return condProps.notSmoke(g)
    }
  },
  tar: (t: Tar, s: Smoke) => {
    return t === Tar.DIRTY ? condProps.tar(s) : condProps.notTar(s)
  },
  cancer: (c: Cancer, t: Tar, g: Gene) => {
    return c === Cancer.METASTATIC ? condProps.cancer(t, g) : condProps.notCancer(t, g)
  }
}

const disturbances = new Map<typeof Variable, Measure>([
  [Gene, () => 0.5],
  [Smoke, (smoke: Smoke) => smoke === Smoke.IS_SMOKER ? 0.1 : 0.9],
  [Tar, (tar: Tar) => tar === Tar.CLEAN ? 0.8 : 0.2],
  [Cancer, (cancer: Cancer) => cancer === Cancer.METASTATIC ? 0.05 : 0.95]
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
  describe('when smoking gene confounds smoking and cancer, mediated by tar', () => {
    const SAMPLE_SIZE = 50000;
    const dataStream = runModel(model);
    let smokeGene = 0;
    let tarButNoGene = 0;
    let geneButNoTar = 0;
    let noTarAndNoGene = 0;
    let tarAndGene = 0;
    let cleanTar = 0;
    let dirtyTar = 0;
    let tarAndSmoke = 0;
    let tarButNoSmoke = 0;
    let yesSmoker = 0;
    let noSmoker = 0;
    let smokeButNoGene = 0;
    let yesCancer = 0;
    let cancerAndTarAndGene = 0;
    let cancerAndTarButNoGene = 0;
    let cancerAndGene = 0;
    let cancerButNoGene = 0;
    let noCancer = 0;
    for (const data of take(dataStream, SAMPLE_SIZE)) {
      if (Gene.SMOKING === get(data, Gene)) {
        smokeGene++
        if (Tar.CLEAN === get(data, Tar)) {
          geneButNoTar++
        } else {
          tarAndGene++
        }
      }
      if (Tar.CLEAN === get(data, Tar)) {
        cleanTar++
        if (Gene.HEALTHY === get(data, Gene)) {
          noTarAndNoGene++
        }
      } else {
        dirtyTar++
        if (Gene.HEALTHY === get(data, Gene)) {
          tarButNoGene++
        }
        if (get(data, Smoke) === Smoke.IS_SMOKER) {
          tarAndSmoke++
        } else {
          tarButNoSmoke++
        }
      }
      const cancer = get(data, Cancer)
      if (Cancer.METASTATIC === cancer) {
        yesCancer++
        if (Gene.SMOKING === get(data, Gene)) {
          cancerAndGene++
          cancerAndTarAndGene++
        } else {
          cancerButNoGene++
          if (Tar.DIRTY === get(data, Tar)) {
            cancerAndTarButNoGene++
          }
        }
      } else if (cancer === Cancer.NONE) {
        noCancer++
      } else {
        throw new Error('Bad Cancer value')
      }
      if (Smoke.IS_SMOKER === get(data, Smoke)) {
        yesSmoker++
        if (get(data, Gene) === Gene.HEALTHY) {
          smokeButNoGene++
        }
      } else {
        noSmoker++
      }
    }
    test('the probability of cancer without the cancer gene', () => {
      const probCTWithoutG = cancerAndTarButNoGene / SAMPLE_SIZE;
      const probTarNoGene = tarButNoGene / SAMPLE_SIZE;
      const actualJointProb = condProps.cancer(Tar.DIRTY, Gene.HEALTHY) * probTarNoGene;
      console.warn('====== cancer w/out gene', actualJointProb);
      expect(actualJointProb).toBeCloseTo(probCTWithoutG)
    })
    test('the predicted cancer rates should match simulated results', () => {
      const probCTG = cancerAndTarAndGene / SAMPLE_SIZE;
      const probTarAndGene = tarAndGene / SAMPLE_SIZE;
      const actualJointProb = condProps.cancer(Tar.DIRTY, Gene.SMOKING) * probTarAndGene;
      console.warn('====== cancer w/ gene', actualJointProb);
      expect(actualJointProb).toBeCloseTo(probCTG)
    })
    test('there should be more people with cancer than those with cancer gene', () => {
      expect(yesCancer).toBeGreaterThan(smokeGene)
    })
    test('there should be at least 1 guy who got cancer despite not having the cancer gene', () => {
      expect(cancerButNoGene).toBeGreaterThan(0)
    })
    test('the count of people with vices should increase', () => {
      expect(yesSmoker).toBeGreaterThan(smokeGene)
      expect(dirtyTar).toBeGreaterThan(yesSmoker)
      expect(tarAndSmoke).toBeGreaterThan(tarAndGene)
    })
    test('all smokers should have tar in their lungs', () => {
      expect(yesSmoker).toEqual(tarAndSmoke)
    })
    test('the probabilty of smoking and tar should match the condition probability', () => {
      const probSmoke = yesSmoker / SAMPLE_SIZE
      expect(condProps.tar(Smoke.IS_SMOKER) * probSmoke).toBeCloseTo(tarAndSmoke / SAMPLE_SIZE)
      const probNoSMoke = noSmoker / SAMPLE_SIZE
      expect(condProps.tar(Smoke.NOT_SMOKER) * probNoSMoke).toBeCloseTo(tarButNoSmoke / SAMPLE_SIZE)
    })
    test('slightly more than half the population should be smokers', () => {
      expect(yesSmoker / SAMPLE_SIZE).toBeGreaterThan(0.5)
    })
    test('~ 0.05% of the population should smoke despite not having a smoking gene', () => {
      expect(smokeButNoGene / SAMPLE_SIZE).toBeCloseTo(0.05)
    })
    test('every person with smoke gene should have dirty lung', () => {
      expect(tarAndGene).toEqual(smokeGene)
    })
    test('should be lots of people who dont have tar or the gene', () => {
      expect(noTarAndNoGene).toBeGreaterThan(0);
    })
    test('should be no one who smokes but doesnt hae tar', () => {
      expect(geneButNoTar).toEqual(0)
    })
    test('there should be at least 1 guy who has tar but doesnt have smoke gene', () => {
      console.warn('==== tarButNoGene%', tarButNoGene / SAMPLE_SIZE)
      expect(tarButNoGene).toBeGreaterThan(0)
    })
    test('the ratio of smoking to non-smoking gene should be ~1:1', () => {
      expect(smokeGene / SAMPLE_SIZE).toBeCloseTo(0.5)
    })
    let probSmoke = 0.0;
    for (const g of Gene.domain()) {
      probSmoke += condProps.smoke(g) * condProps.gene();
    }
    test("~55% of the total population should be smokers", () => {
      const actualProbSmoke = yesSmoker / SAMPLE_SIZE;
      console.warn('==== smoke', probSmoke, ' versus ', actualProbSmoke)
      expect(probSmoke).toBeCloseTo(probSmoke)
      expect(actualProbSmoke).toBeCloseTo(0.55, 1);
    });
    let probTar = 0.0;
    for (const g of Gene.domain()) {
      for (const s of Smoke.domain()) {
        probTar += ConditionalProbability.tar(Tar.DIRTY, s) *
          ConditionalProbability.smoke(s, g) *
          ConditionalProbability.gene(g)
      }
    }
    test('~64% of the total population should have tar', () => {
      const actualProbTar = dirtyTar / SAMPLE_SIZE;
      console.warn('==== tar', probTar, ' versus ', actualProbTar)
      expect(probTar).toBeCloseTo(actualProbTar, 1)
      expect(actualProbTar).toBeCloseTo(0.64, 1);
      expect(cleanTar / SAMPLE_SIZE).toBeCloseTo(0.36, 1);
    })

    let probCancer = 0.0;
    for (const g of [Gene.SMOKING, Gene.HEALTHY]) {
      for (const t of [Tar.CLEAN, Tar.DIRTY]) {
        for (const s of [Smoke.IS_SMOKER, Smoke.NOT_SMOKER]) {
          probCancer += ConditionalProbability.cancer(Cancer.METASTATIC, t, g) *
            ConditionalProbability.tar(t, s) *
            ConditionalProbability.smoke(s, g) *
            ConditionalProbability.gene(g)
        }
      }
    }
    test(`~${Math.round(probCancer * 100)}% chance of cancer`, () => {
      const actualCancerProb = yesCancer / SAMPLE_SIZE;
      console.warn('==== cancer', probCancer, ' versus ', actualCancerProb)
      expect(actualCancerProb).toBeCloseTo(probCancer, 1);
    });

  })
})