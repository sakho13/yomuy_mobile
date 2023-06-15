export type DownloadedNovelInfo = {
  /** PK */
  ncode: string

  title: string
  authorId: string
  authorName: string
  story: string
  bigGenre: BigGenreKey
  genre: GenreKey
  keyword: string
  /** 初回掲載日 */
  firstUpAt: number
  /** 最終掲載日 */
  lastUpAt: number
  /** 1: 連載, 2: 短編 */
  novelType: 1 | 2
  /** 0: 完結済み, 1: 連載中 */
  isEnd: 0 | 1
}

export type NarouAPINovelPart = {
  title: string
  ncode: string
  /** 作者のユーザID(数値) */
  userid: number
  writer: string
  story: string
  biggenre: BigGenreKey
  genre: GenreKey
  gensaku: string
  /** スペース区切り */
  keyword: string
  general_firstup: string
  general_lastup: string
  novel_type: 1 | 2
  /** 短編小説と完結済小説は0、連載中は1 */
  end: 0 | 1
  general_all_no: number
  length: number
  /** 読了時間(分単位) */
  time: number
  isstop: 1 | 0
  isr15: 1 | 0
  isbl: 1 | 0
  isgl: 1 | 0
  iszankoku: 1 | 0
  istensei: 1 | 0
  istenni: 1 | 0
  /** 1はケータイのみ、2はPCのみ、3はPCとケータイで投稿された作品 */
  pc_or_k: 1 | 2 | 3
  global_point: number
  daily_point: number
  weekly_point: number
  monthly_point: number
  quarter_point: number
  yearly_point: number
  fav_novel_cnt: number
  impression_cnt: number
  review_cnt: number
  all_point: number
  all_hyoka_cnt: number
  sasie_cnt: number
  kaiwaritu: number
  novelupdated_at: string
  /** システム用 */
  updated_at: string
}

export type NarouAPICountPart = {
  allcount: number
}

export type NarouAPIResponse = (NarouAPICountPart | NarouAPINovelPart)[]

// ************ 大ジャンル ************

export const bigGenreKeys = [1, 2, 3, 4, 99, 98] as const

export type BigGenreKey = (typeof bigGenreKeys)[number]

export const bigGenre: { [key in BigGenreKey]: string } = {
  1: "恋愛",
  2: "ファンタジー",
  3: "文芸",
  4: "SF",
  99: "その他",
  98: "ノンジャンル",
} as const

// ************ ジャンル ************

export const genreKeys = [
  101, 102, 201, 202, 301, 302, 303, 304, 305, 306, 307, 401, 402, 403, 404,
  9901, 9902, 9903, 9904, 9999, 9801,
] as const

export type GenreKey = (typeof genreKeys)[number]

export const genre: { [key in GenreKey]: string } = {
  101: "異世界〔恋愛〕",
  102: "現実世界〔恋愛〕",
  201: "ハイファンタジー〔ファンタジー〕",
  202: "ローファンタジー〔ファンタジー〕",
  301: "純文学〔文芸〕",
  302: "ヒューマンドラマ〔文芸〕",
  303: "歴史〔文芸〕",
  304: "推理〔文芸〕",
  305: "ホラー〔文芸〕",
  306: "アクション〔文芸〕",
  307: "コメディー〔文芸〕",
  401: "VRゲーム〔SF〕",
  402: "宇宙〔SF〕",
  403: "空想科学〔SF〕",
  404: "パニック〔SF〕",
  9901: "童話〔その他〕",
  9902: "詩〔その他〕",
  9903: "エッセイ〔その他〕",
  9904: "リプレイ〔その他〕",
  9999: "その他〔その他〕",
  9801: "ノンジャンル〔ノンジャンル〕",
}
