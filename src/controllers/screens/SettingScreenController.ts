import { useState } from "react"
import { useThemeSet, useThemeValue } from "../../contexts/settingContext"
import { Linking } from "react-native"

export const SettingScreenController = () => {
  const theme = useThemeValue()
  const setTheme = useThemeSet()

  const [loading, setLoading] = useState(true)

  const [openingAboutModal, setOpeningAboutModal] = useState(false)

  const initLocalSetting = () => {
    setLoading(true)

    setLoading(false)
  }

  const toggleTheme = () => {
    setTheme()
  }

  const openContactForm = () =>
    Linking.openURL("https://forms.gle/4HZ6d93Yd3opb1NZ7")

  const openAboutModal = () => setOpeningAboutModal(true)
  const closeAboutModal = () => setOpeningAboutModal(false)

  return {
    loading,
    theme,
    openingAboutModal,

    initLocalSetting,
    toggleTheme,
    openContactForm,
    openAboutModal,
    closeAboutModal,
  }
}
