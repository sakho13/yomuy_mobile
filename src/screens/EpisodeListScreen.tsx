import { FlatList, Pressable, StyleSheet, Text, View } from "react-native"
import { useEpisodeSet } from "../contexts/novelContext"
import { episodeListScreenController } from "../controllers/screens/EpisodeListScreenController"
import { useEffect } from "react"
import { ActivityIndicator } from "react-native"

import EpisodeItem from "../components/EpisodeItem"
import PlainText from "../components/atoms/PlainText"
import SlideModal from "../components/SlideModal"
import IconFab from "../components/IconFab"
import Honbun from "../components/Honbun"

const EpisodeListScreen: React.FC = () => {
  const {
    title,
    episodes,
    honbun,
    loading,
    message,
    openingDetailModal,
    fetchEpisodes,
    reset,
    openWithBrowser,
    setOpeningDetailModal,
  } = episodeListScreenController()

  useEffect(() => {
    reset()

    fetchEpisodes()
  }, [])

  if (loading)
    return (
      <View>
        <ActivityIndicator />
      </View>
    )

  if (honbun !== null) return <Honbun honbun={honbun} />

  if (episodes.length === 0)
    return (
      <View>
        <Text>{message}</Text>
      </View>
    )

  return (
    <View style={styles.container}>
      <PlainText
        text={title}
        styles={{
          marginHorizontal: 8,
          borderBottomWidth: 1,
          fontSize: 18,
        }}
      />

      <FlatList
        data={episodes}
        renderItem={({ item }) => {
          return <EpisodeItem episode={item} />
        }}
      />

      <IconFab
        icon='book'
        onPress={() => setOpeningDetailModal(true)}
        onPressOut={() => {}}
      />

      <SlideModal
        head='小説詳細'
        isVisible={openingDetailModal}
        onClose={() => setOpeningDetailModal(false)}
        bgTouchable={true}
      >
        <Pressable onPress={openWithBrowser} style={styles.modalLabel}>
          <PlainText text='ブラウザで開く' styles={styles.modalLabelText} />
        </Pressable>

        <Pressable onPress={() => {}} style={styles.modalLabel}>
          <PlainText text='本棚へ追加' styles={styles.modalLabelText} />
        </Pressable>
      </SlideModal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },

  modalLabel: {
    marginVertical: 8,
  },
  modalLabelText: {
    fontSize: 18,
  },
})

export default EpisodeListScreen
