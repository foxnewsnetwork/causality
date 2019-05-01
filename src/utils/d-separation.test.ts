import {
  visitableGraph
} from './d-separation'
import {
  create,
  Graph,
  connect
} from './graph'
import {
  get
} from './map'
import { reduce } from './iter';

describe('utils/d-separation.ts', () => {
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

    const CONNECTIONS = [
      [LIFE_EVENT.OVEREATING, LIFE_EVENT.BEING_FAT],
      [LIFE_EVENT.LOW_METABOLISM, LIFE_EVENT.BEING_FAT],
      [LIFE_EVENT.EXERCISING, LIFE_EVENT.BEING_FAT],
      [LIFE_EVENT.FAT_GENE, LIFE_EVENT.LOW_METABOLISM],
      [LIFE_EVENT.STRESSED, LIFE_EVENT.OVEREATING],
      [LIFE_EVENT.OVEREATING, LIFE_EVENT.UPSET_STOMACH],
      [LIFE_EVENT.AWFUL_BOSS, LIFE_EVENT.STRESSED],
      [LIFE_EVENT.POVERTY, LIFE_EVENT.STRESSED]
    ]
    const GRAPH: Graph<LifeEvent> = reduce(
      CONNECTIONS,
      (graph, [parent, child]) => connect(graph, parent, child),
      create()
    )

    describe('controlling for OVEREATING', () => {
      const quarantine = new Set([LIFE_EVENT.OVEREATING])
      const resMap = visitableGraph(GRAPH, quarantine)

      describe(`at node ${LIFE_EVENT.EXERCISING}`, () => {
        const visitable = get(resMap, LIFE_EVENT.EXERCISING)
        it('should only have two members', () => {
          expect(visitable).toHaveProperty("size", 2)
        })

        it(`should cause ${LIFE_EVENT.BEING_FAT}`, () => {
          expect(visitable.has(LIFE_EVENT.BEING_FAT)).toBeTruthy()
        })

        it(`should be reflective on the self`, () => {
          expect(visitable.has(LIFE_EVENT.EXERCISING)).toBeTruthy()
        })
      })

      describe(`at node ${LIFE_EVENT.POVERTY}`, () => {
        const visitable = get(resMap, LIFE_EVENT.POVERTY)
        it('should have 3 nodes that affect me', () => {
          expect(visitable).toHaveProperty("size", 3)
        })

        const EVENTS = [LIFE_EVENT.AWFUL_BOSS, LIFE_EVENT.POVERTY, LIFE_EVENT.STRESSED]
        for (const EVENT of EVENTS) {
          it(`should now be correlated to ${EVENT}`, () => {
            expect(visitable.has(EVENT)).toBeTruthy()
          })
        }
      })

      describe(`at node ${LIFE_EVENT.AWFUL_BOSS}`, () => {
        const visitable = get(resMap, LIFE_EVENT.AWFUL_BOSS)
        it('should have 3 nodes that affect me', () => {
          expect(visitable).toHaveProperty("size", 3)
        })

        const EVENTS = [LIFE_EVENT.AWFUL_BOSS, LIFE_EVENT.POVERTY, LIFE_EVENT.STRESSED]
        for (const EVENT of EVENTS) {
          it(`should now be correlated to ${EVENT}`, () => {
            expect(visitable.has(EVENT)).toBeTruthy()
          })
        }
      })

      describe(`at node ${LIFE_EVENT.UPSET_STOMACH}`, () => {
        const visitable = get(resMap, LIFE_EVENT.UPSET_STOMACH)

        it('should not be visitable by anything other than itself', () => {
          expect(visitable.size).toEqual(1)
        })

        it('should be visitable only by itself', () => {
          expect(visitable.has(LIFE_EVENT.UPSET_STOMACH)).toBeTruthy()
        })
      })

      describe(`at node ${LIFE_EVENT.FAT_GENE}`, () => {
        const visitable = get(resMap, LIFE_EVENT.FAT_GENE)

        it(`should still be a cause of ${LIFE_EVENT.BEING_FAT} despite controlling for ${LIFE_EVENT.OVEREATING}`, () => {
          expect(visitable.has(LIFE_EVENT.BEING_FAT)).toBeTruthy()
        })

        it(`should cause ${LIFE_EVENT.BEING_FAT} through the mediating variable of ${LIFE_EVENT.LOW_METABOLISM}`, () => {
          expect(visitable.has(LIFE_EVENT.LOW_METABOLISM)).toBeTruthy()
        })
      })

      describe(`at node ${LIFE_EVENT.BEING_FAT}`, () => {
        const visitables = get(resMap, LIFE_EVENT.BEING_FAT)
        const DEPENDENCIES = new Set([
          LIFE_EVENT.EXERCISING,
          LIFE_EVENT.LOW_METABOLISM,
          LIFE_EVENT.FAT_GENE,
          LIFE_EVENT.BEING_FAT
        ])
        const INDEPENDENCIES = new Set([
          LIFE_EVENT.UPSET_STOMACH,
          LIFE_EVENT.STRESSED,
          LIFE_EVENT.POVERTY,
          LIFE_EVENT.AWFUL_BOSS,
          LIFE_EVENT.OVEREATING
        ])

        for (const dep of DEPENDENCIES) {
          it(`${dep} should be visitable`, () => {
            expect(visitables.has(dep)).toBeTruthy()
          })
        }

        for (const ind of INDEPENDENCIES) {
          it(`${ind} should not be visitable'`, () => {
            expect(visitables.has(ind)).toBeFalsy()
          })
        }
      })
    })
  })
})