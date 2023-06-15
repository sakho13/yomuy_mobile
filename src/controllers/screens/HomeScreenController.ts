import { useEffect, useState } from "react"
import { useFocusEffect } from "@react-navigation/native"
import { DownloadedNovelInfo } from "../../types/Yomuy"
import React from "react"
import { CommonDate } from "../../classes/CommonDate"

export const homeScreenController = () => {
  const [novels, setNovels] = useState<DownloadedNovelInfo[]>([])

  useFocusEffect(
    React.useCallback(() => {
      const now = new CommonDate()

      const fetched: DownloadedNovelInfo[] = [...Array(10)].map((_, i) => {
        return {
          ncode: `${i}`,
          title: `title ${i}: こんなかんじでタイトルが入るよ`,
          downloadedAt: now.getByNumber,
        }
      })
      setNovels([
        ...fetched,
        {
          ncode: "long",
          title:
            "とても長いしょうせつのタイトルです。高さを上手く調整しましょう！",
          downloadedAt: now.getByNumber,
        },
      ])
    }, []),
  )

  return {
    novels,
  }
}
