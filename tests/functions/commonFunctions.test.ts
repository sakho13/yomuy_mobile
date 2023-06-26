import { isColorText, zeroOffset } from "../../src/functions/commonFunctions"

describe("共通関数", () => {
  test("zeroOffset(123, 5) = 00123", () => {
    const num = 123
    const str = zeroOffset(num, 5)
    expect(str).toBe("00123")
  })

  test("isColorText(#0fa00f) is color", () => {
    const isColor = isColorText("#0fa00f")
    expect(isColor).toBe(true)
  })

  test("isColorText(0fa00f) is not color", () => {
    const isColor = isColorText("0fa00f")
    expect(isColor).toBe(false)
  })

  test("isColorText(#0fg00f) is not color", () => {
    const isColor = isColorText("#0fg00f")
    expect(isColor).toBe(false)
  })
})
