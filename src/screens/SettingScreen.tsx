import { View, Text, StyleSheet, TextInput } from "react-native"
import { SettingScreenProps } from "../types/ScreenPropsTypes"
import { useSettingsValue, useSettingsSet } from "../contexts/settingContext"
import { useCallback, useContext, useState } from "react"
import { useFocusEffect } from "@react-navigation/native"
import { SettingScreenController } from "../controllers/screens/SettingScreenController"

const SettingScreen: React.FC<SettingScreenProps> = ({}) => {
  const { localSettings, initLocalSetting, changeBackgroundColor } =
    SettingScreenController()

  useFocusEffect(
    useCallback(() => {
      initLocalSetting()
    }, []),
  )

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>state val</Text>
        <Text style={styles.value}>{localSettings.backgroundColor}</Text>
      </View>

      {/* <View style={styles.row}>
        <Text style={styles.label}>context val</Text>
        <Text style={styles.value}>{settings.backgroundColor}</Text>
      </View> */}

      <View style={styles.row}>
        <Text style={styles.label}>setting</Text>
        <TextInput
          style={styles.value}
          onChangeText={(text) => changeBackgroundColor(text)}
          value={localSettings.backgroundColor}
        ></TextInput>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
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
