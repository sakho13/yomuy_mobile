import { Alert, AlertButton } from "react-native"
import { LogicError } from "../error/logicError"

export function showError(
  title: string,
  message: string,
  buttons?: AlertButton[],
) {
  Alert.alert(title, message, buttons)
}

export function showLogicError(err: any) {
  if (err instanceof LogicError) {
    const { title, message } = err.errorInfo
    Alert.alert(title, message)
    return
  }
  const unknownError = LogicError.unknownError()
  const { title, message } = unknownError.errorInfo
  Alert.alert(title, message)
}
