import { Text, TextStyle } from "react-native"
import { useSettingsValue } from "../../contexts/settingContext"
import { StyleProp } from "react-native"

type Props = {
  label: string
  text: string
  custom?: StyleProp<TextStyle>
}

const LabeledText: React.FC<Props> = ({ label, text, custom }) => {
  const { textColor } = useSettingsValue()

  const textStyle = { color: textColor, width: "100%" }

  return (
    <Text style={custom ? { ...textStyle } : textStyle}>
      <span style={{ fontWeight: "bold" }}>{label}: </span>
      {text}
    </Text>
  )
}

export default LabeledText
