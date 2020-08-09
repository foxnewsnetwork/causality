import {
  guid
} from './misc'

describe("utils/misc.ts", () => {
  describe("function guid", () => {
    const id1 = guid()
    const id2 = guid()
    const id3 = guid()

    it("should all be different from each other", () => {
      expect(id1).not.toEqual(id2)
      expect(id1).not.toEqual(id3)
      expect(id3).not.toEqual(id2)
    })
  })
})