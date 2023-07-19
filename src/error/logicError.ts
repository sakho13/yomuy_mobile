const logicErrorCode = [
  "Unknown",
  // 1~100 認証
  "Unsigned",
  // 101~200 DBアクセス
  "FetchBookshelf",
  "RegisterToBookshelf",
] as const

type LogicErrorCode = (typeof logicErrorCode)[number]

const LogicErrorMap: {
  [code in LogicErrorCode]: {
    title: string
    message: string
  }
} = {
  Unknown: {
    title: "未確認エラー",
    message: "",
  },
  Unsigned: {
    title: "未サインインエラー",
    message: "",
  },
  FetchBookshelf: {
    title: "本棚情報の取得エラー",
    message: ``,
  },
  RegisterToBookshelf: {
    title: "本棚への追加エラー",
    message: ``,
  },
}

export class LogicError extends Error {
  private code: LogicErrorCode

  constructor(code: LogicErrorCode) {
    super(LogicErrorMap[code].title)
    this.code = code
  }

  public get errorInfo() {
    return LogicErrorMap[this.code]
  }

  public static unknownError() {
    return new LogicError("Unknown")
  }
}
