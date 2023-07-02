import { useState } from "react"
import { useThemeSet, useThemeValue } from "../../contexts/settingContext"

export const SettingScreenController = () => {
  const theme = useThemeValue()
  const setTheme = useThemeSet()

  const [loading, setLoading] = useState(true)

  const initLocalSetting = () => {
    setLoading(true)

    setLoading(false)
  }

  const toggleTheme = () => {
    setTheme()
  }

  return {
    loading,
    theme,

    initLocalSetting,
    toggleTheme,
  }
}
