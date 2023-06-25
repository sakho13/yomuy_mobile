import { Text, TextStyle, View } from "react-native"
import { useSettingsValue } from "../../contexts/settingContext"
import { StyleProp } from "react-native"

type Props = {
  label: string
  text: string
  textCustom?: TextStyle
}

const LabeledText: React.FC<Props> = ({ label, text, textCustom }) => {
  const { textColor } = useSettingsValue()

  const labelStyle: StyleProp<TextStyle> = { fontWeight: "600", marginRight: 4 }
  const textStyle: StyleProp<TextStyle> = { color: textColor, fontSize: 14 }

  return (
    <View style={{ width: "100%", display: "flex", flexDirection: "row" }}>
      <Text style={textCustom ? { ...textCustom, ...labelStyle } : labelStyle}>
        {label}:
      </Text>
      <Text style={textCustom ? { ...textCustom, ...textStyle } : textStyle}>
        {text}
      </Text>
    </View>
  )
}

export default LabeledText
