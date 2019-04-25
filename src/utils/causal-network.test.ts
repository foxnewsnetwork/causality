import {
  visitableGraph
} from './causal-network'
import {
  create,
  Graph,
  addChild
} from './graph'

describe('utils/causal-network.ts', () => {
  describe('function visitableGraph', () => {
    const LIFE_EVENT = {
      BEING_FAT: 'BEING_FAT',
      OVEREATING: 'OVEREATING',
      EXERCISING: 'EXERCISING',
      STRESSED: 'STRESSED',
      LOW_METABOLISM: 'LOW_METABOLISM',
      FAT_GENE: 'FAT_GENE',
      UPSET_STOMACH: 'UPSET_STOMACH',
      AWFUL_BOSS: 'AWFUL_BOSS',
      POVERTY: 'POVERTY'
    }
    type LifeEvent = typeof LIFE_EVENT[keyof typeof LIFE_EVENT]

    const graph: Graph<LifeEvent> = create(LIFE_EVENT.BEING_FAT)
    addChild(graph, LIFE_EVENT.OVEREATING, LIFE_EVENT.BEING_FAT)
    addChild(graph, LIFE_EVENT.LOW_METABOLISM, LIFE_EVENT.BEING_FAT)
    addChild(graph, LIFE_EVENT.EXERCISING, LIFE_EVENT.BEING_FAT)
    addChild(graph, LIFE_EVENT.FAT_GENE, LIFE_EVENT.LOW_METABOLISM)
    addChild(graph, LIFE_EVENT.STRESSED, LIFE_EVENT.OVEREATING)
    addChild(graph, LIFE_EVENT.OVEREATING, LIFE_EVENT.UPSET_STOMACH)
    addChild(graph, LIFE_EVENT.AWFUL_BOSS, LIFE_EVENT.STRESSED)
    addChild(graph, LIFE_EVENT.POVERTY, LIFE_EVENT.STRESSED)

    describe('controlling for OVEREATING', () => {
      const quarantine = new Set([LIFE_EVENT.OVEREATING])
      const resMap = visitableGraph(graph, quarantine)

      describe(`at node ${LIFE_EVENT.BEING_FAT}`, () => {
        const visitables = resMap.get(LIFE_EVENT.BEING_FAT) || new Set()
        const DEPENDENCIES = new Set([
          LIFE_EVENT.EXERCISING,
          LIFE_EVENT.LOW_METABOLISM,
          LIFE_EVENT.FAT_GENE
        ])
        const INDEPENDENCIES = new Set([
          LIFE_EVENT.UPSET_STOMACH,
          LIFE_EVENT.STRESSED,
          LIFE_EVENT.POVERTY,
          LIFE_EVENT.AWFUL_BOSS
        ])

        for(const dep of DEPENDENCIES) {
          it(`${dep} should be visitable`, () => {
            expect(visitables.has(dep)).toBeTruthy()
          })
        }

        for(const ind of INDEPENDENCIES) {
          it(`${ind} should not be visitable'`, () => {
            expect(visitables.has(ind)).toBeFalsy()
          })
        }
      })
    })
  })
})