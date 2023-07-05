import { Pressable, ViewStyle } from "react-native"
import { useSettingsValue } from "../contexts/settingContext"
import FaIcon from "./atoms/FaIcon"
import PlainText from "./atoms/PlainText"

type Props = {
  text: string
  onTap: () => void
  icon?: string
}

const PlainTextButton: React.FC<Props> = ({ text, onTap, icon }) => {
  const { primaryColor } = useSettingsValue()

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
        if (pressed) return { ...styleBase, backgroundColor: "#4242425D" }
        return { ...styleBase, backgroundColor: "#00000025" }
      }}
    >
      <PlainText
        text={text}
        styles={{
          fontWeight: "600",
          fontSize: 18,
          color: primaryColor,
        }}
      />

      {icon ? (
        <FaIcon
          name={icon}
          style={{ paddingLeft: 4, paddingRight: 2 }}
          color={primaryColor}
        />
      ) : null}
    </Pressable>
  )
}

export default PlainTextButton
