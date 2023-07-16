import { Alert, AlertButton } from "react-native"

export function showError(
  title: string,
  message: string,
  buttons?: AlertButton[],
) {
  Alert.alert(title, message, buttons)
}
