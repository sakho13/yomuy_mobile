import React from "react"
import { ActivityIndicator } from "react-native"
import { View } from "react-native"
import { StyleSheet } from "react-native"

type Props = {
  isLoading: boolean
  children: React.ReactNode
}

const Loading: React.FC<Props> = ({ isLoading, children }) => {
  if (isLoading)
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={"large"} />
      </View>
    )

  return <>{children}</>
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
})

export default Loading
