import { useEffect, useState } from "react"
import { Alert } from "react-native"
import { supabase } from "../../utilities/supabase"

export const loginFormController = () => {
  const [email, setEmail] = useState("wecl.khotaro@gmail.com")

  const [password, setPassword] = useState("password")
  const [verifyPassword, setVerifyPassword] = useState("password")

  useEffect(() => {
    return () => {
      resetValues()
    }
  }, [])

  const signIn = async () => {
    const errorMessage =
      `入力にミスがあるか、デバイスに問題があります。\n` +
      `問題が見当たらない場合、左のメニューから「設定」→「要望・問い合わせ」よりご連絡ください。`
    if (!checkValidation()) Alert.alert("サインインできません", errorMessage)

    try {
      const { data: user, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error === null) {
        return
      }

      const { data: newUser, error: error2 } = await supabase.auth.signUp({
        email,
        password,
      })
      if (error2 !== null) {
        Alert.alert("サインインに失敗しました。", errorMessage)
        return
      }
    } catch (error) {
      console.warn(error)
    } finally {
      resetValues()
    }
  }

  const onChangeEmail = (text: string) => {
    setEmail(text)
  }

  const onChangePassword = (text: string) => {
    setPassword(text)
  }

  const onChangeVerifyPassword = (text: string) => {
    setVerifyPassword(text)
  }

  const emailValidation = (text: string) => {
    if (text.trim() === "") return "メールアドレスが空です"
    return null
  }

  const passwordValidation = (text: string) => {
    if (text.trim() === "") return "パスワードが空です"
    return null
  }

  const verifyPasswordValidation = (text: string) => {
    if (text.trim() === "") return "パスワードが空です"
    return null
  }

  const checkValidation = () => {
    return (
      emailValidation(email) === null &&
      passwordValidation(password) === null &&
      password === verifyPassword
    )
  }

  const resetValues = () => {
    setEmail("")
    setPassword("")
    setVerifyPassword("")
  }

  return {
    email,
    password,
    verifyPassword,
    signIn,
    onChangeEmail,
    onChangePassword,
    onChangeVerifyPassword,
    emailValidation,
    passwordValidation,
    verifyPasswordValidation,
  }
}
