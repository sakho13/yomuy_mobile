import Modal from "react-native-modal"

type Props = {
  isVisible: boolean
  children: React.ReactNode
  onClose: () => void
}

const SlideModal: React.FC<Props> = ({ isVisible, onClose, children }) => {
  return (
    <Modal
      isVisible={isVisible}
      onSwipeComplete={onClose}
      swipeDirection={"down"}
    >
      {children}
    </Modal>
  )
}

export default SlideModal
