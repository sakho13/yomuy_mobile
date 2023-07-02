import React, { useContext, useEffect, useState } from "react"
import { createContext, Dispatch, SetStateAction } from "react"
import {
  SettingsColorType,
  SettingsDateType,
  SettingsType,
  settingsDarkColorValues,
  settingsLightColorValues,
} from "../types/SettingsType"
import { ActivityIndicator, Button, StyleSheet, Text, View } from "react-native"
import { SettingsController } from "../controllers/SettingsController"

export const themeContext = createContext<"dark" | "light">("dark")
export const setThemeContext = createContext<() => void>(() => undefined)
export const useThemeValue = () => useContext(themeContext)
export const useThemeSet = () => useContext(setThemeContext)

export const settingsContext = createContext<
  SettingsColorType & SettingsDateType
>({
  downloadedAt: "",
  backgroundColor: "",
  secondaryColor: "",
  primaryColor: "",
  textColor: "",
  borderColor: "",
})
export const setSettingsContext = createContext<
  (mode: "change" | "reset", value: SetStateAction<SettingsType>) => void
>(() => undefined)

export const useSettingsValue = () => useContext(settingsContext)
export const useSettingsSet = () => useContext(setSettingsContext)

export const SettingContext: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const settingsController = new SettingsController()

  const [isLoading, setIsLoading] = useState(true)
  const [hasFetchError, setHasFetchError] = useState(false)

  const [theme, setTheme] = useState<"dark" | "light">("dark")

  const [settings, setSetting] = useState<SettingsColorType & SettingsDateType>(
    {
      backgroundColor: "",
      secondaryColor: "",
      primaryColor: "",
      textColor: "",
      borderColor: "",
      downloadedAt: "",
    },
  )

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = () => {
    setIsLoading(true)

    settingsController
      .initializer()
      .then(() => {
        const values = settingsController.getValues

        const isLight = values.theme !== "dark"
        setTheme(values.theme)

        const themeValues = isLight
          ? settingsLightColorValues
          : settingsDarkColorValues

        setSetting({
          ...themeValues,
          primaryColor: "#0098C7",
          downloadedAt: values.downloadedAt,
        })
      })
      .catch(() => {
        setHasFetchError(true)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const changeSetting = (
    mode: "change" | "reset",
    value: SetStateAction<SettingsType>,
  ) => {
    if (mode === "reset") {
      resetThemeSettings()
    }
    if (mode === "change") {
      const newVal = value as SettingsType

      // const changedTheme = newVal.theme !== settings.theme

      // if (changedTheme) {
      //   console.log("changedTheme")
      //   const themeValues =
      //     newVal.theme !== "dark"
      //       ? settingsLightColorValues
      //       : settingsDarkColorValues
      //   setSetting({
      //     ...settings,
      //     ...themeValues,
      //     theme: newVal.theme,
      //   })
      //   return
      // }

      // setSetting({
      //   ...settings,
      //   downloadedAt: newVal.downloadedAt,
      // })
    }
  }

  const resetThemeSettings = async () => {
    setIsLoading(true)

    try {
      await settingsController.reset()
    } catch (error) {
      //
    } finally {
      // settingsController.getValues

      setIsLoading(false)
    }
  }

  const toggleTheme = async () => {
    const changed = theme === "dark" ? "light" : "dark"

    await settingsController.updateValue("theme", changed)

    const themeColors =
      changed === "dark" ? settingsDarkColorValues : settingsLightColorValues
    setSetting({
      ...settings,
      ...themeColors,
    })
    setTheme(changed)
  }

  // ********************* VIEW *********************

  if (isLoading)
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={"large"} />
        <Text>Now Loading...</Text>
      </View>
    )

  if (hasFetchError)
    return (
      <View style={styles.errorContainer}>
        <Text style={{ color: "red" }}>
          テーマカラーの取得でエラーが発生しました。
        </Text>
        <Text>テーマの設定を一度リセットする必要があります。</Text>
        <Button title='リセットする' onPress={resetThemeSettings} />
      </View>
    )

  return (
    <settingsContext.Provider value={settings}>
      <setSettingsContext.Provider value={changeSetting}>
        <themeContext.Provider value={theme}>
          <setThemeContext.Provider value={toggleTheme}>
            {children}
          </setThemeContext.Provider>
        </themeContext.Provider>
      </setSettingsContext.Provider>
    </settingsContext.Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  loadingContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  errorContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
})
