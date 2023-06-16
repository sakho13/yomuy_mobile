import React, { useContext, useEffect, useState } from "react"
import { createContext, Dispatch, SetStateAction } from "react"
import { SettingsType, settingsDefaultValues } from "../types/SettingsType"
import { ActivityIndicator, StyleSheet, View } from "react-native"
import { SettingsController } from "../controllers/SettingsController"
import { isColorText } from "../functions/commonFunctions"

export const backgroundColorContext = createContext("")
export const setBackgroundColorContext = createContext<
  Dispatch<SetStateAction<string>>
>(() => undefined)

export const secondaryColorContext = createContext("")
export const setSecondaryColorContext = createContext<
  Dispatch<SetStateAction<string>>
>(() => undefined)

export const borderColorContext = createContext("")
export const setBorderColorContext = createContext<
  Dispatch<SetStateAction<string>>
>(() => undefined)

export const useBackgroundColorValue = () => useContext(backgroundColorContext)
export const useBackgroundColorSet = () => useContext(setBackgroundColorContext)

export const useSecondaryColorValue = () => useContext(secondaryColorContext)
export const useSecondaryColorSet = () => useContext(setSecondaryColorContext)

export const useBorderColorValue = () => useContext(borderColorContext)
export const useBorderColorSet = () => useContext(setBorderColorContext)

export const SettingContext: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const settingsController = new SettingsController()

  const [isLoading, setIdLoading] = useState(true)

  const [bgc, setBgc] = useState("#ffffff")
  const [scc, setScc] = useState("#ffffff")
  const [bor, setBor] = useState("#ffffff")

  useEffect(() => {
    settingsController
      .initializer()
      .then(() => {
        setBgc(settingsController.getValue("backgroundColor"))
        setScc(settingsController.getValue("secondaryColor"))
        setBor(settingsController.getValue("borderColor"))
      })
      .finally(() => {
        setIdLoading(false)
      })
  }, [])

  const changeBGC = (val: string) => {
    setBgc(val)
    if (isColorText(val)) settingsController.updateValue("backgroundColor", val)
  }

  const changeSCC = (val: string) => {
    setScc(val)
    if (isColorText(val)) settingsController.updateValue("secondaryColor", val)
  }

  const changeBor = (val: string) => {
    setBor(val)
    if (isColorText(val)) settingsController.updateValue("borderColor", val)
  }

  // ********************* VIEW *********************

  if (isLoading)
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={"large"} />
      </View>
    )

  return (
    <backgroundColorContext.Provider value={bgc}>
      <setBackgroundColorContext.Provider
        value={(v) => changeBGC(v.toString())}
      >
        <secondaryColorContext.Provider value={scc}>
          <setSecondaryColorContext.Provider
            value={(v) => changeSCC(v.toString())}
          >
            <borderColorContext.Provider value={bor}>
              <setBorderColorContext.Provider
                value={(v) => changeBor(v.toString())}
              >
                {children}
              </setBorderColorContext.Provider>
            </borderColorContext.Provider>
          </setSecondaryColorContext.Provider>
        </secondaryColorContext.Provider>
      </setBackgroundColorContext.Provider>
    </backgroundColorContext.Provider>
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
})

// function itemContext<T>(
//   valueContext: React.Context<T>,
//   setContext: React.Context<React.Dispatch<React.SetStateAction<T>>>,
//   children: React.ReactNode,
//   value: T,
//   setter: React.Dispatch<React.SetStateAction<T>>,
// ) {
//   return (
//     <valueContext.Provider value={value}>
//       <setContext.Provider value={setter}>{children}</setContext.Provider>
//     </valueContext.Provider>
//   )
// }
