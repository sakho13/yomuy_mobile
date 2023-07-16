import { StyleSheet, Text, View } from "react-native"
import PlainText from "./atoms/PlainText"
import ScreenWrapper from "./atoms/ScreenWrapper"
import { loginFormController } from "./controllers/LoginFormController"
import PlainTextInput from "./PlainTextInput"
import PlainTextButton from "./PlainTextButton"
import { useSettingsValue } from "../contexts/settingContext"

const LoginForm: React.FC = () => {
  const { borderColor } = useSettingsValue()

  const {
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
  } = loginFormController()

  return (
    <ScreenWrapper styles={styles.container}>
      <PlainText text='本棚機能を利用するにはサインインが必要です。' />

      <View style={{ borderColor, ...styles.border }}>
        <PlainTextInput
          placeholder='Email'
          type='email-address'
          state={email}
          onChange={onChangeEmail}
          validation={emailValidation}
        />

        <PlainTextInput
          placeholder='Password'
          type='password'
          state={password}
          onChange={onChangePassword}
          validation={passwordValidation}
        />

        <PlainTextInput
          placeholder='Verify Password'
          type='password'
          state={verifyPassword}
          onChange={onChangeVerifyPassword}
          validation={verifyPasswordValidation}
        />

        <PlainTextButton text='SignIn' onTap={signIn} />
      </View>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 4,
    paddingHorizontal: 16,
  },

  border: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 20,
    marginVertical: 20,
  },
})

export default LoginForm
