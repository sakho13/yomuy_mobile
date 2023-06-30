import {
  isColorText,
  parseDateFormatText,
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

  test("[success] parseDateFormatText", () => {
    const date = parseDateFormatText("9999/12/31 24:59（改）")
    expect(date).toBe("9999/12/31 24:59")
  })

  test("[fail] parseDateFormatText", () => {
    const date = parseDateFormatText("9999-12/31 24:59（改）")
    expect(date).not.toBe("9999/12/31 24:59")
    expect(date).toBe("")
  })
})
