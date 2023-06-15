import { useState } from "react"

export const searchScreenController = () => {
  const [openingSearchModal, setOpeningSearchModal] = useState(false)

  const narouApiController = new NarouApiController()

  const toggleSearchModal = () => {
    setOpeningSearchModal(!openingSearchModal)
  }

  return { openingSearchModal, toggleSearchModal }
}
