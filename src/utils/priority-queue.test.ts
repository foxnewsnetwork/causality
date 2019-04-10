import {
  create,
  push,
  pop,
  first,
  isPresent
} from './priority-queue';

describe('utils/priority-queue.ts', () => {
  describe('::create()', () => {
    const q = create('dog')

    describe('::first()', () => {
      it('should get the first element', () => {
        expect(first(q)).toEqual('dog')
      })
    })

    describe('::push()', () => {
      const q2 = push(q, 1, 'cat')

      it('should be not modify the original reference', () => {
        expect(q2).not.toEqual(q)
      })
      it('should properly change the highest priority element', () => {
        expect(first(q2)).toEqual('cat')
      })

      describe('::pop()', () => {
        const q3 = push(q2, 0, 'bat')
        const q4 = pop(q3)
        const q5 = isPresent(q4) ? push(q4, 1, 'flame') : null;

        it('should add another member of even higher priority', () => {
          expect(first(q3)).toEqual('bat')
        })

        it('should return me to what I have', () => {
          expect(first(q4)).toEqual(first(q2))
        })
      })
    })
  })
})
