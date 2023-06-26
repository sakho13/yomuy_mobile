import { isNarouAPICountPart } from "../../src/functions/typeGuards"

describe("型ガード", () => {
  test("isNarouAPICountPart({allcount: 0}) is OK", () => {
    expect(isNarouAPICountPart({ allcount: 0 })).toBe(true)
  })

  test("isNarouAPICountPart({allcounts: 0}) is wrong", () => {
    expect(isNarouAPICountPart({ allcounts: 0 })).toBe(false)
  })
})
