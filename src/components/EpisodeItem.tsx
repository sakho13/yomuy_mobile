import { Pressable, StyleSheet, View } from "react-native"
import { NovelEpisode } from "../types/Narou"
import { isNovelEpisodeChapter } from "../functions/typeGuards"
import { Text } from "react-native"
import { useSettingsValue } from "../contexts/settingContext"
import PlainText from "./atoms/PlainText"
import LabeledText from "./atoms/LabeledText"
import FaIcon from "./atoms/FaIcon"
import { useEpisodeSet } from "../contexts/novelContext"

type Props = {
  episode: NovelEpisode
}

const EpisodeItem: React.FC<Props> = ({ episode }) => {
  const { borderColor, secondaryColor } = useSettingsValue()
  const setEpisode = useEpisodeSet()

  if (isNovelEpisodeChapter(episode)) {
    return (
      <View
        style={{
          borderColor,
          borderBottomWidth: 2,
          marginHorizontal: 4,
          backgroundColor: secondaryColor,
        }}
      >
        <PlainText text={episode.chapterName} styles={{ fontSize: 24 }} />
      </View>
    )
  }

  return (
    <Pressable
      style={{
        borderColor,
        borderBottomWidth: 1,
        marginHorizontal: 12,
        paddingVertical: 4,
      }}
      onPress={() => setEpisode(episode.episodeNo)}
    >
      <PlainText text={episode.subtitle} styles={{ fontSize: 16 }} />
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        {episode.isKaitou ? (
          <FaIcon name='edit' style={{ marginRight: 4 }} />
        ) : null}
        <LabeledText label={`掲載日`} text={episode.upDate} />
      </View>
    </Pressable>
  )
}

// const styles = StyleSheet.create({})

export default EpisodeItem
