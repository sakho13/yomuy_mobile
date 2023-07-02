import { Pressable, Text, ViewStyle } from "react-native"
import { useSettingsValue } from "../contexts/settingContext"
import FaIcon from "./atoms/FaIcon"
import PlainText from "./atoms/PlainText"

type Props = {
  text: string
  onTap: () => void
  gray?: boolean
  icon?: string
}

const PlainTextButton: React.FC<Props> = ({
  text,
  onTap,
  gray = false,
  icon,
}) => {
  const { textColor, borderColor, primaryColor, backgroundColor } =
    useSettingsValue()

  const contentColor = gray ? textColor : backgroundColor

  const styleBGC = (pressed: boolean) => {
    if (pressed) return gray ? "black" : borderColor
    return gray ? borderColor : primaryColor
  }

  const styleBase: ViewStyle = {
    marginHorizontal: 8,
    marginTop: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  }

  return (
    <Pressable
      onPress={onTap}
      style={({ pressed }) => {
        return { ...styleBase, backgroundColor: styleBGC(pressed) }
      }}
    >
      <PlainText
        text={text}
        styles={{
          fontWeight: "600",
          fontSize: 16,
          color: contentColor,
        }}
      />
      {icon ? (
        <FaIcon
          name={icon}
          style={{ paddingLeft: 4, paddingRight: 2 }}
          color={contentColor}
        />
      ) : null}
    </Pressable>
  )
}

export default PlainTextButton
