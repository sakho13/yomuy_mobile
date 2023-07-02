import Axios from "axios"
import { HTMLParser } from "../../classes/HTMLParser"
import { useEpisodeValue, useNcodeValue } from "../../contexts/novelContext"
import { useState } from "react"

export const EpisodeScreenController = () => {
  const ncode = useNcodeValue()
  const episode = useEpisodeValue()

  const [honbun, setHonbun] = useState("")

  const [loading, setLoading] = useState(true)

  const fetchHonbun = async () => {
    setLoading(true)

    const res = await Axios.get<string>(
      `https://ncode.syosetu.com/${ncode}/${episode}`,
    )

    const parser = new HTMLParser(res.data)
    const honbun = parser.parseHonbun()

    console.log(honbun)

    if (honbun) setHonbun(honbun)

    setLoading(false)
  }

  return {
    honbun,
    loading,

    fetchHonbun,
  }
}
