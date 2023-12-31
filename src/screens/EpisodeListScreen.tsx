import { FlatList, Pressable, StyleSheet, Text } from "react-native"
import { episodeListScreenController } from "../controllers/screens/EpisodeListScreenController"
import { useEffect } from "react"
import { ActivityIndicator } from "react-native"
import EpisodeItem from "../components/EpisodeItem"
import PlainText from "../components/atoms/PlainText"
import IconFab from "../components/IconFab"
import Honbun from "../components/Honbun"
import ScreenWrapper from "../components/atoms/ScreenWrapper"
import BaseModal from "../components/BaseModal"

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
      <ScreenWrapper>
        <ActivityIndicator />
      </ScreenWrapper>
    )

  if (honbun !== null) return <Honbun honbun={honbun} />

  if (episodes.length === 0)
    return (
      <ScreenWrapper>
        <Text>{message}</Text>
      </ScreenWrapper>
    )

  return (
    <ScreenWrapper>
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

      <BaseModal
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
      </BaseModal>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  modalLabel: {
    marginVertical: 8,
  },
  modalLabelText: {
    fontSize: 18,
  },
})

export default EpisodeListScreen
