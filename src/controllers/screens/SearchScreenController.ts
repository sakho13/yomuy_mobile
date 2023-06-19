import { useState } from "react"
import { NarouApiController } from "../NarouApiController"
import { NarouAPIInput, NarouAPINovelPart } from "../../types/Narou"

export const searchScreenController = () => {
  const [openingSearchModal, setOpeningSearchModal] = useState(false)

  // const [openingNovelModal, setOpeningNovelModal] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const [hitCount, setHitCount] = useState(0)

  const [input, setInput] = useState<NarouAPIInput>({
    word: "",
  })
  const [novels, setNovels] = useState<NarouAPINovelPart[]>([
    { title: "これがタイトル" },
    {
      title:
        "これがタイトルよ。長めのタイトルはちゃんと折り返して高さも調節できるようにしましょう",
    },
  ] as NarouAPINovelPart[])

  const narouApiController = new NarouApiController()

  const toggleSearchModal = () => {
    setOpeningSearchModal(!openingSearchModal)
  }

  const search = () => {
    // narouApiController.fetch()

    setOpeningSearchModal(false)
  }

  const onTappedNovel = (index: number) => {
    setSelectedIndex(selectedIndex !== null ? null : index)
  }

  return {
    openingSearchModal,
    selectedIndex,
    novels,

    toggleSearchModal,
    search,
    onTappedNovel,
  }
}
