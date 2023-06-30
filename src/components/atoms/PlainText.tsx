import { Text, TextStyle } from "react-native"
import { useSettingsValue } from "../../contexts/settingContext"

type Props = {
  text: string
  styles?: TextStyle
}

const PlainText: React.FC<Props> = ({ text, styles = {} }) => {
  const { textColor } = useSettingsValue()

  return <Text style={{ color: textColor, ...styles }}>{text}</Text>
}

export default PlainText
