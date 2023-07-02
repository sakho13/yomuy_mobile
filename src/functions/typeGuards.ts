import {
  NarouAPICountPart,
  NovelEpisodeChapter,
  NovelEpisodeTitle,
} from "../types/Narou"

export function isNarouAPICountPart(x: any): x is NarouAPICountPart {
  return x.allcount !== undefined && typeof x.allcount === "number"
}

export function isNovelEpisodeChapter(x: any): x is NovelEpisodeChapter {
  return x.chapterName !== undefined && typeof x.chapterName === "string"
}

export function isNovelEpisodeTitle(x: any): x is NovelEpisodeTitle {
  return (
    x.episodeNo !== undefined &&
    typeof x.episodeNo === "number" &&
    x.subtitle !== undefined &&
    typeof x.subtitle === "string"
  )
}
