import { useState } from "react"
import { NarouApiController } from "../NarouApiController"
import { NarouAPIInput, NarouAPINovelPart } from "../../types/Narou"

export const searchScreenController = () => {
  const [isFetching, setIsFetching] = useState(false)

  const [listMessage, setListMessage] = useState<
    "件数は0件です" | "検索してください"
  >("検索してください")
  const [fetchingMore, setFetchingMore] = useState(false)

  const [openingSearchModal, setOpeningSearchModal] = useState(false)

  // const [openingNovelModal, setOpeningNovelModal] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const [hitCount, setHitCount] = useState(0)

  const [searchItems, setSearchItems] = useState<NarouAPIInput>({
    word: "本好き",
  })

  const [novels, setNovels] = useState<NarouAPINovelPart[]>([
    // { title: "これがタイトル" },
    // {
    //   title:
    //     "これがタイトルよ。長めのタイトルはちゃんと折り返して高さも調節できるようにしましょう",
    // },
  ] as NarouAPINovelPart[])

  const narouApiController = new NarouApiController()

  const initState = () => {
    setNovels([])
  }

  const toggleSearchModal = () => {
    setOpeningSearchModal(!openingSearchModal)
  }

  const closeSearchModal = () => setOpeningSearchModal(false)

  /**
   * モーダルからの検索開始ロジック
   */
  const search = async () => {
    setIsFetching(true)
    setOpeningSearchModal(false)
    setListMessage("件数は0件です")

    const { hitCount, novels: fetches } = await narouApiController.fetch(
      searchItems,
    )
    setHitCount(hitCount)
    setNovels(fetches)

    setIsFetching(false)
  }

  /**
   * 検索結果からの検索開始ロジック
   */
  const searchMore = async () => {
    if (hitCount <= novels.length) return
    if (fetchingMore) return
    setFetchingMore(true)

    console.log(hitCount, novels.length)

    const { novels: fetches } = await narouApiController.fetch(
      searchItems,
      novels.length + 1,
    )
    setNovels([...novels, ...fetches])

    setFetchingMore(false)
  }

  const onTappedNovel = (index: number) => {
    setSelectedIndex(selectedIndex !== null ? null : index)
  }

  const closeNovelDetailModal = () => setSelectedIndex(null)

  const addBookShelf = (novel: NarouAPINovelPart) => {
    console.log(novel)
  }

  const changeWord = (text: string) => {
    setSearchItems({ ...searchItems, word: text })
  }

  return {
    openingSearchModal,
    selectedIndex,
    novels,
    searchItems,
    isFetching,
    fetchingMore,
    listMessage,

    initState,
    toggleSearchModal,
    closeSearchModal,
    search,
    searchMore,
    onTappedNovel,
    closeNovelDetailModal,
    addBookShelf,
    changeWord,
  }
}
