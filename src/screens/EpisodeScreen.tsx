import { ActivityIndicator, StyleSheet, View } from "react-native"
import Honbun from "../components/Honbun"
import { EpisodeScreenController } from "../controllers/screens/EpisodeScreenController"
import { useEffect } from "react"

const EpisodeScreen: React.FC = () => {
  const { honbun, loading, fetchHonbun } = EpisodeScreenController()

  useEffect(() => {
    fetchHonbun()
  }, [])

  if (loading)
    return (
      <View style={StyleSheet.absoluteFillObject}>
        <ActivityIndicator />
      </View>
    )

  return (
    <View style={StyleSheet.absoluteFillObject}>
      <Honbun honbun={honbun} />
    </View>
  )
}

export default EpisodeScreen
