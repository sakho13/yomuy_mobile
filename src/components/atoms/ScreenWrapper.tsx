import { StyleSheet, ViewStyle } from "react-native"
import { View } from "react-native"
import { useSettingsValue } from "../../contexts/settingContext"

const ScreenWrapper: React.FC<{
  children: React.ReactNode | React.ReactNode[]
  styles?: ViewStyle
}> = ({ children, styles }) => {
  const { backgroundColor } = useSettingsValue()
  return (
    <View
      style={{ ...StyleSheet.absoluteFillObject, backgroundColor, ...styles }}
    >
      {children}
    </View>
  )
}

export default ScreenWrapper
