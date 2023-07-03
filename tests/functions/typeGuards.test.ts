import {
  isNarouAPICountPart,
  isNovelEpisodeChapter,
  isNovelEpisodeTitle,
} from "../../src/functions/typeGuards"

describe("型ガード", () => {
  test("[success] isNarouAPICountPart", () => {
    expect(isNarouAPICountPart({ allcount: 0 })).toBe(true)
  })

  test("[fail] isNarouAPICountPart", () => {
    expect(isNarouAPICountPart({ allcounts: 0 })).toBe(false)
  })

  test("[success] isNovelEpisodeChapter", () => {
    expect(isNovelEpisodeChapter({ chapterName: "sample chapter title" })).toBe(
      true,
    )
  })

  test("[fail] isNovelEpisodeChapter 1", () => {
    expect(isNovelEpisodeChapter({})).toBe(false)
  })

  test("[fail] isNovelEpisodeChapter 2", () => {
    expect(isNovelEpisodeChapter({ chapterName: null })).toBe(false)
  })

  test("[fail] isNovelEpisodeChapter 3", () => {
    expect(isNovelEpisodeChapter({ chapterName: 1234 })).toBe(false)
  })

  test("[success] isNovelEpisodeTitle", () => {
    expect(
      isNovelEpisodeTitle({
        episodeNo: 1,
        subtitle: "sample subtitle",
        upDate: "99991231",
        isKaitou: false,
      }),
    ).toBe(true)
  })

  test("[fail] isNovelEpisodeTitle 1", () => {
    expect(
      isNovelEpisodeTitle({
        subtitle: "sample subtitle",
        upDate: "99991231",
        isKaitou: false,
      }),
    ).toBe(false)
  })
})
