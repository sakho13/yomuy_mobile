import { useFocusEffect } from "@react-navigation/native"
import React, { useEffect } from "react"
import { HTMLParser } from "../../classes/HTMLParser"
import {
  useEpisodeSet,
  useEpisodeValue,
  useNcodeValue,
} from "../../contexts/novelContext"
import { useState } from "react"
import { NarouWebApiUtility } from "../../utilities/NarouWebApiUtility"

export const EpisodeScreenController = () => {
  const ncode = useNcodeValue()
  const episode = useEpisodeValue()
  const setEpisode = useEpisodeSet()

  const [honbun, setHonbun] = useState("")
  const [subtitle, setSubtitle] = useState("")

  const [loading, setLoading] = useState(false)

  useFocusEffect(
    React.useCallback(() => {
      console.log(episode)
      fetchHonbun().finally(() => {
        setLoading(false)
      })

      return () => {
        setLoading(false)
        setHonbun("")
      }
    }, []),
  )

  useEffect(() => {
    setLoading(false)
    fetchHonbun().finally(() => {
      setLoading(false)
    })
    return () => {}
  }, [episode])

  const fetchHonbun = async () => {
    if (loading) return

    setLoading(true)

    const res = await NarouWebApiUtility.getSyosetuPart(ncode, episode)
    if (res === null) {
      setSubtitle("小説の取得に失敗")
      return
    }

    const parser = new HTMLParser(res)
    const honbun = parser.parseHonbun()
    const subtitle = parser.parseSubtitle()

    if (honbun !== null) setHonbun(honbun)
    if (subtitle !== null) setSubtitle(subtitle)
  }

  const jumpEpisode = (direction: "prev" | "next") => {
    if (direction === "prev") {
      if (episode === 1) return
      setEpisode(episode - 1)
    } else {
      setEpisode(episode + 1)
    }
  }

  const honbunLoaded = () => setLoading(false)

  return {
    subtitle,
    honbun,
    loading,

    jumpEpisode,
    honbunLoaded,
  }
}
