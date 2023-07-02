import { useState } from "react"
import Axios from "axios"
import { useNcodeValue } from "../../contexts/novelContext"
import { NovelEpisode } from "../../types/Narou"
import { HTMLParser } from "../../classes/HTMLParser"
import { Linking } from "react-native"

export const episodeListScreenController = () => {
  const ncode = useNcodeValue()

  const [title, setTitle] = useState("")
  const [episodes, setEpisodes] = useState<NovelEpisode[]>([])
  const [honbun, setHonbun] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState<
    "小説は存在しません" | "小説情報を取得します"
  >("小説情報を取得します")

  const [openingDetailModal, setOpeningDetailModal] = useState(false)

  const reset = () => {
    setEpisodes([])
    setLoading(false)
    setMessage("小説情報を取得します")
  }

  const fetchEpisodes = async () => {
    if (ncode === "") {
      reset()
      return
    }

    try {
      const res = await Axios.get<string>(`https://ncode.syosetu.com/${ncode}`)

      const parser = new HTMLParser(res.data)

      const honbun = parser.parseHonbun()

      if (honbun !== null) {
        setHonbun(honbun)
      } else {
        setTitle(parser.parseNovelTitle())
        setEpisodes(parser.parseNovelEpisodes())
      }
    } catch (_error) {
      setEpisodes([])
      setMessage("小説は存在しません")
    } finally {
      setLoading(false)
    }
  }

  const openWithBrowser = async () => {
    try {
      await Linking.openURL(`https://ncode.syosetu.com/${ncode}`)
    } catch {}
  }

  return {
    ncode,
    title,
    episodes,
    honbun,
    loading,
    message,
    openingDetailModal,

    reset,
    fetchEpisodes,
    openWithBrowser,
    setOpeningDetailModal,
  }
}
