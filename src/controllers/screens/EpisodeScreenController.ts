import Axios from "axios"
import { useFocusEffect } from "@react-navigation/native"
import React, { useEffect } from "react"
import { HTMLParser } from "../../classes/HTMLParser"
import {
  useEpisodeSet,
  useEpisodeValue,
  useNcodeValue,
} from "../../contexts/novelContext"
import { useState } from "react"

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

    const res = await Axios.get<string>(
      `https://ncode.syosetu.com/${ncode}/${episode}`,
    )

    const parser = new HTMLParser(res.data)
    const honbun = parser.parseHonbun()
    const subtitle = parser.parseSubtitle()

    if (honbun !== null) setHonbun(honbun)
    if (subtitle !== null) setSubtitle(subtitle)

    setLoading(false)
  }

  const onSwipe = (direction: "left" | "right") => {
    if (direction === "left") {
      if (episode === 1) return
      console.log("go left")
      setEpisode(episode - 1)
    } else {
      console.log("go right")
      setEpisode(episode + 1)
    }
  }

  return {
    subtitle,
    honbun,
    loading,

    onSwipe,
  }
}
