import { useState } from "react"
import { useFocusEffect } from "@react-navigation/native"
import { NovelDetail, NovelInBookshelf } from "../../types/Yomuy"
import React from "react"
import { useAuthValue } from "../../contexts/authContext"
import { supabase } from "../../utilities/supabase"

export const homeScreenController = () => {
  const [loading, setLoading] = useState(false)

  const [novels, setNovels] = useState<NovelDetail[]>([])
  const { token, user } = useAuthValue()

  useFocusEffect(
    React.useCallback(() => {
      fetchNovels().finally(() => {
        setLoading(false)
      })
      return () => {
        setLoading(false)
      }
    }, []),
  )

  const fetchNovels = async () => {
    console.log("fetchNovels")
    if (loading) return
    setLoading(true)

    const fetched = await fetchBookshelf()

    const result = fetched.map((f) => {
      const r: NovelDetail = {
        ...f,
        title: `title ${f.ncode}: こんなかんじでタイトルが入るよ`,
        lastUpAt: 0,
        authorId: "",
        authorName: "",
        bigGenre: 1,
        downloadedAt: 0,
        firstUpAt: 0,
        genre: 101,
        isEnd: 0,
        keyword: "",
        novelType: 1,
        story: "",
      }
      return r
    })
    setNovels([...result])
  }

  const fetchBookshelf = async (): Promise<NovelInBookshelf[]> => {
    if (user === null) return []

    const { data, error } = await supabase.from("bookshelf").select("*")

    return [...Array(10)].map((_, i) => {
      return {
        ncode: `${i}`,
        addedAt: 99991231245959000,
      } as NovelInBookshelf
    })
  }

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
