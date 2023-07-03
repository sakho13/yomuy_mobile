import React, { useState } from "react"
import { Text } from "react-native"
import { View } from "react-native"
import { TextInput } from "react-native"
import { useSettingsValue } from "../contexts/settingContext"

type Props = {
  placeholder?: string
  state: string
  onChange: (text: string) => void
  validation?: (text: string) => string | null
}

const PlainTextInput: React.FC<Props> = ({
  placeholder,
  state,
  onChange,
  validation,
}) => {
  const [error, setError] = useState<string | null>(null)
  const { textColor } = useSettingsValue()

  return (
    <View>
      <TextInput
        placeholder={placeholder}
        value={state}
        onChangeText={(text) => {
          onChange(text)
          if (validation !== undefined) setError(validation(text))
        }}
        style={{
          borderBottomWidth: 1,
          color: textColor,
          borderColor: textColor,
        }}
        placeholderTextColor={textColor}
      />

      <Text style={{ color: "red" }}>{error ? error : ""}</Text>
    </View>
  )
}

export default PlainTextInput
