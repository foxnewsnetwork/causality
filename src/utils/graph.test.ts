import { create, addChild, getChildren } from "./graph";
import { has } from "./iter";

const SCHOOL_EVENT = {
  BEING_STUPID: 'BEING_STUPID',
  BAD_GRADES: 'BAD_GRADES',
  STUDYING: 'STUDYING',
  DO_DRUGS: 'DO_DRUGS',
  DO_SPORTS: 'DO_SPORTS'
}

type SchoolEvent = keyof typeof SCHOOL_EVENT;

describe.skip("utils/graph.ts", () => {
  describe("function create", () => {
    const graph = create(SCHOOL_EVENT.BAD_GRADES)

    it('should have a sensible id', () => {
      expect(graph).toHaveProperty("id")
    })

    describe("function addChild", () => {
      const graph2 = addChild(graph, SCHOOL_EVENT.DO_DRUGS, SCHOOL_EVENT.BAD_GRADES)

      it('should be an immutable object', () => {
        expect(graph).not.toEqual(graph2)
      })

      describe('function getChildren', () => {
        const children = getChildren(graph2, SCHOOL_EVENT.DO_DRUGS)
        it(`should have made ${SCHOOL_EVENT.BAD_GRADES} a child of ${SCHOOL_EVENT.DO_DRUGS}`, () => {
          expect(has(children, SCHOOL_EVENT.BAD_GRADES)).toBeTruthy()
        })
      })

    })
  })
})