import { inferProbability } from '../query';
import { sample } from '..'
import { take } from '../../utils/iter';

type FatGene = boolean;
const FatGeneClass = {
  *domain() {
    yield* [true, false]
  }
}
type Overeats = boolean;
const OvereatsClass = {
  *domain() {
    yield* [true, false]
  }
}
type IsFat = boolean;
const IsFatClass = {
  *domain() {
    yield* [true, false]
  }
}

/**
 * Consider the hypothetical food fat model:
 * 
 * fatGene -> isFat
 * fatGene -> overeats
 * overeats -> isFat
 */

const rollFatGene = () => sample([
  [true, 0.25],
  [false, 0.75]
]);

const rollOvereats = (fatGene: FatGene) => fatGene ?
  sample([
    [true, 0.85],
    [false, 0.15]
  ]) :
  sample([
    [true, 0.1],
    [false, 0.9]
  ])

const rollIsFat = (fatGene: FatGene, overeats: Overeats) => {
  let chances;
  if (fatGene && overeats) {
    chances = [
      [true, 0.99],
      [false, 0.01]
    ]
  }
  if (fatGene && !overeats) {
    chances = [
      [true, 0.50],
      [false, 0.50]
    ]
  }
  if (!fatGene && overeats) {
    chances = [
      [true, 0.25],
      [false, 0.75]
    ]
  }
  chances = [
    [true, 0.05],
    [false, 0.95]
  ]
  return sample(chances);
}
function* system() {
  while (true) {
    const fatGene = rollFatGene();
    const overeats = rollOvereats(fatGene);
    const isFat = rollIsFat(fatGene, overeats);

    const entry = new Map([
      [FatGeneClass, fatGene],
      [OvereatsClass, overeats],
      [IsFatClass, isFat]
    ])
    yield entry
  }
}

describe("probability/query.ts", () => {
  const SAMPLE_SIZE = 5000;
  describe("function inferProbability", () => {
    describe("probability of over-eating given fat-gene", () => {
      const dataTable = take(system(), SAMPLE_SIZE)
      const query = {
        events: [
          { VarClass: OvereatsClass, value: true }
        ],
        given: [
          { VarClass: FatGeneClass, value: true }
        ]
      };
      const prob = inferProbability(dataTable, query)

      test("should be ~85%", () => {
        expect(prob).toBeCloseTo(0.85, 1)
      })
    })
    describe("probability of having fat gene", () => {
      const dataTable = take(system(), SAMPLE_SIZE)
      const query = {
        events: [
          { VarClass: FatGeneClass, value: true }
        ],
        given: []
      };
      const prob = inferProbability(dataTable, query)

      test("there should be a 25% chance of having it", () => {
        expect(prob).toBeCloseTo(0.25, 1)
      })
    })
    describe('probability of not having fat gene', () => {
      const dataTable = take(system(), SAMPLE_SIZE)
      const query = {
        events: [
          { VarClass: FatGeneClass, value: false }
        ],
        given: []
      };
      const prob = inferProbability(dataTable, query)

      test("there should be a 75% chance of having it", () => {
        expect(prob).toBeCloseTo(0.75, 1)
      })
    })
  })
})