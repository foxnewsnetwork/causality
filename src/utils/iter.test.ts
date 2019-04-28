import { zero, push, isEmpty, has } from "./iter";


describe("util/iter.ts", () => {
  describe("function push", () => {
    let ZERO: Iterable<number>, ONE: Iterable<number>, TWO: Iterable<number>;

    beforeEach(() => {
      ZERO = zero()
      ONE = push(ZERO, 1)
      TWO = push(ONE, 2)
    })

    describe('subject one', () => {
      let outstr: string;
      beforeEach(() => {
        outstr = [...ONE].join('-')
      })

      it('should look reasonable', () => {
        expect(outstr).toEqual('1')
      })
    })

    describe('subject two', () => {
      let outstr: string;
      beforeEach(() => {
        outstr = [...TWO].join('-')
      })
      it('should look reasonable', () => {
        expect(outstr).toEqual('1-2')
      })
    })

    describe("function isEmpty", () => {
      it('should be empty on zero', () => {
        expect(isEmpty(ZERO)).toBeTruthy()
      })
      it('should not be empty on anything else', () => {
        expect(isEmpty(ONE)).toBeFalsy()
        expect(isEmpty(TWO)).toBeFalsy()
      })
    })

    describe('function has', () => {
      describe('subject zero', () => {
        it('should not have anything', () => {
          expect(has(ZERO, 1)).toBeFalsy()
        })
        it('should not have 2', () => {
          expect(has(ZERO, 2)).toBeFalsy()
        })
      })
      describe('subject one', () => {
        it('should have 1', () => {
          expect(has(ONE, 1)).toBeTruthy()
        })
        it('should not have 2', () => {
          expect(has(ONE, 2)).toBeFalsy()
        })
      })
      describe('subject two', () => {
        it('should have 1', () => {
          expect(has(TWO, 1)).toBeTruthy()
        })
        it('should have 2', () => {
          expect(has(TWO, 2)).toBeTruthy()
        })
      })
    })
  })
})