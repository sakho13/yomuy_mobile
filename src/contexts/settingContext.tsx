import React, { useContext, useEffect, useState } from "react"
import { createContext, Dispatch, SetStateAction } from "react"
import { SettingsType } from "../types/SettingsType"
import { ActivityIndicator, Button, StyleSheet, Text, View } from "react-native"
import { SettingsController } from "../controllers/SettingsController"
import { isColorText } from "../functions/commonFunctions"

export const settingsContext = createContext<SettingsType>({
  backgroundColor: "",
  secondaryColor: "",
  primaryColor: "",
  borderColor: "",
  textColor: "",
  downloadedAt: "",
})
export const setSettingsContext = createContext<
  Dispatch<SetStateAction<SettingsType>>
>(() => undefined)

export const useSettingsValue = () => useContext(settingsContext)
export const useSettingsSet = () => useContext(setSettingsContext)

export const SettingContext: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const settingsController = new SettingsController()

  const [isLoading, setIsLoading] = useState(true)
  const [hasFetchError, setHasFetchError] = useState(false)

  const [settings, setSetting] = useState<SettingsType>({
    backgroundColor: "#ffffff",
    secondaryColor: "#ffffff",
    primaryColor: "#ffffff",
    borderColor: "#ffffff",
    textColor: "#ffffff",
    downloadedAt: "",
  })

  useEffect(() => {
    fetchSettings()
  }, [])

  // const changeBGC = (val: string) => {
  //   setBgc(val)
  //   if (isColorText(val)) settingsController.updateValue("backgroundColor", val)
  // }

  const fetchSettings = () => {
    setIsLoading(true)

    settingsController
      .initializer()
      .then(() => {
        setSetting(settingsController.getValues)
      })
      .catch(() => {
        setHasFetchError(true)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const changeSetting = (value: SetStateAction<SettingsType>) => {
    const newVal = value as SettingsType
    for (const [k, v] of Object.entries(newVal)) {
      // validation
      if (k.includes("Color") && !isColorText(v)) return
    }
    setSetting(newVal)
  }

  const resetThemeSettings = async () => {
    setIsLoading(true)
    await settingsController.reset()
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
        {children}
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
