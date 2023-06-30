import { Pressable } from "react-native"
import { useSettingsValue } from "../contexts/settingContext"
import FaIcon from "./atoms/FaIcon"

type Props = {
  icon: string
  onPress: () => void
  onPressOut: () => void
}

const IconFab: React.FC<Props> = ({ icon, onPress, onPressOut }) => {
  const { backgroundColor, secondaryColor, textColor } = useSettingsValue()
  return (
    <Pressable
      style={({ pressed }) => {
        return {
          zIndex: 10,
          position: "absolute",
          borderRadius: 10,
          borderWidth: 2,
          padding: 6,
          bottom: "4%",
          right: "4%",
          backgroundColor: pressed ? backgroundColor : secondaryColor,
          borderColor: textColor,
        }
      }}
      onPress={onPress}
      onPressOut={onPressOut}
    >
      <FaIcon name={icon} size={40} color={textColor} />
    </Pressable>
  )
}

export default IconFab
