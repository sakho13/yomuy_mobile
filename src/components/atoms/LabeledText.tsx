import { Text, TextStyle, View } from "react-native"
import { useSettingsValue } from "../../contexts/settingContext"
import { StyleProp } from "react-native"

type Props = {
  label: string
  text: string
  custom?: StyleProp<TextStyle>
}

const LabeledText: React.FC<Props> = ({ label, text, custom }) => {
  const { textColor } = useSettingsValue()

  const textStyle: StyleProp<TextStyle> = {
    color: textColor,
    width: "100%",
    display: "flex",
    flexDirection: "row",
  }

  return (
    <View style={custom ? { ...textStyle } : textStyle}>
      <Text style={{ fontWeight: "600" }}>{label}: </Text>
      <Text style={{ color: textColor }}>{text}</Text>
    </View>
  )
}

export default LabeledText
