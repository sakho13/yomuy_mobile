import { useState } from "react"
import { useFocusEffect } from "@react-navigation/native"
import { NovelInBookshelf } from "../../types/Yomuy"
import React from "react"

export const homeScreenController = () => {
  const [novels, setNovels] = useState<NovelInBookshelf[]>([])

  const [loading, setLoading] = useState(true)

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

  return {
    novels,
    loading,

    novelUpdate,
  }
}
