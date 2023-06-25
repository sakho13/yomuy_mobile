import { StyleProp, TextStyle } from "react-native"
import Icon from "react-native-vector-icons/FontAwesome5"

type Props = {
  name: string
  size?: number
  color?: string
  style?: StyleProp<TextStyle>
}

const FaIcon: React.FC<Props> = ({ name, size, color, style }) => {
  return <Icon name={name} size={size} color={color} style={style} />
}

export default FaIcon
