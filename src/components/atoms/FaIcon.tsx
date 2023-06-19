import Icon from "react-native-vector-icons/FontAwesome5"

type Props = {
  name: string
  size?: number
  color?: string
}

const FaIcon: React.FC<Props> = ({ name, size, color }) => {
  return <Icon name={name} size={size} color={color} />
}

export default FaIcon
