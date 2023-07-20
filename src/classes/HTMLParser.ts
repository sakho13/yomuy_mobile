import { load, CheerioAPI } from "cheerio"
import {
  NovelEpisode,
  NovelEpisodeChapter,
  NovelEpisodeTitle,
} from "../types/Narou"
import { parseDateFormatText } from "../functions/commonFunctions"

export class HTMLParser {
  private html: CheerioAPI

  constructor(html: string) {
    this.html = load(html)
  }

  public parseNovelTitle() {
    const title = this.html(".novel_title").text()
    return title ?? ""
  }

  public parseNovelEpisodes(): NovelEpisode[] {
    const indexBox = this.html(".index_box").children()

    const list = indexBox.toArray()
    if (list.length === 0) throw new Error("小説情報の取得に失敗")

    const parsed = list.reduce<NovelEpisode[]>((p, c) => {
      const item = this.html(c)

      if (item.attr("class") === "chapter_title") {
        return [...p, { chapterName: item.text() } as NovelEpisodeChapter]
      }
      if (item.attr("class") === "novel_sublist2") {
        const title = item.children(".subtitle").children("a")

        const href = title.attr("href") ?? ""
        if (href === "") return p
        const [_ncode, en] = href.slice(1, href.length - 1).split("/")
        const episodeNo = Number(en)
        if (isNaN(episodeNo)) return p

        const longUpDate = item.children(".long_update")
        const isKaitou = longUpDate.children("span").text() !== ""

        return [
          ...p,
          {
            episodeNo,
            subtitle: title.text(),
            upDate: parseDateFormatText(longUpDate.text()),
            isKaitou: isKaitou,
          } as NovelEpisodeTitle,
        ]
      }
      return p
    }, [])

    return parsed
  }

  public parseHonbun() {
    const honbunPart = this.html("#novel_honbun")

    if (honbunPart.length === 0) return null
    return honbunPart.html()
  }

  public parseSubtitle() {
    const subtitlePart = this.html(".novel_subtitle")
    if (subtitlePart.length === 0) return null
    return subtitlePart.text()
  }
}
