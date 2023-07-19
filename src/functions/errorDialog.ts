import { Alert } from "react-native"
import { LogicError } from "../error/logicError"

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
