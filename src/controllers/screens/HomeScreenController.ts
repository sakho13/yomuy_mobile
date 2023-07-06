import { useState } from "react"
import { useFocusEffect } from "@react-navigation/native"
import { NovelInBookshelf } from "../../types/Yomuy"
import React from "react"

export const homeScreenController = () => {
  const [novels, setNovels] = useState<NovelInBookshelf[]>([])

  useFocusEffect(
    React.useCallback(() => {
      const fetched: NovelInBookshelf[] = [...Array(10)].map((_, i) => {
        return {
          ncode: `${i}`,
          title: `title ${i}: こんなかんじでタイトルが入るよ`,
          addedAt: 99991231245959000,
          general_lastup: "",
        } as NovelInBookshelf
      })
      setNovels([...fetched])
    }, []),
  )

  /**
   * 本棚に追加した小説の更新を確認する
   */
  const novelUpdate = () => {
    // タイトルやストーリーなど
  }

  return {
    novels,

    novelUpdate,
  }
}
