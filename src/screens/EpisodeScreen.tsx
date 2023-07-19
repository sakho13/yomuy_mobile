import { ActivityIndicator, StyleSheet, View } from "react-native"
import Honbun from "../components/Honbun"
import { EpisodeScreenController } from "../controllers/screens/EpisodeScreenController"

import { useSettingsValue } from "../contexts/settingContext"
import PlainText from "../components/atoms/PlainText"

const EpisodeScreen: React.FC = () => {
  const { honbun, loading, episode, onSwipe } = EpisodeScreenController()

  const { backgroundColor, borderColor } = useSettingsValue()

  const backStyle = {
    backgroundColor,
    ...StyleSheet.absoluteFillObject,
  }

  if (loading)
    return (
      <View style={backStyle}>
        <ActivityIndicator />
      </View>
    )

  return (
    <View style={backStyle}>
      <View
        style={{
          borderBottomWidth: 1,
          borderColor,
          paddingVertical: 8,
          paddingHorizontal: 4,
        }}
      >
        <PlainText text={`${episode}`} />
      </View>

      <Honbun honbun={honbun} />
    </View>
  )
}

export default EpisodeScreen
