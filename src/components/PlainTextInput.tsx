import React, { useState } from "react"
import { KeyboardTypeOptions, Text } from "react-native"
import { View } from "react-native"
import { TextInput } from "react-native"
import { useSettingsValue } from "../contexts/settingContext"
import FaIcon from "./atoms/FaIcon"
import { Pressable } from "react-native"

type Props = {
  placeholder?: string
  state: string
  type?: KeyboardTypeOptions | "password"
  onChange: (text: string) => void
  validation?: (text: string) => string | null
}

const PlainTextInput: React.FC<Props> = ({
  placeholder,
  state,
  type,
  onChange,
  validation,
}) => {
  const [error, setError] = useState<string | null>(null)
  const { textColor } = useSettingsValue()

  const [visible, setVisible] = useState(false)

  const keyboardType =
    type === undefined || type === "password" ? undefined : type

  return (
    <View>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <TextInput
          placeholder={placeholder}
          value={state}
          keyboardType={keyboardType}
          secureTextEntry={type === "password" ? !visible : false}
          onChangeText={(text) => {
            onChange(text)
            if (validation !== undefined) setError(validation(text))
          }}
          style={{
            borderBottomWidth: 1,
            color: textColor,
            borderColor: textColor,
            flexGrow: 1,
          }}
          placeholderTextColor={textColor}
        />
        {type === "password" ? (
          <Pressable
            onPress={() => {
              setVisible(!visible)
            }}
          >
            {visible ? <FaIcon name='eye' /> : <FaIcon name='eye-slash' />}
          </Pressable>
        ) : null}
      </View>

      <Text style={{ color: "red" }}>{error ? error : ""}</Text>
    </View>
  )
}

export default PlainTextInput
