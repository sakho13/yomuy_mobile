import { BigGenreKey, GenreKey } from "./Narou"

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
  downloadedAt: number
}

/**
 * 本棚に登録している小説
 */
export type NovelInBookshelf = {
  ncode: string
  title: string
  addedAt: number
  general_lastup: string
}
