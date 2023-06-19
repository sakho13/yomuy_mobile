import { useState } from "react"
import { useSettingsValue, useSettingsSet } from "../../contexts/settingContext"

export const SettingScreenController = () => {
  const settings = useSettingsValue()
  const setSettings = useSettingsSet()

  const [localSettings, setLocalSettings] = useState(settings)

  const changeBackgroundColor = (val: string) => {
    setLocalSettings({ ...localSettings, backgroundColor: val })
    setSettings({
      ...settings,
      backgroundColor: val,
    })
  }

  const initLocalSetting = () => {
    setLocalSettings(settings)
  }

  return {
    localSettings,

    initLocalSetting,
    changeBackgroundColor,
  }
}
