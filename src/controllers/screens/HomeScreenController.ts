import { useState } from "react"
import { useFocusEffect } from "@react-navigation/native"
import { NovelInBookshelf } from "../../types/Yomuy"
import React from "react"
import { Linking } from "react-native"

export const homeScreenController = () => {
  const [novels, setNovels] = useState<NovelInBookshelf[]>([])

  const [loading, setLoading] = useState(true)

  const [actionNcode, setActionNcode] = useState<string | null>(null)

  useFocusEffect(
    React.useCallback(() => {
      fetchBookshelf()
    }, []),
  )

  const fetchBookshelf = () => {
    setLoading(true)
    const fetched: NovelInBookshelf[] = [...Array(20)].map((_, i) => {
      return {
        ncode: `${i}`,
        title: `title ${i}: こんなかんじでタイトルが入るよ`,
        addedAt: 99991231245959000,
        general_lastup: "",
      } as NovelInBookshelf
    })
    setNovels([...fetched])

    setLoading(false)
  }

  /**
   * 本棚に追加した小説の更新を確認する
   */
  const novelUpdate = () => {
    console.log("novelUpdate")
    if (novels.length === 0) fetchBookshelf()
    setLoading(true)
    if (novels.length === 0) return

    // タイトルやストーリーなどの更新をチェック

    setLoading(false)
  }

  /**
   * ブラウザで開く
   */
  const openNovelInBrowser = () => {
    if (actionNcode === null) return
    Linking.openURL(`https://ncode.syosetu.com/${actionNcode}`)
  }

  /**
   * 小説を本棚から削除
   */
  const removeNovel = () => {
    if (actionNcode === null) return

    setNovels(novels.filter((n) => n.ncode !== actionNcode))

    // DBのUPDATE

    closeNovelActionModal()
  }

  const openNovelActionModal = (ncode: string) => setActionNcode(ncode)
  const closeNovelActionModal = () => setActionNcode(null)

  return {
    novels,
    loading,
    actionNcode,

    novelUpdate,
    openNovelInBrowser,
    removeNovel,
    openNovelActionModal,
    closeNovelActionModal,
  }
}
