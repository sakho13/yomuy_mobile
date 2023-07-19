import { LogicError } from "../../src/error/logicError"

describe("LogicError", () => {
  test("[success] LogicError 1", () => {
    const logicError = new LogicError("RequiredSigned")

    expect(logicError).toBeInstanceOf(LogicError)
    expect(logicError.errorInfo.title).toBe("サインイン必須エラー")
  })

  test("[fail] LogicError 1", () => {
    const logicError = new Error("RequiredSigned")

    expect(logicError).not.toBeInstanceOf(LogicError)
  })
})
