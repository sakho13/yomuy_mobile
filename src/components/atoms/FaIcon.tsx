import { StyleProp, TextStyle } from "react-native"
import Icon from "react-native-vector-icons/FontAwesome5"
import { useSettingsValue } from "../../contexts/settingContext"

type Props = {
  name: string
  size?: number
  color?: string
  style?: TextStyle
}

const FaIcon: React.FC<Props> = ({ name, size, color, style }) => {
  const { textColor } = useSettingsValue()
  return (
    <Icon
      name={name}
      size={size}
      color={color}
      style={{ color: textColor, ...style }}
    />
  )
}

export default FaIcon
