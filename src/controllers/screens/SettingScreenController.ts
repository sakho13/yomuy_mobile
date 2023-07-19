import { useState } from "react"
import { useThemeSet, useThemeValue } from "../../contexts/settingContext"
import { Linking } from "react-native"
import { supabase } from "../../utilities/supabase"
import { useNavigation } from "@react-navigation/native"
import { showLogicError } from "../../functions/errorDialog"
import { DrawerNavigationTypes } from "../../types/NavigationTypes"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"

export const SettingScreenController = () => {
  const theme = useThemeValue()
  const setTheme = useThemeSet()

  const navigation =
    useNavigation<NativeStackNavigationProp<DrawerNavigationTypes>>()
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

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
    } catch (error) {
      showLogicError(error)
    } finally {
      navigation.navigate("HomeScreen", {})
    }
  }

  return {
    loading,
    theme,
    openingAboutModal,

    initLocalSetting,
    toggleTheme,
    openContactForm,
    openAboutModal,
    closeAboutModal,
    signOut,
  }
}
