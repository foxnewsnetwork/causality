import { create, connect, getChildren, getParents } from "./graph";
import { has } from "./iter";

const SCHOOL_EVENT = {
  BEING_STUPID: 'BEING_STUPID',
  BAD_GRADES: 'BAD_GRADES',
  STUDYING: 'STUDYING',
  DO_DRUGS: 'DO_DRUGS',
  DO_SPORTS: 'DO_SPORTS'
}

type SchoolEvent = keyof typeof SCHOOL_EVENT;

describe("utils/graph.ts", () => {
  describe("function create", () => {
    const graph = create()

    it('should have a sensible id', () => {
      expect(graph).toHaveProperty("id")
    })

    describe("function connect", () => {
      const graph2 = connect(graph, SCHOOL_EVENT.DO_DRUGS, SCHOOL_EVENT.BAD_GRADES)

      describe('property immutability', () => {
        it('should be an immutable object', () => {
          expect(graph === graph2).not.toBeTruthy()
        })

        it('should have different children', () => {
          const c0 = getChildren(graph, SCHOOL_EVENT.DO_DRUGS)
          const c1 = getChildren(graph2, SCHOOL_EVENT.DO_DRUGS)
          expect(c0).toHaveProperty("size", 0)
          expect(c1).toHaveProperty("size", 1)
        })
      })

      describe('function getParents', () => {
        const parents = getParents(graph2, SCHOOL_EVENT.BAD_GRADES)
        const parentStr = [...parents].join('-')
        it('should look sensible', () => {
          expect(parentStr).toEqual(SCHOOL_EVENT.DO_DRUGS)
        })
        it(`should have made ${SCHOOL_EVENT.BAD_GRADES} a parent of ${SCHOOL_EVENT.DO_DRUGS}`, () => {
          expect(has(parents, SCHOOL_EVENT.DO_DRUGS)).toBeTruthy()
        })
      })

      describe('function getChildren', () => {
        const children = getChildren(graph2, SCHOOL_EVENT.DO_DRUGS)
        it(`should have made ${SCHOOL_EVENT.BAD_GRADES} a child of ${SCHOOL_EVENT.DO_DRUGS}`, () => {
          expect(has(children, SCHOOL_EVENT.BAD_GRADES)).toBeTruthy()
        })

        const childrenStr = [...children].join('-')
        it('should look sensible', () => {
          expect(childrenStr).toEqual(SCHOOL_EVENT.BAD_GRADES)
        })
      })

    })
  })
})