import {
  visitableGraph
} from './d-separation'
import {
  create,
  Graph,
  addChild
} from './graph'
import {
  get
} from './map'

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

    let graph: Graph<LifeEvent> = create()
    graph = addChild(graph, LIFE_EVENT.OVEREATING, LIFE_EVENT.BEING_FAT)
    graph = addChild(graph, LIFE_EVENT.LOW_METABOLISM, LIFE_EVENT.BEING_FAT)
    graph = addChild(graph, LIFE_EVENT.EXERCISING, LIFE_EVENT.BEING_FAT)
    graph = addChild(graph, LIFE_EVENT.FAT_GENE, LIFE_EVENT.LOW_METABOLISM)
    graph = addChild(graph, LIFE_EVENT.STRESSED, LIFE_EVENT.OVEREATING)
    graph = addChild(graph, LIFE_EVENT.OVEREATING, LIFE_EVENT.UPSET_STOMACH)
    graph = addChild(graph, LIFE_EVENT.AWFUL_BOSS, LIFE_EVENT.STRESSED)
    graph = addChild(graph, LIFE_EVENT.POVERTY, LIFE_EVENT.STRESSED)

    describe('controlling for OVEREATING', () => {
      const quarantine = new Set([LIFE_EVENT.OVEREATING])
      const resMap = visitableGraph(graph, quarantine)

      describe(`at node ${LIFE_EVENT.EXERCISING}`, () => {
        const visitable = get(resMap, LIFE_EVENT.EXERCISING)
        const outstr = [...visitable].join('-')

        it('should be sensible', () => {
          expect(outstr).toEqual(LIFE_EVENT.BEING_FAT)
        })
        it(`should cause ${LIFE_EVENT.BEING_FAT}`, () => {
          expect(visitable.has(LIFE_EVENT.BEING_FAT)).toBeTruthy()
        })

        describe(`collider with ${LIFE_EVENT.BEING_FAT}`, () => {
          it('should be be independent from the other nodes', () => {
            expect(visitable.size).toEqual(1)
          })
        })
      })

      describe(`at node ${LIFE_EVENT.POVERTY}`, () => {
        console.log('--- \n\n', resMap)
        const visitable = get(resMap, LIFE_EVENT.POVERTY)
        const outstr = [...visitable].join('-')

        it('should look reasonable', () => {
          expect(outstr).toEqual(LIFE_EVENT.AWFUL_BOSS)
        })

        it(`should now be correlated to ${LIFE_EVENT.AWFUL_BOSS}`, () => {
          expect(visitable.has(LIFE_EVENT.AWFUL_BOSS)).toBeTruthy()
        })
      })

      describe(`at node ${LIFE_EVENT.AWFUL_BOSS}`, () => {
        const visitable = get(resMap, LIFE_EVENT.AWFUL_BOSS)

        it(`should now be correlated to ${LIFE_EVENT.POVERTY}`, () => {
          expect(visitable.has(LIFE_EVENT.POVERTY)).toBeTruthy()
        })
      })

      describe(`at node ${LIFE_EVENT.UPSET_STOMACH}`, () => {
        const visitable = get(resMap, LIFE_EVENT.UPSET_STOMACH)

        it('should not be visitable by anything', () => {
          expect(visitable.size).toEqual(0)
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
          LIFE_EVENT.FAT_GENE
        ])
        const INDEPENDENCIES = new Set([
          LIFE_EVENT.UPSET_STOMACH,
          LIFE_EVENT.STRESSED,
          LIFE_EVENT.POVERTY,
          LIFE_EVENT.AWFUL_BOSS
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