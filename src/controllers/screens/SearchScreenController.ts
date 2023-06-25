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

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const [hitCount, setHitCount] = useState(0)

  const [searchItems, setSearchItems] = useState<NarouAPIInput>({
    word: "",
  })

  const [novels, setNovels] = useState<NarouAPINovelPart[]>([])

  const narouApiController = new NarouApiController()

  /**
   * 初期化処理
   */
  const initState = () => {
    setNovels([])
  }

  /**
   * 検索モーダルの開閉
   */
  const toggleSearchModal = () => {
    setOpeningSearchModal(!openingSearchModal)
  }

  /**
   * 検索モーダルを強制で閉じる
   */
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

    const { novels: fetches } = await narouApiController.fetch(
      searchItems,
      novels.length + 1,
    )
    setNovels([...novels, ...fetches])

    setFetchingMore(false)
  }

  /**
   * 小説詳細モーダルを開く
   */
  const onTappedNovel = (index: number) => {
    setSelectedIndex(selectedIndex !== null ? null : index)
  }

  /**
   * 小説詳細モーダルを閉じる
   */
  const closeNovelDetailModal = () => setSelectedIndex(null)

  /**
   * 本棚に登録する
   */
  const addBookShelf = (novel: NarouAPINovelPart) => {
    console.log(novel)
  }

  /**
   * 検索単語の更新
   */
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
