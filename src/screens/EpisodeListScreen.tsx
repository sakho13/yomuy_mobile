import { Text, View } from "react-native"
import { useEpisodeSet, useNcodeValue } from "../contexts/novelContext"
import PlainTextButton from "../components/atoms/PlainTextButton"

const EpisodeListScreen: React.FC = () => {
  const ncode = useNcodeValue()

  const setEpisode = useEpisodeSet()

  return (
    <View>
      <Text>ncode: {ncode}</Text>

      <PlainTextButton text='小説を読みに行く' onTap={() => setEpisode(1)} />
    </View>
  )
}

export default EpisodeListScreen
