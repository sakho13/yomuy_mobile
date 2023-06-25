import { Pressable, Text } from "react-native"
import { useSettingsValue } from "../../contexts/settingContext"
import FaIcon from "./FaIcon"

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

  return (
    <Pressable
      onPress={onTap}
      style={{
        marginHorizontal: 8,
        marginTop: 8,
        backgroundColor: gray ? borderColor : primaryColor,
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 8,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          fontWeight: "600",
          fontSize: 16,
          color: contentColor,
        }}
      >
        {text}
      </Text>
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
