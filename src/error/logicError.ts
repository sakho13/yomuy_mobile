const logicErrorCode = [
  "Unknown",
  // Authentication
  "Unsigned",
  "RequiredSigned",
  // DB access
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
  RequiredSigned: {
    title: "サインイン必須エラー",
    message:
      `この機能にはサインインが必須です。\n` +
      `本棚画面よりサインインしてください。`,
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
