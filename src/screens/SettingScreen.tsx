import { View, Text, StyleSheet, TextInput } from "react-native"
import { SettingScreenProps } from "../types/ScreenPropsTypes"
import {
  setBackgroundColorContext,
  useBackgroundColorSet,
  useBackgroundColorValue,
} from "../contexts/settingContext"
import { useCallback, useContext, useState } from "react"

const SettingScreen: React.FC<SettingScreenProps> = ({}) => {
  const backgroundColor = useBackgroundColorValue()
  const setBackgroundColor = useBackgroundColorSet()

  const [nBackgroundColor, setNBackgroundColor] = useState(backgroundColor)
  const changeBackgroundColor = (val: string) => {
    setNBackgroundColor(val)
    setBackgroundColor(val)
  }

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>state val</Text>
        <Text style={styles.value}>{nBackgroundColor}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>context val</Text>
        <Text style={styles.value}>{backgroundColor}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>setting</Text>
        <TextInput
          style={styles.value}
          onChangeText={(text) => changeBackgroundColor(text)}
          value={nBackgroundColor}
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
