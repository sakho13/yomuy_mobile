import { Text, View } from "react-native"
import Modal from "react-native-modal"
import { useSettingsValue } from "../contexts/settingContext"

type Props = {
  isVisible: boolean
  children: React.ReactNode
  head: string
  onClose: () => void
  bgTouchable?: boolean
  slidable?: boolean
}

const BaseModal: React.FC<Props> = ({
  isVisible,
  head,
  onClose,
  children,
  bgTouchable,
  slidable = true,
}) => {
  const { backgroundColor, textColor } = useSettingsValue()

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={bgTouchable ? onClose : undefined}
      onSwipeComplete={slidable ? onClose : undefined}
      swipeDirection={slidable ? "down" : undefined}
    >
      <View
        style={{ backgroundColor, paddingHorizontal: 12, paddingVertical: 16 }}
      >
        <Text style={{ color: textColor, fontWeight: "bold", fontSize: 18 }}>
          {head}
        </Text>

        <View style={{ marginTop: 8, marginHorizontal: 4 }}>{children}</View>
      </View>
    </Modal>
  )
}

export default BaseModal
