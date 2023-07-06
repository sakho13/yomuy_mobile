import {
  isColorText,
  isNcode,
  parseDateFormatText,
  parseNum2Formatted,
  zeroOffset,
} from "../../src/functions/commonFunctions"

describe("共通関数", () => {
  test("[success] zeroOffset", () => {
    const num = 123
    const str = zeroOffset(num, 5)
    expect(str).toBe("00123")
  })

  test("[success] isColorText", () => {
    const isColor = isColorText("#0fa00f")
    expect(isColor).toBe(true)
  })

  test("[success] isColorText", () => {
    const isColor = isColorText("0fa00f")
    expect(isColor).toBe(false)
  })

  test("[fail] isColorText", () => {
    const isColor = isColorText("#0fg00f")
    expect(isColor).toBe(false)
  })

  test("[success] isNcode 1", () => {
    const result = isNcode("n0001a")
    expect(result).toBe(true)
  })

  test("[success] isNcode 2", () => {
    const result = isNcode("N0001a")
    expect(result).toBe(true)
  })

  test("[fail] isNcode 1", () => {
    const result = isNcode("a0001a")
    expect(result).toBe(false)
  })

  test("[success] parseDateFormatText", () => {
    const date = parseDateFormatText("9999/12/31 24:59（改）")
    expect(date).toBe("9999/12/31 24:59")
  })

  test("[fail] parseDateFormatText", () => {
    const date = parseDateFormatText("9999-12/31 24:59（改）")
    expect(date).not.toBe("9999/12/31 24:59")
    expect(date).toBe("")
  })

  test("[success] parseNum2Formatted 1", () => {
    const str = parseNum2Formatted(99991231125959999)
    expect(str).toBe("9999/12/31 12:59")
  })

  test("[success] parseNum2Formatted 2", () => {
    const str = parseNum2Formatted(99990109125959999)
    expect(str).toBe("9999/1/9 12:59")
  })

  test("[fail] parseNum2Formatted 1", () => {
    const str = parseNum2Formatted(9999123112595999)
    expect(str).toBe("unknown")
  })
})
