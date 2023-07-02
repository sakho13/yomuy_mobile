import { View, StyleSheet, Switch, ActivityIndicator } from "react-native"
import { SettingScreenProps } from "../types/ScreenPropsTypes"
import { useCallback } from "react"
import { useFocusEffect } from "@react-navigation/native"
import { SettingScreenController } from "../controllers/screens/SettingScreenController"
import PlainText from "../components/atoms/PlainText"
import ScreenWrapper from "../components/atoms/ScreenWrapper"

const SettingScreen: React.FC<SettingScreenProps> = ({}) => {
  const { theme, loading, initLocalSetting, toggleTheme } =
    SettingScreenController()

  useFocusEffect(
    useCallback(() => {
      initLocalSetting()
    }, []),
  )

  return (
    <ScreenWrapper styles={styles.container}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <View style={styles.row}>
          <PlainText text='ダークテーマ' styles={styles.label} />
          <Switch value={theme === "dark"} onValueChange={toggleTheme} />
        </View>
      )}

      {/* <View style={styles.row}>
        <Text style={styles.label}>setting</Text>
        <TextInput
          style={styles.value}
          onChangeText={(text) => changeBackgroundColor(text)}
          value={localSettings.backgroundColor}
        ></TextInput>
      </View> */}
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 4,
    paddingHorizontal: 16,
  },
  row: {
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontSize: 20,
  },
  value: {
    fontSize: 20,
    borderBottomWidth: 0.8,
    minWidth: "30%",
  },
})

export default SettingScreen
